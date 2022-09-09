if (process.argv.at(-1) === '--NODE_ENV=development') {
  console.clear()
  process.env.NODE_ENV = 'development'
  require('dotenv').config()
} else process.env.NODE_ENV ||= 'production'

require('./src/server')
