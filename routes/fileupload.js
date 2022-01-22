const uploadController = require('../controller/uploadController');

module.exports = function(app){
    app.post("/uploadCsvFile", uploadController.uploadCsvData);      
};

