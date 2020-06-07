const express = require('express')
const pedidos = express.Router()
const cors = require('cors')

const Pedido = require('../models/Pedido')
pedidos.use(cors())

pedidos.post('/', (req, res) => {
	const DataPedido = {
		id_servicio: req.body.id_servicio,
		nombre_servicio: req.body.nombre_servicio,
		nombre_prestador: req.body.nombre_prestador,
		telefono_usuario: req.body.telefono_usuario,
		email_usuario_comun: req.body.email_usuario_comun,
		email_usuario_prestador: req.body.email_usuario_prestador,
	}
	Pedido.create(DataPedido)
		.then(() => {
			res.status(200).json({ status: 'creado' })
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

pedidos.get('/user/:email', (req, res) => {
	Pedido.find({
		email_usuario_comun: req.params.email,
	})
		.then((pedidos) => {
			res.status(200).json(pedidos)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

pedidos.get('/prestador/:email', (req, res) => {
	Pedido.find({
		email_usuario_prestador: req.params.email,
	})
		.then((pedidos) => {
			res.status(200).json(pedidos)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

pedidos.delete('/:id/:email', (req, res) => {
	Pedido.deleteOne({ _id: req.params.id })
		.then(() => {
			Pedido.find({
				email_usuario_prestador: req.params.email,
			})
				.then((pedidos) => {
					res.status(200).json(pedidos)
				})
				.catch((err) => {
					res.status(500).send('error: ' + err)
				})
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

module.exports = pedidos
