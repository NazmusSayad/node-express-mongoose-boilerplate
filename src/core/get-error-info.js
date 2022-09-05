const errorHandler = require('./error-handler')

module.exports = err => {
  if (err.isOperational) return [err.message, err.statusCode]

  if (err.code === 11000) {
    return [errorHandler.duplicateError(err), 404]
  }

  switch (err.name) {
    case 'JsonWebTokenError':
      return ['Invalid auth token', 401]

    case 'TokenExpiredError':
      return ['Auth token has been expired', 401]

    case 'ObjectParameterError':
      return [errorHandler.objParamError(err), 404]

    case 'CastError':
      return [errorHandler.castError(err), 404]

    case 'ValidationError':
      return [errorHandler.validationError(err), 404]

    default:
      console.error('\x1b[31m%s\x1b[0m', '!!! ', err)
      return ['Something went very wrong!', 500]
  }
}
