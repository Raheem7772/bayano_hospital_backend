const express = require("express");
const mongoose = require("mongoose");
const jwtAuth =require("../middleware/jwtauth")
const cors = require("cors");
const router = express.Router(); //used to handle the routes of node js project
const {medicineCategoryModel, medicineModel} =require("../model/medicinecategory")
const {manageMedicineModel}=require("../model/managemedicine");
const { medicineSalesModel } = require("../model/medicinesales");
const { paymentModel } = require("../model/paymentmodel");
router.use(cors());
const bcrypt = require('bcrypt');

router.get('/',(req,res)=>{
    res.send('this API router')
})

//api for add mecidine category
router.post('/addmedicine',jwtAuth,async (req,res)=>{
    try{
        const {name, description} = req.body;
        const medicine =new medicineModel({
            name,
            description,
        });
        console.log(medicine)
        await medicine.save();

        return res.status(200).json({message:"Medicine added Sucessfully"});
        
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
      }
      
})

//getting api for medicine category
router.get('/get-medicines',jwtAuth,async(req,res)=>{
    try{
    
        const medicineRes = await medicineModel.find();

        return res.status(200).json({medicineList:medicineRes});

    }catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
      }
})
//new get
router.get('/get-data',async(req,res)=>{
    try{
    
        const medicineRes = await medicineModel.find();

        return res.status(200).json({medicineList:medicineRes});

    }catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
      }
})
//update medicine data
router.put('/update-medicine/:id',async(req,res)=>{
    try{
        const { name, description } = req.body;
        const { id } = req.params;
  
        const medicineRes = await medicineModel.findOne({ _id: id });
  
        if (medicineRes !== null) {
          const updateMedicine = await medicineModel.updateOne(
            { _id: id,
               name: name,
                description: description,
              },
              
          );
          console.log(updateMedicine)
          return res.status(200).json({ message: "Updated Successfully" });
        } else {
          return res.status(400).json({ message: "Medicine Not Found" });
        }
      } catch (e) {
        console.log(e.message);
        return response.status(500).json({ message: e.message });
      }
    }
  );

  //delete medicine
  router.delete('/delete-medicine/:id',jwtAuth,async(req,res)=>{
    try{
       
        const { id } = req.params;
  
        const medicineRes = await medicineModel.findOne({ _id: id });
  
        if (medicineRes !== null) {
          const updateMedicine = await medicineModel.deleteOne(
            { _id: id },
            
          );
          return res.status(200).json({ message: "Deleted Successfully" });
        } else {
          return res.status(400).json({ message: "Medicine Not Found" });
        }
      } catch (e) {
        console.log(e.message);
        return response.status(500).json({ message: e.message });
      }
    }
  );

  //api for add manage medicine
router.post('/manageadd-medicine',jwtAuth,async (req,res)=>{
  try{
      const {name, description,medicineCategory,price,totalQuantity,manufacturingCompany} = req.body;
      const manageMedicine =new manageMedicineModel({
          name,
          medicineCategory,
          description,
          price,
          totalQuantity,
          manufacturingCompany,

      });
      console.log(manageMedicine)
      await manageMedicine.save();

      return res.status(200).json({message:"Medicine added Sucessfully"});
      
  }catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
    
})

//api for get manage medicine
router.get('/get-managedata',async(req,res)=>{
  try{
  
      const medicineRes = await manageMedicineModel.find();

      return res.status(200).json({manageMedicineList:medicineRes});

  }catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
})

//api for add medicine sales
router.post('/medicine-sales',jwtAuth,async (req,res)=>{
  try{
      const {no, medicines,totalPrice,patient} = req.body;
      const medicineSales =new medicineSalesModel({
          no,
          medicines,
          totalPrice,
          patient,
        });
      console.log(medicineSales)
      await medicineSales.save();

      return res.status(200).json({message:"MedicineSales added Sucessfully"});
      
  }catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
    
})

//api for get madicine sales
router.get('/get-medicinesalesdata',async(req,res)=>{
  try{
  
      const medicineRes = await medicineSalesModel.find();

      return res.status(200).json({medicineSalesList:medicineRes});

  }catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
})

//api for update medicine sales data
router.put('/medicinesalesdtata-update/:id',jwtAuth,async(req,res)=>{
      try{
        const { no,medicines,totalPrice,patient } = req.body;
        const { id } = req.params;
        const updatedMedicineSaleRes=await medicineSalesModel.findOne({_id:id});
        if (updatedMedicineSaleRes !== null) {
          const updatedMedicineSale = await medicineSalesModel.updateOne(
            { _id: id},
            {no: no,
                medicines: medicines,
                totalPrice:totalPrice,
                patient:patient,
              },
              
          );
          console.log(updatedMedicineSale)
          return res.status(200).json({ message: "Updated Successfully" });
        } else {
          return res.status(400).json({ message: "Medicine Not Found" });
        }
      }catch(e){
        console.log(e.message);
        return response.status(500).json({ message: e.message });
      }
})
//getting all medicine sales data
router.get("/medicinesalesdtata",async (req, res) => {
  try {
    const { limit, search = "" } = req.query;
    const parsingLimit = parseInt(limit);

    const queryObject = {};

    if (search) {
      queryObject.medicines = { $regex: search, $options: "i" };
    }

    const medicinesSalesRes = await medicineSalesModel
      .find(queryObject)
      .limit(parsingLimit);

    return res.status(200).json({ Medicines: medicinesSalesRes });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//payment api

router.post('/process-payment',jwtAuth,(req, res) => {
  try{
    const {amount,cardNumber,expiryDate,cvc,} = req.body;
    //const hassedCard = bcrypt.hash(cardNumber, 6);
    const paymentData =new paymentModel({
      amount:amount,
      cardNumber:cardNumber,
      expiryDate:expiryDate,
      cvc:cvc,
      });
    console.log(paymentData)
     paymentData.save();

    return res.status(200).json({message:"Payment processed successfully"});
    
}catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
});


module.exports = router;
 