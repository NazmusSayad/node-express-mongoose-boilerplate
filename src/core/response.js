const errorHandler = require('./error-handler')

const respondErrorDevMode = (err, req, res, next) => {
  const [message, code] = errorHandler(err)
  res.status(code).json({
    status: code < 500 ? 'fail' : 'error',
    message,
    error: err,
    stack: err.stack,
  })
}

const respondErrorProdMode = (err, req, res, next) => {
  const [message, code] = errorHandler(err)
  res.status(code).json({
    status: code < 500 ? 'fail' : 'error',
    message,
  })
}

exports.errorHandler =
  process.env.NODE_ENV === 'development'
    ? respondErrorDevMode
    : respondErrorProdMode

exports.notFound = (req, res, next) => {
  next(new ReqError(`Oops, looks like you're lost in space!`))
}

exports.success = function (data, code = 200) {
  this.status(code).json({
    status: 'success',
    data,
  })
}
