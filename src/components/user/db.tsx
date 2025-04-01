import mongoose from "mongoose";

console.log("🟡 Starting MongoDB Connection...");

const MONGO_URI = "mongodb://localhost:27017/campus-connector";

const connectDB = async () => {
  try {
    const mongooseInstance = mongoose.default || mongoose; // Fix for ES module issue
    await mongooseInstance.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

connectDB();

export default connectDB;
