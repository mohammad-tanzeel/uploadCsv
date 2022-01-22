const fs = require("fs");
const Student = require("../model/Student");
const parseCsv = require("../utils/parseCsv");
path = require("path");

exports.uploadCsvData = async (req, res) => {
  console.log(req.files.csvfile);
  csvfile_name = req.files.csvfile;
  var file_name = new Date().getTime() + "_" + csvfile_name.name;

  const upload_folder = path.join(__dirname, "../files");
  if (!fs.existsSync(upload_folder)) {
    fs.mkdirSync(upload_folder);
  }
  const csvfile_path = upload_folder + "/" + file_name;
  console.log(csvfile_path);
  //   process.exit(1);

  //   __dirname + "../files/" + file_name;
  let csvdataObject = "";
  var regex = new RegExp("(.*?).(csv)$");
  if (!regex.test(csvfile_name.name)) {
    res.send({ message: "Only csv file can be uploaded" });
  } else {
    await csvfile_name.mv(csvfile_path, function (err) {
      if (!err) {
        const csrep = parseCsv.parsedSavedCsvData(csvfile_path);
        console.log(csrep);
        console.log("CSV uploaded");
      } else {
        console.log(err);
      }
    });
    res.send({ message: "file uploaded" });
  }
};
