// Server Route
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT = 3000;
const router = require('./router');

app.use(bodyParser.json());
app.use('/api',router);

app.listen(PORT,function(){
  console.log('Server is running at PORT:',PORT);
});