console.clear()

process.env.PORT ||= 8080
require('dotenv').config()

require('./db')
require('./server')
