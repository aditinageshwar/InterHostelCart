const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aditi@1234',
  database: 'ecommerce_db',
  multipleStatements: true, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

const sqlDir = path.join(__dirname, '../../Database');
const files = [
  'user.sql', 'item.sql', 'orderHistory.sql', 'soldHistory.sql',
  'wishlist.sql', 'chatService.sql', 'transaction.sql', 'queries.sql'
];

(async () => {
  for (const file of files) {
    const filePath = path.join(sqlDir, file);
    if (fs.existsSync(filePath)) {
      const query = fs.readFileSync(filePath, 'utf8');
      try {
        await pool.query(query);
        console.log(`${file} executed successfully`);
      } catch (err) {
        console.error(`Error executing ${file}:`, err.message);
      }
    } else {
      console.warn(`Missing file: ${filePath}`);
    }
  }
})();

module.exports = pool;