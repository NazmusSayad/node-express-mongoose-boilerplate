require('manual-node-env')
console.log(require('colors/safe').reset('---', new Date()))

if (process.env.NODE_ENV === 'development') {
  console.clear()
}

require('./src/core')
require('./src/database')
require('./src/server')
