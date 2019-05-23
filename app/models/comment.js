'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const commentSchema = Schema({
  firstName: String,
  lastName: String,
  office: String,
});

module.exports = Mongoose.model('Comment', commentSchema);