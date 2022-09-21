const errorManager = require('./error')

const respondErrorDevMode = (err, req, res, next) => {
  const [message, code] = errorManager(err)
  res.status(code).json({
    status: code < 500 ? 'fail' : 'error',
    message,
    error: err,
    stack: err.stack,
  })
}

const respondErrorProdMode = (err, req, res, next) => {
  const [message, code] = errorManager(err)
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
  if (!(data instanceof Object)) {
    throw new Error('DEV: Data should be an object')
  }
  this.status(code).json({
    status: 'success',
    data,
  })
}
