const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  expiresIn: process.env.EXPIRES_IN,
}
export default authConfig
