require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.WS_MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Database connected`);
    }
  }
);

module.exports = mongoose;
