const mysql = require('mysql');

//Informacion de conexion MySql
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'angel92teltron',
    database: 'InventarioDB'
});


module.exports.conectar = function () {
    conn.connect((err) => {
        if (err) throw err;
        console.log('Mysql Connected...');
    });
}
module.exports.conn = conn;