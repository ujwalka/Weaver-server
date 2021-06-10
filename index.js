require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const port = process.env.PORT || 8080;

const corsConfig = {
  origin: [process.env.WC_ORIGIN, 'http://localhost:3000/'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.listen(port, (err) => {
  if (err) {
    console.log(`Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
