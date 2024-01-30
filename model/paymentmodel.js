const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema =new mongoose.Schema({
    amount:{
        type:"string",
        required:true,
    },
    cardNumber:{
        type:"string",
        required:true,
    },
    expiryDate:{
        type:"string",
        required:true,
    },
    cvc:{
        type:"string",
        required:true,
    },
    
});

const paymentModel=mongoose.model('paymentData',paymentSchema);

module.exports ={paymentModel};