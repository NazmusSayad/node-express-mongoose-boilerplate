const express = require('express')
const { default: expressMaster } = require('express-master')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const { handleError } = require('req-error')
const router = require('./router')
const app = expressMaster()

const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: {
    status: 'fail',
    message:
      'Too many requests from this IP, please try again after a deep sleep',
  },
})

// Safety
app.use(cors())
app.use(helmet())
app.use(globalLimiter)

// Pasrer
app.use(express.json({ limit: '8kb' }))

// XXS
app.use(mongoSanitize())
app.use(xss())

// Routes
app.use(router)
handleError(app)

module.exports = app
