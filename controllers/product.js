const connMySql = require('./connection');
var conn = connMySql.conn;

var express = require('express');
var router = express.Router();

var schemaProduct = require('../validations/validations').schemaProduct;

//show all products
router.get('/producto', (req, res) => {
    let sql = "SELECT * FROM Producto;";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ "error": false, "response": results });
    });
});

//show single product
router.get('/producto/:idProducto', (req, res) => {
    const id = req.params.idProducto;
    let sql = "SELECT * FROM Producto WHERE idProducto = ?";
    let query = conn.query(sql, id, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ "error": false, "response": results });
    });
});

//add new product
router.post('/producto', (req, res) => {
    if (!schemaProduct.validate(req.body).error) {
        // let data = { nombre: req.body.nombre, marca: req.body.marca, precio: req.body.precio, fecha: req.body.fecha };
        let sql = "INSERT INTO Producto SET ?";
        let query = conn.query(sql, req.body, (err, results) => {
            if (err) throw err;
            return res.status(201).json({ "error": false, "response": `Producto agregado con ID: ${results.insertId}` });
        });
    } else {
        return res.status(400).json({ "error": true, "msg": "Error validacion" });
    }

});

//update product
router.put('/producto/:idProducto', (req, res) => {
    if (!schemaProduct.validate(req.body).error) {
        const id = req.params.idProducto
        let sql = "UPDATE Producto SET ? WHERE idProducto = ?";
        let query = conn.query(sql, [req.body, id], (err, results) => {
            if (err) throw err;

            return res.status(200).json({ "error": false, "response": results });
        });
    } else {
        return res.status(400).json({ "error": true, "msg": "Error validacion" });
    }
});

//delete product
router.delete('/producto/:idProducto', (req, res) => {
    const id = req.params.idProducto
    let sql = "DELETE FROM Producto WHERE idProducto = ?";
    let query = conn.query(sql, id, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ "error": false, "response": results });
    });
});

module.exports = router;