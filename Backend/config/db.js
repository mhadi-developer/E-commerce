import mongoose from 'mongoose'

const url = (process.env.MONGO_DB_URI);
export const connectDB =  async ()=>{
   await mongoose.connect(url);
}