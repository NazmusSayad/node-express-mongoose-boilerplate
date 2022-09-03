class AppError extends Error {
  constructor(message, statusCode = 404) {
    super(message)

    this.isOperational = true
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.status = statusCode < 500 ? 'fail' : 'error'
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
