// to decode environment parameters to variables
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});
const host=process.env.host;
const user=process.env.user;
const password= process.env.password;
const database=process.env.database;
const port=process.env.port;

const configParams={
    "host":host,
    "user":user,
    "password":password,
    "database":database,
    "port":port
}


module.exports= {
    configParams
}
