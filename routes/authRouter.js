const express = require('express');
const Router = express.Router();

const authController = require('../controllers/auth/authController');

Router.route('/')
  .post(authController.loginUser);

module.exports = Router;