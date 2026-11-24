import mongoose from 'mongoose';
const answerSchema=new mongoose.Schema({questionId:{type:mongoose.Schema.Types.ObjectId,ref:'Question',required:true},selectedKey:{type:String,default:null},isCorrect:{type:Boolean,default:false},marksAwarded:{type:Number,default:0}},{_id:false});
const attemptSchema=new mongoose.Schema({examId:{type:mongoose.Schema.Types.ObjectId,ref:'Exam',required:true,index:true},studentId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},answers:[answerSchema],startedAt:{type:Date,required:true},submittedAt:Date,deadlineAt:{type:Date,required:true},status:{type:String,enum:['in_progress','submitted','auto_submitted'],default:'in_progress'},score:{type:Number,default:0},maxScore:{type:Number,default:0},percentage:{type:Number,default:0},durationSeconds:{type:Number,default:0}},{timestamps:true});
attemptSchema.index({examId:1,studentId:1});
attemptSchema.index({studentId:1,createdAt:-1});
attemptSchema.index({examId:1,status:1});
export default mongoose.model('Attempt',attemptSchema);