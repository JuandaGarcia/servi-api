const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquema de usuarios
const UserPrestadorSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	telefono: {
		type: String,
		required: true,
	},
	servicios: {
		type: [Number],
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = UserPrestador = mongoose.model(
	'usersPrestador',
	UserPrestadorSchema
)
