require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');

async function test() {
  const token = jwt.sign(
    { id: '123', email: 'test@example.com', role: 'Super Admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  try {
    const res = await axios.get('http://localhost:5000/api/admin/teams/export-selection-template', {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer'
    });
    fs.writeFileSync('test_export.xlsx', res.data);
    console.log('SUCCESS: wrote test_export.xlsx with size', res.data.length);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}
test();
