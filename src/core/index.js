class ReqError extends Error {
  constructor(message, statusCode = 404) {
    super(message)

    this.isOperational = true
    this.name = this.constructor.name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

exports.ReqError = ReqError

exports.catchAsync = fn => (req, res, next) => {
  fn(req, res, next).catch(next)
}

exports.proConsole = {
  _reset: '\x1b[0m',
  _bright: '\x1b[1m',
  _green: '\x1b[32m',
  _red: '\x1b[31m',
  _log(init, logger) {
    process.stdout.write([this._reset, ...init].join(''))
    logger()
    process.stdout.write(this._reset)
  },
  brightSuccess() {
    this._log([this._bright, this._green], console.log.bind(this, ...arguments))
  },
  brightFail() {
    this._log([this._bright, this._red], console.error.bind(this, ...arguments))
  },
}
