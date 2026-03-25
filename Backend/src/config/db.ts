import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await mongoose.connection.collection('tasks').createIndex({ user: 1, status: 1 });
    await mongoose.connection.collection('tasks').createIndex({ user: 1, priority: 1 });
    await mongoose.connection.collection('tasks').createIndex({ user: 1, dueDate: 1 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};