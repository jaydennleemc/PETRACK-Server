// Server Route
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT = 3000;
const router = require('./router');

app.use(bodyParser.json());
app.use('/api',router);

app.listen(PORT,function(){
  // clear console
  for(i =0; i<100; i++){
    console.log();
  }

  console.log('Server is running at PORT:',PORT);
});