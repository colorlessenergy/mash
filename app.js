const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mash:mash123@ds253857.mlab.com:53857/mash', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to DB'))
  .catch(err => console.log('there was an error ' + err));

const bodyParser = require('body-parser');

// dump json in body into req.body

app.use(bodyParser.json());


const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(process.env.PORT || 3001, function () {
  console.log('backend server is running')
});