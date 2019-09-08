import ScheduleService from '../providers/ScheduleService'
export default class ScheduleController {
  constructor(InjectableScheduleService = new ScheduleService()) {
    this.ScheduleService = InjectableScheduleService
  }

  async all(req, res) {
    try {
      const result = await this.ScheduleService.all(req.userId, req.query)
      return res.json(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}
