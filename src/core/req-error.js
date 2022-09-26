const DevError = require('./dev-error')

module.exports = class ReqError extends Error {
  static #catchArgumentError = new DevError('Catch needs at least 1 argument')
  static #wrapperInputError = new DevError('Catch can only use functions')

  static catch() {
    if (arguments.length === 0) throw this.#catchArgumentError
    return arguments.length === 1
      ? this.#catch(arguments[0])
      : [...arguments].map(input => this.#catch(input))
  }

  static #catch(input) {
    if (input instanceof Array) return input.map(fn => this.#wrapper(fn))
    if (input instanceof Object) {
      const newObj = {}
      for (let key in input) {
        const fn = input[key]
        newObj[key] = this.#wrapper(fn)
      }
      return newObj
    }
    return this.#wrapper(fn)
  }

  static #wrapper = fn => {
    if (!(fn instanceof Function)) throw this.#wrapperInputError
    return (req, res, next) => {
      try {
        const returnValue = fn(req, res, next)
        if (returnValue instanceof Promise) returnValue.catch(next)
      } catch (err) {
        next(err)
      }
    }
  }

  name = 'RequestError'
  isOperational = true

  constructor(messageOrArray, statusCodeOrUndefined) {
    let message = messageOrArray
    let statusCode = statusCodeOrUndefined

    if (messageOrArray instanceof Array) {
      message = messageOrArray[0]
      statusCode = statusCodeOrUndefined ?? messageOrArray[1]
    } else if (messageOrArray instanceof Object) {
      message = messageOrArray.message
      statusCode = statusCodeOrUndefined ?? messageOrArray.statusCode
    }

    if (typeof message !== 'string') {
      throw new DevError('RequestError constructor gets invalid message')
    }
    if (statusCode != null && typeof statusCode !== 'number') {
      throw new DevError('RequestError constructor gets invalid statusCode')
    }

    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
