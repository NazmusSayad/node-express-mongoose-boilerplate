const colors = require('colors/safe')
const errorHandler = require('./error-handler')

const getFail = (message, statusCode) => {
  return {
    status: statusCode < 500 ? 'fail' : 'error',
    message,
  }
}

const getSuccess = data => {
  return {
    status: 'success',
    data,
  }
}

exports.getFail = getFail
exports.getSuccess = getSuccess

const isResponseInvalid = res => {
  if (res.headersSent) {
    return console.warn(colors.red('!!!', 'Headers already sent')), true
  }
}

const getErrorResponseProd = data => data
const getErrorResponseDev = (data, err) => ({
  ...data,
  error: err,
  stack: err.stack,
})

const getErrorResponse =
  process.env.NODE_ENV === 'development'
    ? getErrorResponseDev
    : getErrorResponseProd

exports.errorHandler = (err, req, res, next) => {
  if (isResponseInvalid(res)) return

  const [message, code] = errorHandler(err, res)
  const jSendData = getFail(message, code)
  res.status(code).json(getErrorResponse(jSendData, err))
  return jSendData
}

exports.notFound = (req, res) => {
  const code = 404
  res.status(code).json(getFail("Oops, looks like you're lost in space!", code))
}

exports.ping = (req, res) => {
  res.end()
}

exports.success = function (data, code = 200) {
  if (isResponseInvalid(this)) return

  const jSendData = getSuccess(data)
  this.status(code).json(code === 204 ? null : jSendData)
  return jSendData
}

exports.getBody = function (fields) {
  if (typeof fields === 'string') {
    fields = fields.split(' ').filter(feild => feild.trim())
  }

  const newObj = {}
  fields.forEach(feild => {
    newObj[feild] = this.body[feild]
  })
  return newObj
}
