const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./config/config');

mongoose.connect(config.DB_URL, {
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
const authRouter = require('./routes/authRouter');

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).send(err.message);
});

app.listen(process.env.PORT || 3001, function () {
  console.log('backend server is running')
});