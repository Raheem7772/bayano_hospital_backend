const mongoose = require("mongoose");
const { Schema } = mongoose;

const manageMedicineSchema =new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    medicineCategory:{
        type:"string",
        required:true,
    },
    description:{
        type:"string",
        required:true,
    },
    price:{
        type:"string",
        required:true,
    },
    totalQuantity:{
        type:"string",
        required:true,
    },
    manufacturingCompany:{
        type:"string",
        required:true,
    },

});

const manageMedicineModel=mongoose.model('managemedicineData',manageMedicineSchema);

module.exports ={manageMedicineModel};