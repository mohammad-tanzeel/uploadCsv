const fs = require("fs");
const Student = require("../model/Student");
const parseCsv = require("../utils/parseCsv");
path = require("path");

exports.uploadCsvData = async (req, res) => {
  try {
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
    let csvdataObject = "";
    var regex = new RegExp("(.*?).(csv)$");
    if (!regex.test(csvfile_name.name)) {
      res.send({ message: "Only csv file can be uploaded" });
    } else {
      await csvfile_name.mv(csvfile_path);

      const csrep = await parseCsv.parsedSavedCsvData(csvfile_path);
      console.log("data from file");
      console.log(csrep);
      await Student.insertMany(csrep);
        // .then(function (data) {
        //   // console.log(data)  // Success
        // })
        // .catch(function (error) {
        //   // console.log(error)      // Failure
        //   return error;
        // });
        console.log("Data inserted"); // Success
        res.send({ message: "file uploaded" });
    }
  } catch (err) {
      res.status(501).send({'error':err.message});
  }
};
