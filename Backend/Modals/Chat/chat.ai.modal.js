import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sender: { type: String, enum: ["user", "AI"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Chat = mongoose.model("Chat", chatSchema);
