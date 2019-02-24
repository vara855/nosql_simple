'use strict';

const Boom = require('boom');
const { User } = require('./../../models');
const userApi = {
  register: {
    auth: false,
    async handler(request, h) {
      try {
        const { email, password } = request.payload;

        const existsUser = await User.findOne({
          email
        });

        if (existsUser) {
          return Boom.badRequest('User already exists');
        }

        const user = new User({ email, password });

        await user.save();

        return 'Registration completed';
      }
      catch (err) {
        return Boom.badImplementation(err);
      }
    }
  }
}

module.exports = userApi;