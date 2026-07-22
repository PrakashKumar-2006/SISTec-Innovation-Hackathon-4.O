require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const http = require('http');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sih_registrations');
  
  // Just require the adminTeams file to see if it parses correctly
  const adminTeams = require('./routes/adminTeams');
  console.log("adminTeams loaded successfully");
  mongoose.disconnect();
}
test();
