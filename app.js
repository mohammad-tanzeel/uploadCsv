const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");
var parseCsv = require('./utils/parseCsv');
const db = require('./config/db-client')
const app = express();
const PORT = 5001;

db.dbconnect();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

require('./routes/fileupload.js')(app);

app.listen(5001, () => {
  console.log("file have uploaded running on port : " + PORT);
});
