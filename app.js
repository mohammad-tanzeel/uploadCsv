const express = require("express");
const fileUpload = require("express-fileupload");
const db = require('./config/db-client')
const app = express();
const PORT = 5001;

db.dbconnect();

const allowedMethods = ['GET', 'HEAD'];
console.log(req.method);
app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) 
      {
        return res.status(405).send({'message':'Method Not Allowed'});
      }
    return next()
})

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
