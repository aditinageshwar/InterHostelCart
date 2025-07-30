const mysql = require('mysql2/promise');
require('dotenv').config();

const railwayDB=`mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`
let db;

async function handleDisconnect() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    db.connect(err => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000);     // Reconnect after 2 seconds
        }
    });

    db.on('error', async (err) => {
      console.error('Database error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting...');
        await handleDisconnect();                  // Reconnect if connection is lost
      } else {
        throw err;
      }
    });
    console.log('MySQL connected (promise-based)');
   } 
   catch (err) {
    console.error('Error connecting to database:', err);
    setTimeout(handleDisconnect, 2000);          // Retry after 2s
  }
}
handleDisconnect();

module.exports = db;