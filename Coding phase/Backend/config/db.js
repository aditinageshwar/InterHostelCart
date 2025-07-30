const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const sqlDir = path.join(__dirname, '../../Database'); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aditi@1234',
  database: 'ecommerce_db',
  multipleStatements: true 
});
connection.connect();

const files = [
  'user.sql', 'item.sql', 'orderHistory.sql', 'soldHistory.sql',
  'wishlist.sql', 'chatService.sql', 'transaction.sql', 'queries.sql',
];

files.forEach(file => {
  const filePath = path.join(sqlDir, file);
  if(fs.existsSync(filePath)) {
    const query = fs.readFileSync(filePath, 'utf8');
    connection.query(query, (err) => {
      if (err) throw err;
      console.log(`${file} executed successfully`);
    });
  } 
  else {
    console.warn(`Missing file: ${filePath}`);
  }
});