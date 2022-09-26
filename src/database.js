const mongoose = require('mongoose')
const colors = require('colors/safe')

process.env.DB
  ? mongoose
      .connect(process.env.DB)
      .then(() => {
        console.log(
          colors.brightGreen('>>>', 'MongoDB connected successfully...')
        )
      })
      .catch(() => {
        console.error(colors.brightRed('!!!', 'MongoDB connection failed...'))
      })
  : console.error(colors.brightRed('!!!', 'MongoDB env variable missing...'))
