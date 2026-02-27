import "dotenv/config"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/catagory.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/orderOperations.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderNotificationsRoutes from "./routes/orderNotifications.routes.js";
import http from "http";
import { connectDB } from "./config/db.js";
import { getAIResponse } from "./chatAI.js";
import { Chat } from "./Modals/Chat/chat.ai.modal.js";

// ───── CORS SETUP ─────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4000",

  // ADD THESE AFTER DEPLOY
  // process.env.CLIENT_URL,
  // process.env.ADMIN_URL,
];
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// ───── HEALTH ROUTE ─────
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

// ───── ROUTES ─────
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderNotificationsRoutes);

// ───── START SERVER AFTER DB CONNECTION ─────

io.on("connection", (socket) => {
  console.log("hello socket id =", socket.id);

  // AI Chat bot integration

  socket.on("send-message", async (data) => {
    const { userId, message } = data;

    if (message) {
      if (userId) {
        await Chat.create({ userId, sender: "user", content: message });
      }
      const aiReply = await getAIResponse(message);
      console.log({ aiReply });

      if (userId) {
        await Chat.create({ userId, sender: "AI", content: aiReply });
      }

      // Send AI reply back to client
      socket.emit("ai-response", { message: aiReply });
    }
  });
});

app.set("socketio", io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("MongoDB connected successfully.");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to connect to MongoDB:", error);
    process.exit(1); // Exit server if DB connection fails
  }
};

startServer();

