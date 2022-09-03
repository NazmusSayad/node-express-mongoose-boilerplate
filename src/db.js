const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('>>> MongoDB connected successfully...')
  })
  .catch(() => {
    console.log('!!! MongoDB connection failed...')
    // process.exit()
  })
