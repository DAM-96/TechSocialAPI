const { connect, connection } = require('mongoose');

const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/techSocialAPI';

connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
