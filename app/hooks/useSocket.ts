'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  connect: (room: string) => Promise<void>;
  disconnect: () => void;
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async (room: string) => {
    if (socket) {
      socket.disconnect();
    }

    try {
      // Initialize Socket.IO server by calling the API route
      await fetch('/api/socket');
      
      // Connect to Socket.IO server
      const newSocket = io({
        path: '/api/socket',
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Connected to server:', newSocket.id);
        setIsConnected(true);
        
        // Join the specified room
        newSocket.emit('join', room);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('❌ Disconnected:', reason);
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error);
        setIsConnected(false);
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('❌ Failed to initialize Socket.IO:', error);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return { socket, isConnected, connect, disconnect };
};
