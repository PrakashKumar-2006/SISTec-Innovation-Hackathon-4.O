const mongoose = require('mongoose');
const Admin = require('./server/models/Admin');
require('dotenv').config({ path: './server/.env' });

async function checkAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const admins = await Admin.find({});
    console.log("Found admins:", admins.map(a => ({ email: a.email, role: a.role, status: a.status })));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkAdmins();
