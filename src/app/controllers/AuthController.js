import AuthService from '../providers/AuthService'
export default class AuthController {
  constructor(InjectableAuthService = new AuthService()) {
    this.AuthService = InjectableAuthService
  }

  async create(req, res) {
    try {
      const user = await this.AuthService.createSession(req.body)
      res.json(user)
    } catch (error) {
      res.status(401).send({ error: error.message })
    }
  }
}
