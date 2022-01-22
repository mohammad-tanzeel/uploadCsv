const fs = require("fs");
const csvparser = require("csv-parser");
const Student = require('../model/Student');

exports.parsedSavedCsvData =  (csvfile_path, res) => {
    // const customdata = {name:"tanzeel", csvfile_path:csvfile_path};
    let rows = [];

    fs.createReadStream(csvfile_path)
          .pipe(csvparser())
          .on("data", function (data) {
            try {
              rows.push(data);
            } catch (err) {
              //error handler
              console.log(err);
            }
          })
          .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`);
            Student.insertMany(rows).then(function(data){
              // console.log(data)  // Success
              console.log("Data inserted")  // Success
              return data;
          }).catch(function(error){
              // console.log(error)      // Failure
              return error;
          });
        });  
  };
  