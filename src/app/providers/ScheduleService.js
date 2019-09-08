import { Op } from 'sequelize'
import { startOfDay, parseISO, endOfDay } from 'date-fns'
import Appointment from '../models/Appointments'
import User from '../models/User'
// import File from '../models/File'

export default class ScheduleService {
  constructor(InjectableAppointment = Appointment, InjectableUser = User) {
    this.Appointment = InjectableAppointment
    this.User = InjectableUser
  }

  async all(providerId, { date }) {
    const provider = await this.User.findOne({
      where: {
        id: providerId,
        provider: true,
      },
    })
    if (!(provider instanceof User)) {
      throw Error('Invalid Provider')
    }
    const parsedDate = parseISO(date)
    const schedules = await this.Appointment.findAll({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    })
    return schedules
  }
}
