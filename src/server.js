const coreUtils = require('./core')
global.ReqError = coreUtils.ReqError
global.catchAsync = coreUtils.catchAsync
const mongoose = require('mongoose')
const app = require('./app')

process.env.PORT ||= 1000
app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[32m%s\x1b[0m',
    `>>> App running on port "${process.env.PORT}"...`
  )
})

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '>>> MongoDB connected successfully...')
  })
  .catch(() => {
    console.error('\x1b[31m%s\x1b[0m', '!!! MongoDB connection failed...')
    /*
    console.error('\x1b[31m%s\x1b[0m', '!!! Server stopping...')
    process.exit()
    */
  })
