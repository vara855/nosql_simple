const Boom = require('boom');
const { User } = require('./../../models');
const utils = require('../../utils');
const jsonwebtoken = require('jsonwebtoken');

const userApi = {
  register: {
    auth: false,
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        let { email, password } = request.payload;
        password = Buffer.from(password, 'base64').toString();
        const existsUser = await User.findOne({
          email
        });

        if (existsUser) {
          return Boom.badRequest('User already exists');
        }

        const user = new User({ email, password });
        console.log('user :', user);
        await user.save();

        return 'Registration completed';
      }
      catch (err) {
        return Boom.badRequest(err);
      }
    }
  },
  login: {
    auth: false,
    cors: {
      origin: ['*'],
      additionalHeaders: ['access-control-allow-headers', 'access-control-allow-methods', 'access-control-allow-origin', 'x-requested-with']
    },
    async handler(request, h) {
      try {
        let { email, password } = request.payload;
        password = Buffer.from(password, 'base64').toString();
        const user = await User.findOne({ email });

        if (!user) {
          return Boom.badRequest('No account with this email!');
        }

        const passMatch = await utils.comparePassword(password, user.password);

        if (!passMatch) {
          return Boom.badRequest(`Password doesn't match`);
        }

        const token = jsonwebtoken.sign(user.email, '1234');

        const userWithoutPasssword = user.toObject();
        delete userWithoutPasssword.password;

        return {
          token,
          user: userWithoutPasssword
        }
      } catch (err) {
        return Boom.badRequest(err);
      }
    }
  }
}

module.exports = userApi;