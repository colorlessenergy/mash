const Posts = require('../../models/Schemas/Posts');

/**
 * create a post in the DB
 * 
 * @param {Object} req - object holds information about request
 * @param {String} req.body.content - content of the post
 * @param {String} req.body.title - title of the post
 */

exports.createPost = function (req, res, next) {
  const post = new Posts(req.body);

  post.save()
    .then(function (post) {
      return res.json(post);
    })
    .catch(function (err) {
      return res.status(401).send(err);
    });
}

/**
 * get all post from the DB
 */

exports.getAllPosts = function (req, res, next) {
  Posts.find({})
    .then(function (posts) {
      return res.json(posts);
    })
    .catch(function () {
      return res.status(500).send('internal error')
    });
}

/**
 * get a single post by id in the db
 * 
 * get the id of a post from the URL
 * 
 */

 exports.getPostById = function (req, res, next) {
   Posts.findById(req.params.id)
    .then(function (post) {
      return res.json(post);
    })
    .catch(function () {
      return res.status(401).send('a post with that id does not exist');
    });
 }

 /**
  * 
  * edit a post in the DB
  * 
  * @param {Object} req.body.content - the updated content 
  */

  exports.updatePostById = function (req, res, next) {
    Posts.findByIdAndUpdate(req.params.id, {content: req.body.content})
      .then(function (post) {
        return res.sendStatus(200);
      })
      .catch(function (err) {
        return next(err);
      });
  }