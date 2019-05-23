'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  catagory: String,
  latitude: Number,
  longitude: Number,
  poiadder: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment:  {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

poiSchema.statics.findById = function(id) {
  return this.findOne({ id : id});
};

poiSchema.statics.findByName = function(name) {
  return this.findOne({ name : name});
};

module.exports = Mongoose.model('Poi', poiSchema);
