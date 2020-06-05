const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de usuarios
const ServicioSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	categoria: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	nombre_usuario_prestador: {
		type: String,
		required: true,
	},
	email_usuario_prestador: {
		type: String,
		required: true,
	},
})

module.exports = Servicio = mongoose.model('servicio', ServicioSchema)
