import NotificationService from '../providers/NotificationService'
export default class NotificationController {
  constructor(InjectableNotificationService = new NotificationService()) {
    this.NotificationService = InjectableNotificationService
  }

  async all(req, res) {
    try {
      const result = await this.NotificationService.all(req.userId)
      return res.json(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const result = await this.NotificationService.update(req.params.id)
      return res.json(result)
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}
