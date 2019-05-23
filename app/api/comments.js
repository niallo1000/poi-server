'use strict';

const Boom = require('boom');
const Comment = require('../models/comment');

const Comments = {

  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const comments = await Comment.find();
      return comments;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const comment = await Comment.findOne({ _id: request.params.id });
        if (!comment) {
          return Boom.notFound('No Comment with this id');
        }
        return comment;
      } catch (err) {
        return Boom.notFound('No Comment with this id');
      }
    }
  },

  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const newComment = new Comment(request.payload);
      const comment = await newComment.save();
      if (comment) {
        return h.response(comment).code(201);
      }
      return Boom.badImplementation('error creating comment');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Comment.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await Comment.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Comments;
