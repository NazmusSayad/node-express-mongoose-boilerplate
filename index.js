const colors = require('colors/safe')
console.log(
  colors.reset(
    '---',
    new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
      hour12: true,
    })
  )
)

if (process.argv.at(-1) === '--NODE_ENV=development') {
  console.clear()
  require('dotenv').config()
  process.env.NODE_ENV = 'development'
} else process.env.NODE_ENV ||= 'production'

process.env.PORT ||= 8000

require('./src/core')
require('./src/server')
