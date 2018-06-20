// require('dotenv').config({ path: __dirname + '../variables.env' });
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const mongooseStatic = mongoose.createConnection(process.env.MONGO_STATIC_URI);
mongoose.connection.on('error', err => {
  console.error(`Could not connect to MLAB Static Database → ${err.message}`);
});

module.exports = mongooseStatic;
