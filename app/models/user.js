'use strict';

const Boom = require('boom');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePassword = function(commentPassword) {
  const isMatch = this.password === commentPassword;
  if (!isMatch) {
    throw new Boom('Password mismatch');
  }
  return this;
};

module.exports = Mongoose.model('User', userSchema);
