const app = express();
const conexion = require('./conexion-base-de-datos/conexion');

const bodyParser = require('body-parser');
const cors = require('cors');

conexion.conectar();
var conn = conexion.conn;

app.use(cors());
// parse application/json
app.use(bodyParser.json());

//show all Alumnos
app.get('/api/inventario',(req, res) => {
  let sql = "SELECT pi.id, p.idProducto, p.nombre, p.marca, p.precio, pi.cantidad, pi.fechaDeCarga FROM productoXinventario pi inner join Producto p on p.idProducto = pi.fkProducto where pi.fkInventario = 1;";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/inventario',(req, res) => {

  let sql = "INSERT INTO productoXinventario SET ?";
  let query = conn.query(sql, req.body, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 201, "error": null, "response": `Producto agregado con ID: ${results.insertId}`}));
  });
});

app.delete('/api/inventario/:id',(req, res) => {
  const id = req.params.id
  let sql = "DELETE FROM productoXinventario WHERE id = ?";
  let query = conn.query(sql, id, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.put('/api/inventario/:id',(req, res) => {
  const id = req.params.id
  let sql = "UPDATE productoXinventario SET ? WHERE id = ?";
  let query = conn.query(sql, [req.body, id],(err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//show all Alumnos
app.get('/api/producto',(req, res) => {
  let sql = "SELECT * FROM Producto;";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show single Alumno
app.get('/api/producto/:idProducto',(req, res) => {
  const id = req.params.idProducto
  let sql = "SELECT * FROM Producto WHERE idProducto = ?" ;
  let query = conn.query(sql, id, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new Alumno
app.post('/api/producto',(req, res) => {
  let data = {nombre: req.body.nombre, marca: req.body.marca, precio: req.body.precio, fecha: req.body.fecha};
  let sql = "INSERT INTO Producto SET ?";
  let query = conn.query(sql, req.body, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 201, "error": null, "response": `Producto agregado con ID: ${results.insertId}`}));
  });
});
 
//update Alumno
app.put('/api/producto/:idProducto',(req, res) => {
  const id = req.params.idProducto
  let sql = "UPDATE Producto SET ? WHERE idProducto = ?";
  let query = conn.query(sql, [req.body, id],(err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete Alumno

//? sql injection
app.delete('/api/producto/:idProducto',(req, res) => {
  const id = req.params.idProducto
  let sql = "DELETE FROM Producto WHERE idProducto = ?";
  let query = conn.query(sql, id, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});