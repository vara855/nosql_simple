const Boom = require('Boom');
const { Project } = require('../../models');

const projectApi = {
  createProject: {
    auth: false, //TOOD: change auth to ...
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-request-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        const { tickets, participants, description, components, owner, updatedBy, name } = request.payload;
        const project = new Project({ tickets, participants, description, components, components, name, updatedBy, owner });

        await project.save();
        return `Project with name: ${name}, Created!`;
      } catch (err) {
        return Boom.badRequest(err);
      }
    }
  },
  allProjects: {
    auth: false,
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        const projects = await Project.find().sort('components');
        return projects;
      } catch (error) {
        return Boom.badRequest(err);
      }
    }
  }
}

module.exports = projectApi;