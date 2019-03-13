const Boom = require('Boom');
const { Project } = require('../../models');

const projectApi = {
  createProject: {
    auth: false, //TOOD: change auth to ...
    async handler(request, h) {
      try {
        const { tickets, participants, description, components, name } = request.payload;
        const project = new Project({ tickets, participants, description, components, components, name, updatedBy:'vano1017', owner: 'vano1017' });

        await project.save();
        return `${name}, Created!`;
      } catch (err) {
        return Boom.badRequest(err);
      }
    }
  }
}

module.exports = projectApi;