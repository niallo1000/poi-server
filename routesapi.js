const Comments = require('./app/api/comments');
const Users= require('./app/api/users');
const Pois = require('./app/api/pois');

module.exports = [
  { method: 'GET', path: '/api/comments', config: Comments.find },
  { method: 'GET', path: '/api/comments/{id}', config: Comments.findOne },
  { method: 'POST', path: '/api/comments', config: Comments.create },
  { method: 'DELETE', path: '/api/comments/{id}', config: Comments.deleteOne },
  { method: 'DELETE', path: '/api/comments', config: Comments.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'GET', path: '/api/pois', config: Pois.findAll },
  { method: 'GET', path: '/api/comments/{id}/pois', config: Pois.findByComment },
  { method: 'POST', path: '/api/comments/{id}/pois', config: Pois.makePoi },
  { method: 'DELETE', path: '/api/pois', config: Pois.deleteAll },
  { method: 'DELETE', path: '/api/comments/{id}/pois', config: Pois.deletePois },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },
];
