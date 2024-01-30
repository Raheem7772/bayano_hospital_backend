const express = require("express");
const HospitalUsersData = require('../models/hospitalusers');
const jwtAuth = require('../middleware/jwtauth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router(); //used to handle the routes of node js project


router.get('/', (req, res) => {
    res.send('this authentication router')
})


//Register API

router.post('/signup', async (req, res) => {
    try {
        
        const { name, email, phoneNumber, gender, password } = req.body;
        const isExist = await HospitalUsersData.findOne({ email: email });

        if (!isExist) {
            const hassedPassword = await bcrypt.hash(password, 10);
            const user = new HospitalUsersData({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                gender: req.body.gender,
                password: hassedPassword
            });
            user.save();
            return res.status(200).json({ message: 'Registration Success' })
        } else {
            return res.status(400).json({ message: 'User Already Registred' });
        }
    } catch (e) {
        console.log(e.meaasge);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

//Login API
router.post('/login', async(req,res) => {
   
    try{
        const {email,password} = req.body;
        const isExist = await HospitalUsersData.findOne({email:email})

        if(isExist){
            const isPasswordMatched = await bcrypt.compare(password, isExist.password);
            if(isPasswordMatched){
                //genetate token
                let payload ={
                    id:isExist._id
                }
                const token = jwt.sign(payload,"HOSPITAL",{expiresIn:'4hr'});

               
                return res.status(200).json({token:token , message:'Login  Success'})
            }else{
                return res.status(400).json({message:'Password is not matched'})
            }
            
        }else{
            return res.status(400).json({message:'User Not Found'})
        }

    }catch(e){
        console.log(e.error);
        return res.status(500).json({message:'Internal Server Error'})
    }
    
}) 

//propfile API

router.get('/profile',jwtAuth, async(req,res)=>{
    const user=await HospitalUsersData.findOne({_id:req.id});
    res.send(user)
})


module.exports = router;