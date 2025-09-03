import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// Store messages per room in memory (in production, use Redis or database)
const roomMessages = {};

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer(handler);

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Join room
    socket.on('join', (roomId) => {
      socket.join(roomId);
      console.log(`👤 ${socket.id} joined room ${roomId}`);

      // Initialize storage if not exists
      if (!roomMessages[roomId]) {
        roomMessages[roomId] = [];
      }

      // Send history to new joiner
      socket.emit('history', roomMessages[roomId]);
    });

    // Handle signaling messages
    socket.on('signal', ({ roomId, payload }) => {
      console.log(`📡 Signal in room ${roomId}:`, payload);

      if (!roomMessages[roomId]) {
        roomMessages[roomId] = [];
      }
      
      // Store message
      roomMessages[roomId].push(payload);

      // Broadcast to others in room
      socket.to(roomId).emit('signal', payload);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  // Start the server
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`✅ Baatein server running on http://${hostname}:${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
