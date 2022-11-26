require('manual-node-env')
require('dotenv').config()
console.log(require('colors/safe').reset('---', new Date()))

if (process.env.NODE_ENV === 'development') {
  console.clear()
}

require('./src/core')
require('./src/database')
require('./src/server')
