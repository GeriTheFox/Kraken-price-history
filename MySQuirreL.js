const util = require('util')
const mysql = require('mysql')
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.SQL_H,
  port:  process.env.SQL_P,
  user: process.env.SQL_N,
  password:  process.env.SQL_PW,
  database:  process.env.SQL_DB,
})

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

pool.query = util.promisify(pool.query)

module.exports = pool