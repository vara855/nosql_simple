'use strict';
const api = require('./api');
const routes = [
  {
    method: 'GET',
    path: '/api/status',
    handler: (request, h) => {
      return { success: true };
    }
  },
  {
    method: 'POST',
    path: '/api/register',
    options: api.user.register
  }
]

module.exports = routes;