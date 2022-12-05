const colors = require('ansi-colors')
const app = require('./app')

const port = process.env.PORT ?? 8000

const server = app.listen(port, () => {
  console.log(
    colors.greenBright('>>>'),
    colors.greenBright(`App running on port "${port}"...`)
  )
})

module.exports = server
