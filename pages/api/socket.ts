import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, Message } from '../../types/socket';

// Extend the API response to include Socket.IO
type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
    };
  };
};

// Store messages per room in memory (in production, use Redis or database)
const roomMessages: { [roomId: string]: Message[] } = {};

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('🔌 Initializing Socket.IO server...');

    // Initialize Socket.IO server
    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? [process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-app.vercel.app']
          : ['http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Attach to the server
    res.socket.server.io = io;

    // Socket.IO connection handling
    io.on('connection', (socket) => {
      console.log('🔌 New client connected:', socket.id);

      // Join room
      socket.on('join', (roomId: string) => {
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

    console.log('✅ Socket.IO server initialized');
  } else {
    console.log('Socket.IO server already initialized');
  }

  res.end();
}

// Disable body parsing for WebSocket requests
export const config = {
  api: {
    bodyParser: false,
  },
};