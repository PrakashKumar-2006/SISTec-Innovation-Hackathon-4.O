const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Admin = require('./models/Admin'); // just to load mongoose models maybe? 

async function testQuery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // require server.js logic? No, just define Registration schema minimally
    const registrationSchema = new mongoose.Schema({}, { strict: false });
    const Registration = mongoose.model('Registration', registrationSchema);
    
    console.log('Querying for SIH4-0D1914 (case-insensitive regex)');
    const byRegex = await Registration.findOne({ registrationId: { $regex: new RegExp(`^SIH4-0D1914$`, 'i') } });
    console.log('byRegex result:', byRegex ? byRegex.registrationId : null);

    console.log('Fetching all registrationIds...');
    const all = await Registration.find({}, 'registrationId').limit(10);
    console.log('All reg IDs:', all.map(r => r.registrationId));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

testQuery();
