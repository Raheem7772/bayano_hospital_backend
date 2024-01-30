const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSalesSchema =new mongoose.Schema({
    no:{
        type:"string",
        required:true,
    },
    medicines:{
        type:"string",
        required:true,
    },
    totalPrice:{
        type:"string",
        required:true,
    },
    patient:{
        type:"string",
        required:true,
    },
    
});

const medicineSalesModel=mongoose.model('madicineSalesData',medicineSalesSchema);

module.exports ={medicineSalesModel};