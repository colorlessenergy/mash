const express = require('express');
const app = express();

app.listen(process.env.PORT || 3001, function () {
  console.log('backend server is running')
});