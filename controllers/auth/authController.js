const User = require('../../models/Schemas/Users');
const JWT = require('jsonwebtoken');
const config = require('../../config/config');

exports.loginUser = function (req, res, next) {
  if (!req.body.email) {
    return res.status(400).send('Missing Email');
  }

  if (!req.body.password) {
    return res.status(400).send('Missing Password');
  }

  // find the user in the DB

  User.findOne({email: req.body.email })
    .then(function (user) {

      if (!user) {
        return res.status(400).send('unable to find user');
      }

      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) next(err);

        if (!isMatch) {
          return res.status(400).send('Incorrect Password');
        }

        // create JWT token and store it on the user in the DB
        let payload = {
          _id: user._id,
          username: user.username
        }
        
        let token = JWT.sign(payload, config.secret);

        user.token = token;

        user.save()
          .then(function () {
            return res.json({ token: token })
          })
          .catch(function (err) {
            return next (err);
          });

      });
    })
    .catch(function (err) {
      return next(err);
    });
}

exports.validateToken = function (req, res, next) {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('This endpoint requires a token');
  }

  try {
    var decoded = JWT.verify(token, config.secret)
  } catch (err) {
    return res.status(403).send('failed to authenticate token');
  }


  User.findById(decoded._id)
    .then(function (user) {
      if (!user) next(err);

      if (token !== user.token) {
        return res.status(403).send('Expired Token');
      }

      req.user = decoded;

      next();
    })
    .catch(function (err) {
      return next(err);
    })
}

exports.logoutUser = function (req, res, next) {
  User.findById(req.user._id)
    .then(function (user) {
      if (!user) next(err);

      req.user = '';
      user.token = '';

      user.save()
        .then(function () {
          return res.sendStatus(200);
        })
        .catch(err => next(err))

    })
    .catch(function (err) {
      return next(err);
    })
}