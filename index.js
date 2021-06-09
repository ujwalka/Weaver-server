const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.WS_PORT || 8080;

const corsConfig = {
  origin: process.env.WC_ORIGIN || '',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.log(`Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
