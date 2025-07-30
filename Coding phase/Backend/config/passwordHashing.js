const bcrypt = require("bcrypt");
const pool = require("./db"); 
const saltRounds = 10;

(async () => {
  try {
    const [rows] = await pool.query("SELECT emailid, userpassword FROM usertable");

    for (const user of rows) {
      if (user.userpassword.startsWith("$2b$")) {
        console.log(`Already hashed: ${user.emailid}`);
        continue;
      }

      const hashed = await bcrypt.hash(user.userpassword, saltRounds);
      await pool.query("UPDATE usertable SET userpassword = ? WHERE emailid = ?", [hashed, user.emailid]);
      console.log(`Password hashed for ${user.emailid}`);
    }
  } 
  catch (err) {
    console.error("Error during hashing:", err);
  } 
  finally {
    await pool.end(); 
  }
})();