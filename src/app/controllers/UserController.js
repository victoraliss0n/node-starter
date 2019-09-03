import UserService from '../providers/UserService'

export default class UserController {
  constructor(InjectableUserService = new UserService()) {
    this.UserService = InjectableUserService
  }

  async create(req, res) {
    try {
      const user = await this.UserService.create(req.body)
      res.send(user)
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }
}
