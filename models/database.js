const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    insecureAuth : true
});

// connect to mysql
connection.connect(function (err, connect) {
    if (connect) console.log("Successfully connected to mysql db.")
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// export pool to controllers
module.exports = connection;