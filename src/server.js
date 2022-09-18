const mongoose = require('mongoose')
const app = require('./app')
const { proConsole } = require('./core')

app.listen(process.env.PORT, () => {
  proConsole.brightSuccess(
    '>>>',
    `App running on port "${process.env.PORT}"...`
  )
})

mongoose
  .connect(process.env.DB)
  .then(() => {
    proConsole.brightSuccess('>>>', 'MongoDB connected successfully...')
  })
  .catch(() => {
    proConsole.brightFail('!!!', 'MongoDB connection failed...')
  })
