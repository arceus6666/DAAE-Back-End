module.exports = {
  port: process.env.PORT || 9000,
  db: process.env.MONGODB_URI || 'mongodb:localhost27017/DAAE',
  SECRET_TOKEN: 'DAEE_token'
  // to check
}
