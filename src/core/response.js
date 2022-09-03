const AppError = require('./app-error')
const makeAppError = require('./make-app-error')

const respondError =
  process.env.NODE_ENV === 'development'
    ? (err, res) => {
        res.status(err.statusCode).json({
          status: err.statusCode < 500 ? 'fail' : 'error',
          message: err.message,
          error: err,
          error_stack: err.stack,
        })
      }
    : (err, res) => {
        res.status(err.statusCode).json({
          status: err.statusCode < 500 ? 'fail' : 'error',
          message: err.message,
        })
      }

exports.addSuccessMethod = (req, res, next) => {
  res.success = function (data, code = 200) {
    this.status(code).json({
      status: 'success',
      data,
    })
  }
  next()
}

exports.notFound = (req, res, next) => {
  next(new AppError(`Oops, looks like you're lost in space!`))
}

exports.errorHandler = (err, req, res, next) => {
  if (err.name !== 'AppError') err = makeAppError(err)
  respondError(err, res)
}
