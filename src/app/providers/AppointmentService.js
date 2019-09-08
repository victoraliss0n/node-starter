import { startOfHour, parseISO, isBefore } from 'date-fns'
import Appointment from '../models/Appointments'
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
    const user = await this.User.findOne({
      where: { id: provider_id, provider: true },
    })
    if (!(user instanceof User)) {
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
