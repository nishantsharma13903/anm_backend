const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        
        const instance = await mongoose.connect(`mongodb+srv://nishantsharma13903:${process.env.MONGODB_PASSWORD}@cluster0.pjs07.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        const host = instance.connection.host;
        console.log("MongoDB is connected to host ", host );
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;