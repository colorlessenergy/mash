const Users = require('../../models/Schemas/Users');

/**
 * Creates a new user with values that are taken 
 * from the front end
 * 
 * to make a new user it requires a email, username and password
 * 
 * 
 */

exports.createUser = function (req, res, next) {
  const user = new Users(req.body);

  user.save()
    .then(function (newUser) {
      return res.json(newUser).status(200);
    })
    .catch(function (err) {
      return res.status(401).send(err);
    });
} 