const express = require('express');
const Router = express.Router();

const postControllers = require('../controllers/posts/postsController');
const authController = require('../controllers/auth/authController');

Router.route('/')
  .get(postControllers.getAllPosts)
  .post(postControllers.createPost);

Router.route('/:id')
  .get(postControllers.getPostById)
  .put(authController.validateToken, postControllers.updatePostById);


module.exports = Router;