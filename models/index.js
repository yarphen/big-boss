const { postgres: { db, username, password, host, port } } = require('config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(db, username, password, { dialect: 'postgres', port, host });

const user = require('./user')(sequelize);

sequelize.sync().then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('An error occured', err);
});

module.exports = {
  models: {
    user,
  },
  sequelize,
  Sequelize,
};
