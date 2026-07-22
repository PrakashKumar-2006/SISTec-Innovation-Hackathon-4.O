require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sih_registrations');
  const db = mongoose.connection.db;
  const count = await db.collection('registrations').countDocuments();
  console.log('Total registrations:', count);
  mongoose.disconnect();
}
test();
