const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_URL)
.then(() => console.log(`Database conncted`))
.catch((error) => {console.log(`Error while connecting to database : ${error.message}`)})

module.exports = db