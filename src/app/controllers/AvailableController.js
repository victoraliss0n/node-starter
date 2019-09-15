import AvailableService from '../providers/AvailableService'

export default class AvailableController {
  constructor(InjectableAvailableService = AvailableService) {
    this.AvailableService = InjectableAvailableService
  }

  async all(req, res) {
    try {
      const availableService = new this.AvailableService()
      const result = await availableService.all(req.query, req.params.id)
      return res.send(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}
