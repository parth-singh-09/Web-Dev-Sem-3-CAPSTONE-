import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,select:false},role:{type:String,enum:['admin','faculty','student'],default:'student'},section:{type:String,default:''},isActive:{type:Boolean,default:true},refreshTokenHash:{type:String,select:false}},{timestamps:true});
userSchema.index({role:1,section:1});
export default mongoose.model('User',userSchema);