class ReqError extends Error {
  constructor(message, statusCode = 404) {
    super(message)

    this.isOperational = true
    this.name = this.constructor.name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ReqError
