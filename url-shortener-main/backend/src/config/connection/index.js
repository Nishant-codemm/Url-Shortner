const mongoose = require('mongoose');
exports.connectToDatabase = async mongoURI => {
  try {
    const connection = await mongoose.connect(mongoURI);
    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};