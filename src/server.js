const coreUtils = require('./core')
global.ReqError = coreUtils.ReqError
global.catchAsync = coreUtils.catchAsync
process.env.PORT ||= 1000

const mongoose = require('mongoose')
const app = require('./app')

app.listen(process.env.PORT, () => {
  coreUtils.proConsole.brightSuccess(
    `>>> App running on port "${process.env.PORT}"...`
  )
})

mongoose
  .connect(process.env.DB)
  .then(() => {
    coreUtils.proConsole.brightSuccess('>>> MongoDB connected successfully...')
  })
  .catch(() => {
    coreUtils.proConsole.brightFail('!!! MongoDB connection failed...')
  })
