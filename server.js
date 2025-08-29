import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (adjust in prod)
    methods: ["GET", "POST"],
  },
});

// --- store messages per room in memory ---
const roomMessages = {}; // { roomId: [ {msg, senderId, ts} ] }

// --- REST endpoints ---
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running 🚀" });
});

// --- WebSocket signaling via socket.io ---
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Join room
  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`👤 ${socket.id} joined room ${roomId}`);

    // init storage if not exists
    if (!roomMessages[roomId]) {
      roomMessages[roomId] = [];
    }

    // send history to new joiner
    socket.emit("history", roomMessages[roomId]);
  });

  // Handle signaling messages
  socket.on("signal", ({ roomId, payload }) => {
    console.log(`📡 Signal in room ${roomId}:`, payload);

    if (!roomMessages[roomId]) {
      roomMessages[roomId] = [];
    }
    // store message
    roomMessages[roomId].push(payload);

    // broadcast to others in room
    socket.to(roomId).emit("signal", payload);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
