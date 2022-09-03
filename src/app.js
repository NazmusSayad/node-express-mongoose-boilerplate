const express = require('express')
const cors = require('cors')
const router = require('./router')
const response = require('./core/response')

const app = express()
app.use(cors())
app.use(express.json())

app.use(response.addSuccessMethod)
app.use(router)
app.all('*', response.notFound)
app.use(response.errorHandler)

module.exports = app
