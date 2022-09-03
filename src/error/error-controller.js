const makeAppError = require('./make-app-error')

module.exports = (err, req, res, next) => {
  if (err.name !== 'AppError') {
    err = makeAppError(err)
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}
