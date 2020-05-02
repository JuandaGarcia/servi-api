const express = require('express')
const prestador = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserPrestador = require('../models/UserPrestador')
prestador.use(cors())

process.env.SECRET_KEY = 'secret'

prestador.post('/register', (req, res) => {
	const today = new Date()
	const userData = {
		nombre: req.body.nombre,
		email: req.body.email,
		password: req.body.password,
		telefono: req.body.telefono,
		aceptado: false,
		created: today,
	}

	UserPrestador.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash
					UserPrestador.create(userData)
						.then((user) => {
							res.json({ status: user.email + ' Registered!' })
						})
						.catch((err) => {
							res.send('error: ' + err)
						})
				})
			} else {
				res.json({ error: 'User already exists' })
			}
		})
		.catch((err) => {
			res.send('error: ' + err)
		})
})

prestador.post('/login', (req, res) => {
	UserPrestador.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					// Passwords match
					const payload = {
						_id: user._id,
						nombre: user.nombre,
						email: user.email,
						aceptado: user.aceptado,
					}
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 1440,
					})
					res.send(token)
				} else {
					// Passwords don't match
					res.json({ error: 'User does not exist' })
				}
			} else {
				res.json({ error: 'User does not exist' })
			}
		})
		.catch((err) => {
			res.send('error: ' + err)
		})
})

prestador.get('/profile', (req, res) => {
	var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

	UserPrestador.findOne({
		_id: decoded._id,
	})
		.then((user) => {
			if (user) {
				res.json(user)
			} else {
				res.send('User does not exist')
			}
		})
		.catch((err) => {
			res.send('error: ' + err)
		})
})

prestador.get('/todos', async (req, res) => {
	var usuarios = await UserPrestador.find({ aceptado: false })
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

prestador.delete('/:id', async (req, res) => {
	const { id } = req.params
	console.log(id)
	await UserPrestador.deleteOne({ _id: id })
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

prestador.put('/:id', async (req, res) => {
	const { id } = req.params
	console.log(id)
	await UserPrestador.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				aceptado: true,
			},
		}
	)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

module.exports = prestador
