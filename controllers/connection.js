const mysql = require('mysql');

//Informacion de conexion MySql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports.conn = conn;
module.exports.connect = function () {
    conn.connect((err) => {
        if (err) throw err;
        console.log('Mysql Connected...');
    });
}