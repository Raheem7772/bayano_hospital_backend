const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


const port = 7777 || process.env.PORT;
//const PORT =;

app.use(express.json());
app.use(cors());

//mongo DB initialization
mongoose.connect("mongodb+srv://raheems1121:raheems1121@cluster0.v582dnw.mongodb.net/hospitalusers?retryWrites=true&w=majority&appName=AtlasApp")
.then(()=>console.log('DB Connected'))
.catch((error)=>console.log(error))


app.use("/auth",require('./routes/authRoutes'))//auth routes
app.use("/api",require('./routes/apiroute'))//api routes

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})

