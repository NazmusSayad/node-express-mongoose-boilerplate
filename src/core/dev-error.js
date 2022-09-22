module.exports = class DevError extends Error {
  name = 'DevelopmentError'
  description =
    'This kind of error usually happens developer use something in wrong way'
  constructor(message, description) {
    super(message)
    if (description) this.description = description
    Error.captureStackTrace(this, this.constructor)
  }
}
