if (process.argv.at(-1) === '--NODE_ENV=development') {
  console.clear()
  console.log('\x1b[0m')
  process.env.NODE_ENV = 'development'
  require('dotenv').config()
} else process.env.NODE_ENV ||= 'production'

require('./src/server')
process.env.NODE_ENV === 'development' && console.log('\x1b[0m')
