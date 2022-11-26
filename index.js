require('manual-node-env')
console.log(
  require('colors/safe').reset(
    '---',
    new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
      hour12: true,
    })
  )
)

if (process.env.NODE_ENV === 'development') {
  console.clear()
}

require('./src/core')
require('./src/database')
require('./src/server')
