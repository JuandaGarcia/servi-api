const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de usuarios
const ServicioSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	tipo_servicio: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	tipo: {
		type: String,
		required: true,
	},
	email_usuario_prestador: {
		type: String,
		required: true,
	},
	calificacion: {
		type: Number,
		required: true,
	},
	estado: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Servicio = mongoose.model('servicio', ServicioSchema)
