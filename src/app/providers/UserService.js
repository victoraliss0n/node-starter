import User from '../models/User'

export default class UserService {
  constructor(InjectableUser = User) {
    this.User = InjectableUser
  }

  async create(body) {
    body.email = null
    const { email } = body
    const userExists = await this.User.findOne({
      where: {
        email,
      },
    })
    if (userExists instanceof User) {
      throw Error('User already exists')
    }
    const user = await this.User.create(body)
    return user
  }
}
