const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')

const coreUtils = require('./core/utils')
const router = require('./router')

const app = express()
const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: coreUtils.getFail(
    'Too many requests from this IP, please try again after a deep sleep',
    429
  ),
})

app.use(cors())
app.use(helmet())
app.use(globalLimiter)
app.all('/ping', coreUtils.ping)
app.use(express.json({ limit: '8kb' }))
app.use(mongoSanitize())
app.use(xss())

app.response.success = coreUtils.success
app.request.getBody = coreUtils.getBody

app.use(router)
app.use(coreUtils.notFound)
app.use(coreUtils.errorHandler)

module.exports = app
