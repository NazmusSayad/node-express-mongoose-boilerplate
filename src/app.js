const express = require('express')
const cors = require('cors')
const router = require('./router/route.js')
const app = express()
module.exports = app

app.use(cors())
app.use(express.json())

app.use(`/v1/api/`, router)
