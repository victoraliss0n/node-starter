import Notification from '../schemas/Notification'
import User from '../models/User'

export default class NotificationService {
  constructor(InjectableNotification = Notification, InjectableUser = User) {
    this.Appointment = InjectableNotification
    this.User = InjectableUser
  }

  async all(userId) {
    const provider = await this.User.findOne({
      where: { id: userId, provider: true },
    })
    if (!(provider instanceof User)) {
      throw Error('User is not provider')
    }
    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20)
    return notifications
  }
}
