
const mongoose=require('mongoose')
const{Schema}=require('mongoose')



const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require:true
  },
});

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;