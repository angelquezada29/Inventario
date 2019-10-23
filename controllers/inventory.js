const connMySql = require('./connection');
var conn = connMySql.conn;

const express = require('express');
var router = express.Router();

var schemaInventory = require('../validations/validations').schemaInventory;

router.get('/inventario', (req, res) => {
    let sql = "SELECT pi.id, p.idProducto, p.nombre, p.marca, p.precio, pi.cantidad, pi.fechaDeCarga FROM productoXinventario pi inner join Producto p on p.idProducto = pi.fkProducto where pi.fkInventario = 1;";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ "error": false, "response": results });
    });
});

router.post('/inventario', (req, res) => {
    if (!schemaInventory.validate(req.body).error) {

        let sql = "INSERT INTO productoXinventario SET ?";
        let query = conn.query(sql, req.body, (err, results) => {
            if (err) throw err;
            return res.status(201).json({ "error": false, "response": `Producto agregado con ID: ${results.insertId}` });
        });
    } else {
        return res.status(500).json({ "error": true, "msg": "Error validacion" });
    }
});

router.delete('/inventario/:id', (req, res) => {
    const id = req.params.id
    let sql = "DELETE FROM productoXinventario WHERE id = ?";
    let query = conn.query(sql, id, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ "error": false, "response": results });
    });
});

router.put('/inventario/:id', (req, res) => {
    const id = req.params.id
    let sql = "UPDATE productoXinventario SET ? WHERE id = ?";
    let query = conn.query(sql, [req.body, id], (err, results) => {
        if (err) throw err;

        return res.status(200).json({"error": false, "response": results });
    });
});

module.exports = router;