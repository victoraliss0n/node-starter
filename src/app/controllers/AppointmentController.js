import AppointmentService from '../providers/AppointmentService'
export default class AppointmentController {
  constructor(InjectableAppointmentService = new AppointmentService()) {
    this.AppointmentService = InjectableAppointmentService
  }

  async create(req, res) {
    try {
      const result = await this.AppointmentService.create(req.body)
      return res.json(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  async all(req, res) {
    try {
      const result = await this.AppointmentService.all(req.userId, req.query)
      return res.json(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}
