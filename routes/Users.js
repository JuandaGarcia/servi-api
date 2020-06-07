const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
	const today = new Date()
	const userData = {
		nombre: req.body.nombre,
		email: req.body.email,
		password: req.body.password,
		telefono: req.body.telefono,
		created: today,
	}

	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash
					User.create(userData)
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

users.post('/login', (req, res) => {
	User.findOne({
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
					}
					let token = jwt.sign(payload, process.env.SECRET_KEY)
					res.status(200).send(token)
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

users.get('/profile/:id', (req, res) => {
	var decoded = jwt.verify(req.params.id, process.env.SECRET_KEY)

	User.findOne({
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

module.exports = users
