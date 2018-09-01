const mongoose = require('mongoose');

// import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// connect to database
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', err => {
  console.error(`Could not connect to MLAB Mongo Database → ${err.message}`);
});

// import models
require('./models/User');
require('./models/Brother');
require('./models/Fulltime');
require('./models/Internship');
require('./models/CoffeeChat');
require('./models/Regform');
require('./models/Application');

const app = require('./app');
app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
