const AppError = require('./app-error')

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
  if (err?.code === 11000) {
    return new AppError(handleDuplicateError(err), 404)
  }

  if (err.name === 'ObjectParameterError') {
    return new AppError(handleObjectParameterError(err), 404)
  }

  if (err.name === 'CastError') {
    return new AppError(handleCastError(err), 404)
  }

  if (err.name === 'ValidationError') {
    return new AppError(handleValidationError(err), 404)
  }

  console.error('!!!', err)
  return new AppError('Something went very wrong!', 500)
}
