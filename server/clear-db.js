const mongoose = require('mongoose');
require('dotenv').config();

const clearDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get all collections from the database directly
    const collections = await mongoose.connection.db.collections();

    // Iterate over all collections and delete all documents
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`🧹 Cleared collection: ${collection.collectionName}`);
    }

    console.log('✨ All 11 schemas data cleared successfully for testing!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDB();
