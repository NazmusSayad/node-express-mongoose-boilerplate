console.clear()

process.env.PORT ||= 8080
require('dotenv').config()

require('./src/db')
require('./src/server')
