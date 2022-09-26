const app = require('./app')
const colors = require('colors/safe')

const server = app.listen(process.env.PORT, () => {
  const [connectedPort] = server._connectionKey.match(/\d+$/)
  console.log(
    colors.brightGreen('>>>', `App running on port "${connectedPort}"...`)
  )
})

module.exports = server
