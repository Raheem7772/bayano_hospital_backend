const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineCategoryEditSchema =new mongoose.Schema({
    medicineId:{
        type:"string",
        required:true,
    },
    name:{
        type:"string",
        required:true,
    },
    description:{
        type:"string",
        required:true,
    },
    
});

const medicineCategorySchema = new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    description:{
        type:"string",
        required:true,
    },
});

const medicineCategoryModel = mongoose.model(
    "medicineCategoryData",
    medicineCategoryEditSchema
  );
  const medicineModel = mongoose.model("medicineData", medicineCategorySchema);
  
  module.exports = { medicineCategoryModel, medicineModel };