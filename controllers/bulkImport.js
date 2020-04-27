// sequelizeBulkInsert.js
var fs = require('fs');
var async = require('async');
var csv = require('csv-parser');

module.exports = function(Model){
  this.importFile = function(filename, doneLoadingCallback) {
    var input = fs.createReadStream(filename);
    var attributes = [];
    for(var k in Model.rawAttributes) attributes.push(k);
    var parser = csv({
      columns: true,
      mapHeaders: ({ header, index }) => attributes[index]
    });
    parser.on('headers', (headers) => {
      if (headers.length != attributes.length)
        console.log("Not Good")
    });

    var inserter = async.cargo(function(tasks, inserterCallback) {
      Model.sync({force:true}).then(() => Model.bulkCreate(tasks)).then(function() {
            inserterCallback();
          }
        );
      },
      1000
    );

    parser.on('readable', function () {
      while(line = parser.read()) {
        inserter.push(line);
      }
    });

    parser.on('end', function (count) {
      inserter.drain = function() {
        doneLoadingCallback();
      }
    });

    input.pipe(parser);
  }
}
