'use strict';

const User = require('../models/user');
const Poi = require('../models/poi');
const Comment = require('../models/comment');
const Joi = require('joi')

const Pois = {
  home: {
    handler: async function(request, h) {
      const comments = await Comment.find();
      return h.view('home', { title: 'Make a Poi', comments: comments });
    }
  },

  report: {
    handler: async function(request, h) {
      try {
        const pois = await Poi.find().populate('poiadder').populate('comment');
        return h.view('report', {
          title: 'Pois to Date',
          pois: pois
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },



    reports: {
      handler: async function(request, h) {
      const pois = await Poi.find().populate('poi');
      const user = await User.find().populate('user');
        return h.view('reports', {
          title: 'Places of interest',
          pois: pois,
          user: user
        });
      }
    },

  places: {
    handler: async function(request, h) {
      const pois = await Poi.find().populate('poi');
      return h.view('places', {
        title: 'Places of interest',
        pois: pois,
      });
    }
  },

  donate: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawComment = request.payload.comment.split(',');
        const comment = await Comment.findOne({
          lastName: rawComment[0],
          firstName: rawComment[1]
        });

        const newPoi = new Poi({
          name: data.name,
          description: data.description,
          catagory: data.catagory,
          latitude: data.latitude,
          longitude: data.longitude,
          poiadder: user._id,
          comment: comment._id
        });
        await newPoi.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  poi: {
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        catagory: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),

      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('signup', {
            title: 'Sign up error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;


        const newPoi = new Poi({
          name: data.name,
          description: data.description,
          catagory: data.catagory,
          latitude: data.latitude,
          longitude: data.longitude,
          poiadder: user._id
     //     comment: comment._id

        });
        await newPoi.save();
        return h.redirect('/places');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }


  },

  showViewPoi: {
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const poi = await Poi.findById(id);
        return h.view('viewPoi', { title: 'View Place of Interest', poi: poi });
      } catch (err) {
        return h.view('places', { errors: [{ message: err.message }] });
      }
    }
  },

  showViewPoiAdmin: {
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const poi = await POI.findById(id);
        return h.view('viewPoiAdmin', { title: 'View Place of Interest', poi: poi });
      } catch (err) {
        return h.view('places', { errors: [{ message: err.message }] });
      }
    }
  },

  showUpdatePoi: {
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const poi = await POI.findById(id);
        return h.view('updatePoi', { title: 'View Place of Interest', poi: poi });
      } catch (err) {
        return h.view('places', { errors: [{ message: err.message }] });
      }
    }
  },

  deletePoi: {
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const poi = await POI.findById(id);
        await poi.delete();
        const pois = await POI.find().populate('poi');
        const user = await User.find().populate('user');

        return h.view('/reports', {
          title: 'Places of interest',
          pois: pois,
          user: user
        });
      } catch (err) {
        return h.view('/reports',  { errors: [{ message: err.message }] });
      }
    }
  },
};

module.exports = Pois;
