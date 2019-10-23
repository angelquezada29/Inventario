
productSchema = new Schema({
    idProducto: {
        type: Number,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        required: true
    }
})

module.exports.productSchema = this.productSchema;