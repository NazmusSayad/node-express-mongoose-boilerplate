const handleDuplicateError = err => {
  return `The given "${Object.keys(err?.keyValue)}" already exists`
}

const handleValidationError = err => {
  return Object.values(err?.errors)
    ?.map(error => error?.message)
    .join('.\n')
}

const handleCastError = err => {
  return `Invalid input "${err?.path}"`
}

const handleObjectParameterError = err => {
  return `Invalid input "${err.message.match(/(?<=got ).*$/gm)[0]}"`
}

module.exports = err => {
  if (err.isOperational) {
    return [err.message, err.statusCode]
  }

  if (err.code === 11000) {
    return [handleDuplicateError(err), 404]
  }

  if (err.name === 'ObjectParameterError') {
    return [handleObjectParameterError(err), 404]
  }

  if (err.name === 'CastError') {
    return [handleCastError(err), 404]
  }

  if (err.name === 'ValidationError') {
    return [handleValidationError(err), 404]
  }

  console.error('!!!', err)
  return ['Something went very wrong!', 500]
}
