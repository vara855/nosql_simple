'use strict';

const Hapi = require('hapi');
const routes = require('./server/routes');
const server = Hapi.server({
  port: 3131,
  host: 'localhost'
});

const init = async () => {
  await server.register({
    plugin: require('hapi-pino'),
    prettyPrint: true,
    logEvents: ['response', 'onPostStart', 'request-error']
  })

  routes.forEach(route => {
    server.route(route);
  })
  await require('./server/services/utils/database')(server);
  await server.start();
  console.log(`Server running at : ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

init();