const app = require('./config/express');
const config = require('./config/config');

//inizializing mongo
require('./config/mongoose');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
//     next();
//   });


//listen to the port
app.listen(config.port, () => {
    console.log(`The server sterted on the port ${config.port} (${config.env})`);
});