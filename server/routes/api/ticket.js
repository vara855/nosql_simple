const Boom = require('Boom');
const { Ticket } = require('../../models');

const ticketsApi = {
  createTicket: {
    auth: false,
    async handler(request, h) {
      try {
        const { type, name, reporters, assigned, description, project, components, attachments } = request.payload;
        const ticket = new Ticket({ name, type, project });

        await ticket.save();
        // return `${type} - ${title}, was created`

        return {
          _id: ticket._id
        };
      } catch (err) {
        return Boom.badRequest(err);
      }
    }
  },
  remove: {
    auth: false,
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