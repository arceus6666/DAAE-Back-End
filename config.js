module.exports = {
  port: process.env.PORT || 7890,
  db: process.env.MONGODB_URI || 'mongodb:localhost:27017/DAAE',
  SECRET_TOKEN: 'DAEE_token'
  // to check
}
