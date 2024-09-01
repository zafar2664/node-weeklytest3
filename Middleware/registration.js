
const fs = require("fs");
const path  = require("path")

function validateRegistration(req , res , next){
  const {firstName , lastName , password , email, phoneNumber} = req.body;

  // checking the first alphabet of first and last name is uppercase or not
  if(firstName[0] !== firstName[0].toUpperCase() || lastName[0] !== lastName[0].toUpperCase()){
     return next(new Error('First letter of first name and last name must be capitalized'));
  }
   const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if(!passwordRegex.test(password)){
     return next(new Error('Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long'))
  }

  if(!email.includes('@')){
    return next(new Error('Invalid email address'))
  }
  if(phoneNumber.length < 10){
     return next(new Error('Phone number must be at least 10 digits long'))
  }

  next();
}

function errorHandler(err,req,res,next){
     const logMessage = `${new Date().toISOString()} - ${err.message}\n`;
     fs.appendFile(path.join(__dirname,"..",'error.log'), logMessage , (err)=>{
        if(err){
            console.error('Error writing to log file:', logMessage);
        }
     })
     res.status(400).json({error : err.message});
}


module.exports = {errorHandler , validateRegistration}