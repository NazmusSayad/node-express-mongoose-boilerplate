require('manual-node-env')
require('dotenv').config()

const colors = require('ansi-colors')
console.log(colors.reset('---'), new Date().toString())

if (process.env.NODE_ENV === 'development') {
  console.clear()
}

require('./src/core')
require('./src/database')
require('./src/server')
