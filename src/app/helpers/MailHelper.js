import nodemailer from 'nodemailer'
import mailConfig from '../../config/mail'
export default class MailHelper {
  constructor(injectableNodemailer = nodemailer) {
    const { host, port, secure, auth } = mailConfig
    this.transporter = injectableNodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })
  }

  async sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    })
  }
}
