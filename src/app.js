const express = require('express')
const cors = require('cors')
const router = require('./router/route.js')
const errorController = require('./error/error-controller.js')
const AppError = require('./error/app-error.js')
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  req.success = function (statusCode, data) {
    this.res.status(statusCode).json({
      status: 'success',
      data,
    })
  }
  next()
})

app.use(`/v1/api/`, router)

app.all('*', (req, res, next) => {
  next(new AppError('Not found!', 404))
})

app.use(errorController)

module.exports = app
