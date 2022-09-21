exports.getFeildsFromObject = (obj, fields) => {
  if (typeof fields === 'string') {
    fields = fields.split(' ').filter(feild => feild.trim())
  }

  const newObj = {}
  fields.forEach(feild => {
    newObj[feild] = obj[feild]
  })
  return newObj
}
