export default {
  host: process.env.HOST_MAIL || 'smtp.mailtrap.io',
  port: process.env.PORT_MAIL || 2525,
  secure: false,
  auth: {
    user: process.env.USER_MAIL || '3ab931b69f8dc3',
    pass: process.env.PASS || 'a108ad0b4178e1',
  },
  default: {
    from:
      process.env.FROM_MAIL || 'Equipe node-starter <noreply@node-starter.com>',
  },
}
