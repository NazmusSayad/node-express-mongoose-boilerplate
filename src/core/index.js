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
  __reset() {
    process.stdout.write(this._reset)
  },
  _generate() {
    return this._reset.concat([...arguments].join(''), '%s')
  },

  brightSuccess() {
    console.log(this._generate(this._bright, this._green), ...arguments)
    this.__reset()
  },
  brightFail() {
    console.error(this._generate(this._bright, this._red), ...arguments)
    this.__reset()
  },
}
