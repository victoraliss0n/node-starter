import User from '../models/User'

export default class UserService {
  constructor(InjectableUser = User) {
    this.User = InjectableUser
  }

  async create(body) {
    const userExists = await User.findOne({
      where: {
        email: body.email,
      },
    })
    if (userExists instanceof User) {
      throw Error('User already exists')
    }
    const user = await this.User.create(body)
    return user
  }

  async findOne({ email }) {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (!(user instanceof User)) {
      throw Error('User not found')
    }
    return user
  }
}
