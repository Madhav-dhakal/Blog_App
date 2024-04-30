const userModel = require("../models/user.models");
const bcrypt= require("bcrypt");
exports.getAllUsers=async(req,res)=>{
     try {
          const users = await userModel.find({});
          return res.status(200).send({
               userCount:users.length,
               success:true,
               message:"all users data",
               result:users,
          });
     } catch (error) {
          console.log(error);
          return res.status(500).send({
               success:false,
               message:"Error occurs",
               error,
          })

     }
};

 exports .registerController=async(req,res)=>{
  try {
     const {username,email,password}= req.body;

     if(!username || !email || !password){
          return res.status(400).send({
               success:false,
               message:"please fill all fields",
          })
     }
     const existingUser=await userModel.findOne({email})
     if(existingUser){
          return res.status(401).send({
               success:false,
               message:"user already exists"
                  
          })
     }
        let hashedPassword= await bcrypt.hash(password,10);
     

     // save new user
     const user= new userModel({username,email,password:hashedPassword})
     await user.save();
     return res.status(201).send({
          success:true,
          message:"New user created",
          result:user
     })
  } catch (error) {
     console.log(error);
     return res.status(500).send({
          
          message:"error in register callback",
          success:false,
          error
     })
  }
 }
 exports .loginController=async(req,res)=>{
     try {
          const {email,password}=req.body;
          //validation
          if(!email || !password){
               return res.status(401).send({
                    success:false,
                    message:"credentials doesnot match",
               })
          }
          const user=await userModel.findOne({email});
          if(!user){
               return res.status(200).send({
                    success:false,
                    message:"email is not registered",
               })
          }
          // check password
          const isMatch= await bcrypt.compare(password,user.password)
          if(!isMatch){
               return res.status(401).send({
                    success:false,
                    message:"Invalid credentials"
               })
          }
          return res.status(200).send({
               success:true,
               message:"Login successfully",
               user,

          })
     } catch (error) {
          console.log(error);
          return res.status(500).send({
               success:false,
               message:"Error at Login callback",
               error
          })
          
     }
 };
