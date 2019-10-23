const connMySql = require('./connection');
let conn = connMySql.conn;

var schemaProduct = require('../validations/validations').schemaProduct;

let productService = {
    getProducts: (req, res) => {
        let sql = "SELECT * FROM Producto;";
        let query = conn.query(sql, (err, results) => {
            if (err) throw err;
            return res.status(200).json({ "error": false, "response": results });
        });
    },

    getProduct: (req, res) => {
        const id = req.params.idProducto;
        let sql = "SELECT * FROM Producto WHERE idProducto = ?";
        let query = conn.query(sql, id, (err, results) => {
            if (err) throw err;
            return res.status(200).json({ "error": false, "response": results });
        });
    },

    saveProduct: (req, res) => {
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
    },

    updateProduct: (req, res) => {
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
    },

    deleteProduct: (req, res) => {
        const id = req.params.idProducto
        let sql = "DELETE FROM Producto WHERE idProducto = ?";
        let query = conn.query(sql, id, (err, results) => {
            if (err) throw err;
            return res.status(200).json({ "error": false, "response": results });
        });
    }
}

module.exports = productService;