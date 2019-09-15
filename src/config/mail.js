export default {
  host: process.env.HOST_MAIL,
  port: Number(process.env.PORT_MAIL),
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS,
  },
  default: {
    from: process.env.FROM_MAIL,
  },
}
