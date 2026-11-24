import 'dotenv/config';import http from 'http';import {Server} from 'socket.io';import app from './app.js';import {connectDB} from './config/db.js';
const server=http.createServer(app);const io=new Server(server,{cors:{origin:process.env.CLIENT_URL||'http://localhost:5173',credentials:true}});app.set('io',io);
io.on('connection',socket=>{socket.on('exam:join',({examId})=>{if(examId)socket.join(`exam:${examId}`);});socket.on('disconnect',()=>{});});
const port=process.env.PORT||5000;connectDB().then(()=>server.listen(port,()=>console.log(`ExamFlow API running on ${port}`))).catch(err=>{console.error(err);process.exit(1)});
process.on('unhandledRejection',err=>{console.error('Unhandled rejection',err);server.close(()=>process.exit(1));});