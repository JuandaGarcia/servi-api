const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de usuarios
const PedidoSchema = new Schema({
	id_servicio: {
		type: String,
		required: true,
	},
	nombre_servicio: {
		type: String,
		required: true,
	},
	nombre_prestador: {
		type: String,
		required: true,
	},
	telefono_usuario: {
		type: String,
		required: true,
	},
	email_usuario_comun: {
		type: String,
		required: true,
	},
	email_usuario_prestador: {
		type: String,
		required: true,
	},
})

module.exports = Pedido = mongoose.model('pedido', PedidoSchema)
