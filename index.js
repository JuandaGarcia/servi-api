var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)

const mongoURI = 'mongodb://localhost:27017/servi-api'

mongoose
	.connect(mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err))

var Users = require('./routes/Users')
var Prestador = require('./routes/Prestador')
var Servicio = require('./routes/servicio.routes.js')
var Pedido = require('./routes/pedido.routes.js')
var Admin = require('./routes/admin.routes.js')

app.use('/users', Users)
app.use('/prestador', Prestador)
app.use('/servicios', Servicio)
app.use('/pedidos', Pedido)
app.use('/admin', Admin)

app.listen(port, function () {
	console.log('Server is running on port: ' + port)
})
