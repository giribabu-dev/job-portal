import mongoose from "mongoose";

// Function to connect the MongoDB database
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
    } catch (error) {
        console.error("Database connection failed:", error.message)
        process.exit()
    }
}

export default connectDB;