const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const response = require('./core/response')
const router = require('./router')

const app = express()
const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: {
    status: 'fail',
    message:
      'Too many requests from this IP, please try again after a deep sleep',
  },
})

app.use(cors())
app.use(helmet())
app.use('*', globalLimiter)
app.use(express.json({ limit: '8kb' }))
app.use(mongoSanitize())
app.use(xss())

app.response.success = response.success

app.use('/v1', router)
app.use('*', response.notFound)
app.use(response.errorHandler)

module.exports = app
