const mongoose = require('mongoose');
module.exports = (server) => {
  return mongoose.connect('mongodb://localhost:27017/nosql_simple', {
    useNewUrlParser: true
  }, err => {
    if (err)
      server.log('err :', err);
    });
}