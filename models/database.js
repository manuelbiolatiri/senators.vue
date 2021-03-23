const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// connect to database
const connection = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com'|| process.env.DB_HOST,
    user: 'b10b61260bcbd0' || process.env.DB_USER,
    password: '9dc58010' || process.env.DB_PASSWORD,
    database: 'heroku_52bafaf1dc6c1e7' || process.env.DB_DATABASE,
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