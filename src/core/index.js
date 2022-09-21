global.ReqErr = class ReqError extends Error {
  static catch = fn => (req, res, next) => {
    try {
      const returnValue = fn(req, res, next)
      if (returnValue instanceof Promise) returnValue.catch(next)
    } catch (err) {
      next(err)
    }
  }

  static wrapper() {
    const input = arguments.length > 1 ? [...arguments] : arguments[0]

    if (input instanceof Array) {
      return input.map(fn => this.catch(fn))
    }

    if (input instanceof Object) {
      const newObj = {}
      for (let key in input) {
        const fn = input[key]
        newObj[key] = this.catch(fn)
      }
      return newObj
    }

    if (input instanceof Function) {
      return this.catch(input)
    }

    throw new Error('I need Function or Object with Function')
  }

  static test

  name = 'RequestError'
  isOperational = true

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
