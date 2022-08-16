const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`>>> App running on port "${port}"...`)
})

mongoose
  .connect(process.env.DB)
  .then(() => console.log('>>> MongoDB connected successfully...'))
