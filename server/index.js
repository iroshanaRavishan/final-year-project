const app = require('./config/express');
const config = require('./config/config');

//inizializing mongo
require('./config/mongoose');

//listen to the port
app.listen(config.port, () => {
    console.log(`The server sterted on the port ${config.port} (${config.env})`);
});