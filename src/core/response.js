const getErrorInfo = require('./get-error-info')

exports.addSuccessMethod = (req, res, next) => {
  res.success = function (data, statusCode = 200) {
    this.status(statusCode).json({
      status: 'success',
      data,
    })
  }
  next()
}

exports.notFound = (req, res, next) => {
  next(new ReqError(`Oops, looks like you're lost in space!`))
}

const respondErrorDev = (err, req, res, next) => {
  const [message, code] = getErrorInfo(err)

  res.status(code).json({
    status: code < 500 ? 'fail' : 'error',
    message,
    error: err,
    stack: err.stack,
  })
}

const respondErrorProd = (err, req, res, next) => {
  const [message, code] = getErrorInfo(err)

  res.status(code).json({
    status: code < 500 ? 'fail' : 'error',
    message: message,
  })
}

exports.errorHandler =
  process.env.NODE_ENV === 'development' ? respondErrorDev : respondErrorProd
