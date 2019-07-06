// Server Route
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT||3000;
const router = require('./router');
const utils = require('../utils/utils');

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, function () {
  // clear console
  for (i = 0; i < 88; i++) {
    console.log();
  }

  utils.info(`Server is running at PORT: ${PORT}`);
});