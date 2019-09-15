import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Appointment from '../models/Appointments'
import Notification from '../schemas/Notification'
import User from '../models/User'
import File from '../models/File'
import * as AppointmentValidation from '../validations/appointment.validation'
import CancellationMail from '../jobs/CancellationMail'
import Queue from '../queues/Queue'

export default class AppointmentService {
  constructor(
    InjectableAppointment = Appointment,
    InjectableUser = User,
    InjectableQueue = Queue
  ) {
    this.Appointment = InjectableAppointment
    this.User = InjectableUser
    this.Queue = new InjectableQueue()
  }

  async create(body) {
    const { provider_id, user_id, date } = body
    const isValid = await AppointmentValidation.validateCreate(body)
    if (!isValid) {
      throw Error('Validation Fails')
    }
    const provider = await this.User.findOne({
      where: { id: provider_id, provider: true },
    })
    if (!(provider instanceof User)) {
      throw Error('You can only create appointments with providers')
    }
    const hourStart = startOfHour(parseISO(date))
    if (isBefore(hourStart, new Date())) {
      throw Error('Pass dates is not permitted')
    }
    const appointmentExists = await Appointment.findOne({
      where: {
        provider_id,
        user_id,
        date: hourStart,
      },
    })
    if (appointmentExists instanceof Appointment) {
      throw Error('Appointment date is not available')
    }
    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date: hourStart,
    })
    const user = await User.findByPk(user_id)
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', ás' H:mm'h'",
      { locale: pt }
    )
    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    })
    return appointment
  }

  async all(userId, { page = 1 }) {
    if (page <= 0) {
      throw Error('Invalid page')
    }
    const appointments = await this.Appointment.findAll({
      where: {
        canceled_at: null,
        user_id: userId,
      },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: this.User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'id', 'name', 'path'],
            },
          ],
        },
      ],
    })
    return appointments
  }

  async delete(appointmentId, userId) {
    const appointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    })
    if (appointment.user_id !== userId) {
      throw Error("You don't have permission to cancel this appointment")
    }
    const dateWithSub = subHours(appointment.date, 2)
    if (isBefore(dateWithSub, new Date())) {
      throw Error('You can only cancel appointments 2 hours in advance')
    }
    appointment.canceled_at = new Date()
    await appointment.update()
    this.Queue.add(new CancellationMail().key, { appointment })
    return appointment
  }
}
