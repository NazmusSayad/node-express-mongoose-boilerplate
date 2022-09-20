global.ReqErr = class ReqError extends Error {
  name = 'RequestError'
  isOperational = true
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

global.catchReq = fn => (req, res, next) => {
  try {
    const returnValue = fn(req, res, next)
    if (returnValue instanceof Promise) returnValue.catch(next)
  } catch (err) {
    next(err)
  }
}
