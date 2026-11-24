import dns from 'node:dns';
import mongoose from 'mongoose';
export async function connectDB(){
  const dnsServers=process.env.MONGO_DNS_SERVERS?.split(',').map(server=>server.trim());
  if(dnsServers){
    if(dnsServers.some(server=>!server)) throw new Error('MONGO_DNS_SERVERS must be a comma-separated list of DNS server addresses.');
    dns.setServers(dnsServers);
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}