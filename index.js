import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

import productsRoute from "./routes/products.route.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("./views"));

// Main Routes
app.use("/api/product", productsRoute);
app.use(errorHandler);
app.use(notFound);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
