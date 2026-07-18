const dns = require('dns');
try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch (e) {}

require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Please set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in your .env file.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sih');

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists. Skipping creation.`);
      process.exit(0);
    }

    const newAdmin = new Admin({
      email,
      password,
      role: 'Super Admin'
    });

    await newAdmin.save();
    console.log(`Successfully created Super Admin: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
