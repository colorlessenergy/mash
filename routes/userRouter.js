const express = require('express');
const Router = express.Router();

const usersController = require('../controllers/users/usersController');

Router.route('/')
  .post(usersController.createUser);

module.exports = Router;