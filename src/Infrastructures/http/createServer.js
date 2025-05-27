const Hapi = require('@hapi/hapi');
const users = require('../../Interfaces/http/api/users');
const authentication = require('../../Interfaces/http/api/authentications');
const config = require('../../Common/config');

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentication,
      options: { container },
    },
  ]);

  return server;
};

module.exports = createServer;
