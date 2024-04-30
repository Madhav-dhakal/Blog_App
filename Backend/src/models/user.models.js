const mongoose= require('mongoose')

const userSchema = new mongoose.Schema(
     {
     username:{
          type:String,
          required:[true,'username is required'],
          min: 3,
          max: 50,
     },
     email:{
          type:String,
          required:[true,'email is required']
     },
     password:{
          type:String,
          required:[true,'password is required']
     },
     blogs :[{
    type:mongoose.Types.ObjectId,
    ref:"Blog",

     }],
},
{
     timestamps: true,
     autoCreate: true,
     autoIndex: true,
}
)

const userModel= mongoose.model('user',userSchema);
   
      module.exports= userModel;
