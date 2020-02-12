const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

userSchema.pre('save', function (next) {
  if (!this.email) {
    return next(new Error('Missing Email'));
  }

  if (!this.username) {
    return next(new Error('Missing Username'));
  }

  if (!this.password) {
    return next (new Error('Missing Password'));
  }

  // if the password wasn't change return so it isn't
  // hashed again
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });


});

const User = mongoose.model('User', userSchema);

module.exports = User;