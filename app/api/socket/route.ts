import { NextRequest } from 'next/server';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Extend the global object to store the Socket.IO server
declare global {
  var io: SocketIOServer | undefined;
}

// Store messages per room in memory (in production, use Redis or database)
const roomMessages: { [roomId: string]: any[] } = {};

export async function GET(req: NextRequest) {
  if (!global.io) {
    console.log('🔌 Initializing Socket.IO server...');
    
    // Create HTTP server reference
    const httpServer: NetServer = (req as any).socket?.server as NetServer;
    
    // Initialize Socket.IO server
    global.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      addTrailingSlash: false,
    });

    global.io.on('connection', (socket) => {
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
      socket.on('signal', ({ roomId, payload }: { roomId: string; payload: any }) => {
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
  }

  return new Response('Socket.IO server initialized', { status: 200 });
}
