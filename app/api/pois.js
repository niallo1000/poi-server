'use strict';

const Boom = require('boom');
const Poi = require('../models/poi');
const Comment = require('../models/comment');
const utils = require('./utils.js');

const Pois = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const pois = await Poi.find();
      return pois;
    }
  },
  findByComment: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const pois = await Poi.find({ comment: request.params.id });
      return pois;
    }
  },

  makePoi: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let poi = new Poi(request.payload);
      const comment = await Comment.findOne({ _id: request.params.id });
      if (!comment) {
        return Boom.notFound('No Comment with this id');
      }
      poi.comment = comment._id;
      poi.donor = userId;
      poi = await poi.save();
      return poi;
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Poi.deleteMany({});
      return { success: true };
    }
  },

  deletePois: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Poi.deleteMany({comment: request.params.id });
      return { success: true };
    }
  }
};

module.exports = Pois;
