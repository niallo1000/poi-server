'use strict';

const Accounts = require('./app/controllers/accounts');
const Pois = require('./app/controllers/pois');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/places', config: Pois.places },
  { method: 'GET', path: '/home', config: Pois.home },
  { method: 'GET', path: '/report', config: Pois.report },
  { method: 'POST', path: '/poiadd', config: Pois.poi },
  { method: 'GET', path: '/reports', config: Pois.reports },
  { method: 'GET', path: '/viewPoi/{id}', config: Pois.showViewPoi },




  { method: 'GET', path: '/adminLogin', config: Accounts.showAdminLogin },
  { method: 'POST', path: '/adminLogin', config: Accounts.adminLogin },
  { method: 'GET', path: '/viewUser/{id}', config: Accounts.showUser },
  { method: 'GET', path: '/deleteUser/{id}', config: Accounts.deleteuser },



  { method: 'GET', path: '/viewPoiAdmin/{id}', config: Pois.showViewPoiAdmin },
  { method: 'GET', path: '/updatePoi/{id}', config: Pois.showUpdatePoi },
  { method: 'GET', path: '/deletePoi/{id}', config: Pois.deletePoi },

 // { method: 'GET', path: '/adminscreen', config: Pois.reports },
//  { method: 'GET', path: '/adminpoisreport', config: Pois.reports },

  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }
];
