require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken');
const axios = require('axios');

async function test() {
  const token = jwt.sign(
    { id: '123', email: 'test@example.com', role: 'Super Admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  try {
    const res = await axios.get('http://localhost:5000/api/admin/teams?page=1&limit=10&selectionStatus=all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('SUCCESS:', res.data);
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}
test();
