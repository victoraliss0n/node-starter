module.exports = {
  dialect: process.env.DEV_DIALECT || 'mysql',
  host: process.env.DEV_HOST || 'node-starter-mysql',
  username: process.env.DEV_USERNAME || 'node-starter',
  password: process.env.DEV_PASSWORD || 'node-starter',
  database: process.env.DEV_DATABASE || 'node-starter',
  port: process.env.DEV_PORT || 3306,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
