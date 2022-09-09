if (process.argv.at(-1) === '--dev') {
  console.clear()
  process.env.NODE_ENV = 'development'
  require('dotenv').config()
}

require('./src/server')
