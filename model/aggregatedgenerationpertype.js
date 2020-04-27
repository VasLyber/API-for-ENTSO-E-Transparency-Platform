/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aggregatedgenerationpertype', {
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
    actualgenerationoutput: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    actualconsuption: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    areatypecodeid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productiontypeid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resolutioncodeid: {
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
    rowhash: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'aggregatedgenerationpertype'
  });
};
