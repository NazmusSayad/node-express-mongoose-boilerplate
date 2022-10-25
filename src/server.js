const colors = require('colors/safe')
const app = require('./app')

const port = process.env.PORT ?? 8000

const server = app.listen(port, () => {
  console.log(colors.brightGreen('>>>', `App running on port "${port}"...`))
})

module.exports = server
