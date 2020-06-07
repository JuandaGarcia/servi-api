const express = require('express')
const admin = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Admin = require('../models/Admin')
admin.use(cors())

process.env.SECRET_KEY = 'secret'

admin.post('/login', (req, res) => {
	Admin.findOne({
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

module.exports = admin
