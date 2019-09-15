module.exports = {
  dialect: process.env.DEV_DIALECT,
  host: process.env.DEV_HOST,
  username: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
  port: Number(process.env.DEV_PORT),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
