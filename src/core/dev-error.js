module.exports = class DevError extends Error {
  name = 'DevelopmentError'
  description =
    'This kind of error usually occurs when developer uses something in a wrong way'
  constructor(message, description) {
    super(message)
    if (description) this.description = description
    Error.captureStackTrace(this, this.constructor)
  }
}
