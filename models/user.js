const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bossId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    about: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    pass: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.belongsTo(models.User, {
      foreignKey: 'bossId',
      as: 'boss',
    });
  };
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.pass;
    return values;
  };
  return User;
};
