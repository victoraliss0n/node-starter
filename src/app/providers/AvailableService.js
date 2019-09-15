import Appointment from '../models/Appointments'
import { Op } from 'sequelize'
import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns'
export default class AvailableService {
  constructor(InjectableAppointment = Appointment) {
    this.Appointment = new InjectableAppointment()
  }

  async all({ date }, id) {
    if (!date) {
      throw Error('Invalid date')
    }
    const searchDate = Number(date)
    const appointments = await Appointment.findAll({
      where: {
        canceled_at: null,
        provider_id: id,
        date: { [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)] },
      },
      order: ['date'],
    })
    // Mock... Temporary... Move to Table
    const schedules = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ]
    const available = schedules.map(schedule => {
      const [hour, minute] = schedule.split(':')
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      )
      return {
        time: schedule,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === schedule),
      }
    })
    return available
  }
}
