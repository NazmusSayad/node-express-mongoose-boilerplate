const mongoose = require('mongoose')
const app = require('./app')
const { proConsole } = require('./core')

const server = app.listen(process.env.PORT, () => {
  const [connectedPort] = server._connectionKey.match(/\d+$/)
  proConsole.brightSuccess(`>>> App running on port "${connectedPort}"...`)
})

mongoose
  .connect(process.env.DB)
  .then(() => {
    proConsole.brightSuccess('>>> MongoDB connected successfully...')
  })
  .catch(() => {
    proConsole.brightFail('!!! MongoDB connection failed...')
  })

module.exports = server
