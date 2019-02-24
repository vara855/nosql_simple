const mongoose = require('mongoose');
module.exports = (server) => {
  return mongoose.connect('mongodb://localhost:27017/nosql_simple', {
    useNewUrlParser: true
  }, err => {
    server.log(['info'], 'My log')
    if (err)
      server.log('err :', err);
    });
}