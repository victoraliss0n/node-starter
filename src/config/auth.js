const authConfig = {
  // Temporary...
  jwtSecret: process.env.JWT_SECRET || '8569246b122c74d2a280a90c3de417e9',
  expiresIn: process.env.EXPIRES_IN || '7d',
}
export default authConfig
