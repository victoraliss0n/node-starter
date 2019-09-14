import nodemailer from 'nodemailer'
import expressHbs from 'express-handlebars'
import nodemailerHbs from 'nodemailer-express-handlebars'
import mailConfig from '../../config/mail'
import { resolve } from 'path'

export default class MailHelper {
  constructor(InjectableNodemailer = nodemailer) {
    const { host, port, secure, auth } = mailConfig
    this.transporter = InjectableNodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })
    this.setupTemplates()
  }

  setupTemplates() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails')
    console.info(resolve(viewPath, 'layouts'))
    this.transporter.use(
      'compile',
      nodemailerHbs({
        viewEngine: expressHbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    )
  }

  async sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    })
  }
}
