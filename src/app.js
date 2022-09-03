const express = require('express')
const cors = require('cors')
const router = require('./router/route.js')
const errorController = require('./error/error-controller.js')
const AppError = require('./error/app-error.js')
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.success = function (statusCode = 200, data) {
    this.status(statusCode).json({
      status: 'success',
      data,
    })
  }
  next()
})

app.use(`/v1/api/`, router)

app.all('*', (req, res, next) => {
  next(new AppError('Not found!'))
})

app.use(errorController)

module.exports = app
