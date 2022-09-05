exports.duplicateError = err => {
  return `The given \`${Object.keys(err?.keyValue)}\` already exists`
}

exports.validationError = err => {
  return Object.values(err?.errors)
    ?.map(error => error?.message)
    .join('.\n')
}

exports.castError = err => {
  return `Invalid input \`${err?.path}\``
}

exports.objParamError = err => {
  return `Invalid input \`${err.message.match(/(?<=got ).*$/gm)[0]}\``
}
