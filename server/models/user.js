'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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

userSchema.pre('save', next => {
  // const user = this;

  if (!this.password) {
    next();
  } else {
    // TODO: hash password
    next();
  }
})

module.exports = mongoose.model('User', userSchema);