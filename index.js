;(() => {
  const paramsArr = process.argv
    .filter((param) => param.startsWith('--'))
    .map((param) => param.split('=', 2))
  const params = Object.fromEntries(paramsArr)

  process.env.NODE_ENV ??= params['--NODE_ENV']
})()

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
