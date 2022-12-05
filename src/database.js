const mongoose = require('mongoose')
const colors = require('ansi-colors')

const mongoUri = process.env.DB

if (!mongoUri) {
  console.error(
    colors.redBright('!!!'),
    colors.redBright('MongoDB env variable missing...')
  )
} else
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log(
        colors.greenBright('>>>'),
        colors.greenBright('MongoDB connected successfully...')
      )
    })
    .catch(() => {
      console.error(
        colors.redBright('!!!'),
        colors.redBright('MongoDB connection failed...')
      )
    })
