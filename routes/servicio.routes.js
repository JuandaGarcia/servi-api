const express = require('express')
const servicios = express.Router()
const cors = require('cors')

const Servicio = require('../models/Servicio')
servicios.use(cors())

servicios.post('/', (req, res) => {
	const DataServicio = {
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		categoria: req.body.categoria,
		precio: req.body.precio,
		nombre_usuario_prestador: req.body.nombre_usuario,
		email_usuario_prestador: req.body.email_usuario,
	}

	Servicio.create(DataServicio)
		.then(() => {
			res.status(200).json({ status: 'creado' })
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

servicios.get('/todos', (req, res) => {
	Servicio.find()
		.then((servicios) => {
			res.status(200).json(servicios)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

servicios.get('/prestador/:email', (req, res) => {
	Servicio.find({
		email_usuario_prestador: req.params.email,
	})
		.then((servicios) => {
			res.status(200).json(servicios)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

servicios.get('/categoria/:categoria', (req, res) => {
	Servicio.find({
		categoria: req.params.categoria,
	})
		.then((servicios) => {
			res.status(200).json(servicios)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

servicios.put('/', (req, res) => {
	Servicio.update(
		{ _id: req.body.id },
		{
			$set: {
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				categoria: req.body.categoria,
				precio: req.body.precio,
			},
		}
	)
		.then(() => {
			res.status(200).json({ status: 'actualizado' })
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

servicios.delete('/:id/:email', (req, res) => {
	Servicio.deleteOne({ _id: req.params.id })
		.then(() => {
			Servicio.find({
				email_usuario_prestador: req.params.email,
			})
				.then((servicios) => {
					res.status(200).json(servicios)
				})
				.catch((err) => {
					res.status(500).send('error: ' + err)
				})
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

module.exports = servicios
