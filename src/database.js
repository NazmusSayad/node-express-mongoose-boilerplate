const mongoose = require('mongoose')
const colors = require('colors/safe')

const mongoUri = process.env.DB

if (!mongoUri) {
  console.error(colors.brightRed('!!!', 'MongoDB env variable missing...'))
} else
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log(
        colors.brightGreen('>>>', 'MongoDB connected successfully...')
      )
    })
    .catch(() => {
      console.error(colors.brightRed('!!!', 'MongoDB connection failed...'))
    })
