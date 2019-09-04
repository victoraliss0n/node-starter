import UserService from '../providers/UserService'

export default class UserController {
  constructor(InjectableUserService = new UserService()) {
    this.UserService = InjectableUserService
  }

  async create(req, res) {
    try {
      const { id, email, provider } = await this.UserService.create(req.body)
      res.json({ id, email, provider })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id, email, provider } = await this.UserService.update(
        req.userId,
        req.body
      )
      res.json({ id, email, provider })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  async allProviders(req, res) {
    try {
      const users = await this.UserService.allProviders()
      res.json(users)
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }
}
