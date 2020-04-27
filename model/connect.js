const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres2', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
define: {
    timestamps: false
  }

});

const User= sequelize.import(__dirname+"/users2.js");
const ActualTotalLoad= sequelize.import(__dirname+"/actualtotalload.js");
const AggregatedGenerationPerType= sequelize.import(__dirname+"/aggregatedgenerationpertype.js");
const DayAheadTotalLoadForecast= sequelize.import(__dirname+"/dayaheadtotalloadforecast.js");

var db = {
    Sequelize: Sequelize,
    sequelizeConnection: sequelize,
    User: User,
    ActualTotalLoad: ActualTotalLoad,
    DayAheadTotalLoadForecast: DayAheadTotalLoadForecast,
    AggregatedGenerationPerType: AggregatedGenerationPerType
};
module.exports = db;
