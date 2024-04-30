const express =require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv=require('dotenv')
dotenv.config();
const app = express();
//mongodb conn
require("./src/config/dbCon.config");
app.use(express.json());
app.use(express.urlencoded({
          extended:false // false=qs library, true= queryString library
}));
const userRoutes=require('./src/routes/user.routes');
const blogRoutes=require("./src/routes/blog.routes")
//router
app.use(cors())
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes)


app.use(morgan('dev'))

//routes
// app.get('/',(req,res)=>{
//      res.status(200).send({
//           "message":"Node server"
//      })
// })

//port 
const PORT=process.env.PORT;

app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`);
     console.log("press ctrl+c to disconnect your server",);
     console.log("use http://localhost:8080/ to browse your server");
})