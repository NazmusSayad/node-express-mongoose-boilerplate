process.env.NODE_ENV || (process.env.NODE_ENV = 'development')
require('dotenv').config()
console.clear()
require('./src/server')
