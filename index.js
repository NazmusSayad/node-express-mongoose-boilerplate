if (process.argv.at(-1) === '--NODE_ENV=development') {
  process.stdout.write(
    '\x1b[0m' +
      (process.platform === 'win32' ? '\x1b[2J\x1b[0f' : '\x1b[2J\x1b[3J\x1b[H')
  )

  process.env.NODE_ENV = 'development'
  require('dotenv').config()
} else process.env.NODE_ENV ||= 'production'

require('./src/server')
