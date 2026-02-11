import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/catagory.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/orderOperations.routes.js";
import cartRoutes from "./routes/cart.routes.js";

import { connectDB } from "./config/db.js";

const app = express();

// ───── CORS SETUP ─────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4000",

  // ADD THESE AFTER DEPLOY
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
];

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

// ───── DB CONNECTION FOR SERVERLESS ─────
let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

// ───── LOCAL SERVER START ─────
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

export default app;
