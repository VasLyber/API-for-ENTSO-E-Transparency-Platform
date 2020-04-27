/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dayaheadtotalloadforecast', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entitycreatedat: {
      type: DataTypes.DATE,
      allowNull: false
    },
    entitymodifiedat: {
      type: DataTypes.DATE,
      allowNull: false
    },
    actiontaskid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    areaname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalloadvalue: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    areatypecodeid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mapcodeid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    areacodeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    resolutioncodeid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rowhash: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'dayaheadtotalloadforecast'
  });
};
