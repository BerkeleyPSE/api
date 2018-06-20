// require('dotenv').config({ path: __dirname + '../variables.env' });
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const mongooseApp = mongoose.createConnection(process.env.MONGO_APP_URI);
mongoose.connection.on('error', err => {
  console.error(`Could not connect to MLAB App Database → ${err.message}`);
});

module.exports = mongooseApp;
