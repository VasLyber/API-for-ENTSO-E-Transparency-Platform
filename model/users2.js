/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users2', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_quota: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'users2'
  });
};
