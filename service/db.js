const mysql = require('mysql2/promise');
const config= require('./config.js');
async function query(sql, params) {
  const db =config['configParams'];                   //get the database parameters
  const connection = await mysql.createConnection(db);
  const [results, ] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = {
  query
}
