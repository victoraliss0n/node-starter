import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Appointment from '../models/Appointments'
import Notification from '../schemas/Notification'
import User from '../models/User'
import File from '../models/File'
import * as AppointmentValidation from '../validations/appointment.validation'

export default class AppointmentService {
  constructor(InjectableAppointment = Appointment, InjectableUser = User) {
    this.Appointment = InjectableAppointment
    this.User = InjectableUser
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
      user: user.id,
    })
    return appointment
  }

  async all(userId, { page = 1 }) {
    if (page <= 0) {
      throw Error('Invalid page')
    }
    const appointments = this.Appointment.findAll({
      where: {
        canceled_at: null,
        user_id: userId,
      },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      attributes: ['id', 'date'],
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
}
