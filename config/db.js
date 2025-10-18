const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI missing in .env');
        return; // don't exit; let server start so we can hit health endpoint
    }
    try {
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err?.message);
        // Optional: log common hints
        console.error('Hints: check Network Access IP allowlist, username/password, and URL-encoding for special chars.');
        // Do NOT exit; keep server up so you can still hit GET /
    }
};

module.exports = connectDB;
