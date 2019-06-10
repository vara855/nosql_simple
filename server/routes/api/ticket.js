const Boom = require('Boom');
const { Ticket } = require('../../models');

const ticketsApi = {
  createTicket: {
    auth: false,
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        const { type, name, reporters, assigned, description, project, components, attachments } = request.payload;
        const ticket = new Ticket({ name, type, project, reporters, assigned, description, components, attachments });

        await ticket.save();
        // return `${type} - ${title}, was created`

        return {
          _id: ticket._id
        };
      } catch (err) {
        console.log('err :', err);
        return Boom.badRequest(err);
      }
    }
  },
  remove: {
    auth: false,
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        const { _id } = request.params;
        const result = await Ticket.deleteOne({ _id })
        return Promise.resolve({result});
      } catch (error) {
        return Boom.badRequest(err);
      }
    }
  }
}

module.exports = ticketsApi;