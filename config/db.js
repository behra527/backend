const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Skip MongoDB connection only if MONGO_URI is not set
        if (!process.env.MONGO_URI) {
            console.log('⚠️  MONGO_URI not set - MongoDB connection skipped');
            console.log('💡 To enable MongoDB, set MONGO_URI in backend/.env, e.g. mongodb://localhost:27017/ecommerce');
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`⚠️  MongoDB Connection Failed: ${error.message}`);
        console.log('💡 App will run without database - some features may not work');
        console.log('💡 To fix: Set up MongoDB Atlas or install MongoDB locally');
    }
};

module.exports = connectDB;
