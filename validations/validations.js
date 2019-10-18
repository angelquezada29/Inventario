const Joi = require('@hapi/joi');

const schemaProduct = Joi.object({
    idProducto: Joi.number()
        .integer()
        .min(1),

    nombre: Joi.string()
        .max(10)
        .required(),

    marca: Joi.string()
        .max(250),

    precio: Joi.number()
        .integer()
        .min(0),

    fecha: Joi.string()
        .max(250)
});

const schemaInventory = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),

    fkInventario: Joi.number()
        .integer()
        .min(1)
        .required(),

    fkProducto: Joi.number()
        .integer()
        .min(1)
        .required(),

    cantidad: Joi.number()
        .integer()
        .min(1),

    fechaDeCarga: Joi.string()
        .max(250)
});

module.exports.schemaProduct = schemaProduct;
module.exports.schemaInventory = schemaInventory;