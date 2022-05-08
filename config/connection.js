const { connect, connection } = require('mongoose');

connect('mongodb://localhost/techSocialAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
