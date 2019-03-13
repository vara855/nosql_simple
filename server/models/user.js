const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utils');
const userSchema = Schema(
  {
    email: {
      type: String,
      index: { unique: true }
    },
    password: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (!this.password) {
    return Promise.reject('Empty password')
  } else {
    hashPassword(this.password)
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(err => Promise.reject(err));
  }
});

module.exports = model('User', userSchema);