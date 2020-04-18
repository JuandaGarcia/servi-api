const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de usuarios
const PedidoSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	id_servicio: {
		type: String,
		required: true,
	},
	email_usuario_comun: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Pedido = mongoose.model('pedido', PedidoSchema)
