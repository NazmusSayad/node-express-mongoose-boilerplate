exports.ReqError = class ReqError extends Error {
  constructor(message, statusCode = 404) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
  name = 'ReqError'
  isOperational = true
}

exports.catchSync = fn => (req, res, next) => {
  try {
    fn(req, res, next)
  } catch (err) {
    next(err)
  }
}

exports.catchAsync = fn => (req, res, next) => {
  fn(req, res, next).catch(next)
}

exports.catchError = fn => async (req, res, next) => {
  try {
    const returnValue = fn(req, res, next)
    if (returnValue instanceof Promise) await returnValue
  } catch (err) {
    next(err)
  }
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
    return this._reset.concat([...arguments].join(''))
  },

  brightSuccess(message) {
    console.log(this._generate(this._bright, this._green, message))
    this.__reset()
  },
  brightFail(message) {
    console.error(this._generate(this._bright, this._red, message))
    this.__reset()
  },
}
