// import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

const app = require('./app');

// connect to databases
require('./databases/static');
require('./databases/application');

// import models
require('./models/Brother');
require('./models/FulltimeCareer');
require('./models/InternCareer');
require('./models/Regform');

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
