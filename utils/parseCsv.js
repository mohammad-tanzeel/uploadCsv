const fs = require("fs");
const csvparser = require("csv-parser");
const Student = require("../model/Student");

exports.parsedSavedCsvData = (csvfile_path, res) => {
  let rows = [];
  return new Promise((resolve, reject) => {
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
      .on("end", (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(rows);
      })
      .on('error', function(err) {
        // do something with `err`
        reject(err)
      });      
  });
};
