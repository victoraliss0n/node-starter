import MailHelper from '../helpers/MailHelper'
import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'

export default class CancellationMail {
  get key() {
    return 'CancellationMail'
  }

  async handle({ data }) {
    const { appointment } = data
    const mail = new MailHelper()
    await mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment cancelled',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    })
  }
}
