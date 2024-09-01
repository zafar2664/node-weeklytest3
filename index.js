
const express = require("express");
const app = express();

const {validateRegistration , errorHandler} = require("./Middleware/registration")

app.use(express.json());

app.post("/register" , validateRegistration , (req,res)=>{
    res.status(201).json({ message: 'User registered successfully' });
} )
app.use(errorHandler)



app.listen(8000,()=>{
    console.log("server running on port" , 8000)
})