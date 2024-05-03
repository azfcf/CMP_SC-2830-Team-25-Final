const mysql = require("mysql");

const conn = mysql.createConnection({
   host:     "localhost",
   user:     "myusername",
   password: "mypassword",
   database: "test"
});

conn.connect(function(err) {
   if (err) {
      console.log("Error connecting to MySQL:", err);
   }
   else {
      console.log("Connection established");
   }
});

