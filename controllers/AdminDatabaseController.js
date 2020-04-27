const AdminDatabaseController = {}
const db = require('../model/connect.js')
var multer              = require("multer");
var upload              = multer({ destination: './'})
var Bulk          = require('./bulkImport.js')

AdminDatabaseController.importData = (req, res) => {

      switch (req.params.table){

          case "DayAheadTotalLoadForecast":
           try {

            var bulk3 = new Bulk(db.DayAheadTotalLoadForecast);
            bulk3.importFile(__dirname+"/filesUpload/DayAheadTotalLoadForecast-10days.csv", function(){
            });

          } catch (e) {
               console.log(e.message)
            }
            break;

          case "AggregatedGenerationPerType":
             try {
              var bulk2 = new Bulk(db.AggregatedGenerationPerType);
              bulk2.importFile(__dirname+"/filesUpload/AggregatedGenerationPerType-10days.csv", function(){
              });
            } catch (e) {
                 console.log(e.message)
              }
              break;

            case "ActualTotalLoad":
               try {
                var bulk = new Bulk(db.ActualTotalLoad);
                bulk.importFile(__dirname+"/filesUpload/ActualTotalLoad-10days.csv", function(){
                });

              } catch (e) {
                   console.log(e.message)
                }
                break;
    }
  };

module.exports = AdminDatabaseController;
