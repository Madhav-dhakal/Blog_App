// const express = require("express");
// const app = express();
// require('dotenv').config();
// require("./src/config/dbCon.config");
// const userRoutes=require('./src/routes/user.routes')

// // body parser
// app.use(express.json());
// app.use(express.urlencoded({
//      extended:false // false=qs library, true= queryString library
// }))

// app.use("/health",(req,res,next)=>{
//      res.send("success ok");
// })
// app.use('/api/v1/user',userRoutes);

// // 404 handle
// app.use((req,res,next)=>{
//      res.status(404).json({
//           result:null,
//           message:"Not Found",
//           meta:null
//      })
// })

// // garbage collector 0r error handler

//   app.use((error,req,res,next)=>{
//      console.log("GarbageCollector:",error);
//      let code= error.code ?? 500;
//      let message = error.message ?? "Internal server error...";

//      //TODO:handle different types of exceptions

//      res.status(code).json({
//           result:null,
//           message:message,
//           meta:null
//      })

//   })
// module.exports=app;