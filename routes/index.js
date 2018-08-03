const auth = require('./auth');
const user = require('./user');

module.exports = (app) => {
  auth(app);
  user(app);
};
