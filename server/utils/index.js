const bcrypt = require('bcrypt');

module.exports = {
  hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return reject(err);
          }

          return resolve(hash);
        })
      })
    })
  },

  comparePassword(rawPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(rawPassword, hashedPassword, (error, response) => {
        if (error) {
          return reject(error);
        }

        return resolve(response);
      })
    })
  }
}