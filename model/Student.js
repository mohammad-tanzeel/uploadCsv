const mongoose = require('mongoose');
// const { stringify } = require('nodemon/lib/utils');

const CsvStudent = new mongoose.Schema({
    // id:{type:String, default:null},
    st_name:{type:String, default:null},
    st_rol_no:{type:String, default: true},
    st_address:{type:String, default:null},
});

module.exports = mongoose.model("csvStuent", CsvStudent);