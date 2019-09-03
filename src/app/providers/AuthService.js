import UserService from '../providers/UserService'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default class AuthService {
  constructor(InjectableUserService = new UserService()) {
    this.userService = InjectableUserService
  }

  async createSession(body) {
    const { email, password } = body
    const user = await this.userService.findOne(body)
    if (!(await user.checkPassword(password))) {
      return Error('Invalid Password')
    }
    const { id, name } = user
    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.jwtSecret, {
        expiresIn: authConfig.expiresIn,
      }),
    }
  }
}
