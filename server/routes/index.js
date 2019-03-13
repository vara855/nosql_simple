const api = require('./api');
const Path = require('path');
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
  },
  {
    method: 'POST',
    path: '/api/login',
    options: api.user.login
  },
  {
    method: 'POST',
    path: '/api/projects/create',
    options: api.project.createProject
  },
  {
    method: 'POST',
    path: '/api/tickets/create',
    options: api.ticket.createTicket
  },
  {
    method: 'GET',
    path: '/api/tickets/{id}',
    options: api.ticket.remove
  }

];

module.exports = routes;