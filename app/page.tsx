'use client';

import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import Header from './components/Header';
import RoomControls from './components/RoomControls';
import ChatLayout from './components/ChatLayout';
import type { Message } from '../types/socket';

export default function ChatRoom() {
  const { socket, isConnected, connect } = useSocket();
  const [room, setRoom] = useState('general');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on('signal', (payload: Message) => {
      setMessages(prev => [...prev, payload]);
    });

    // Listen for chat history
    socket.on('history', (history: Message[]) => {
      console.log('📜 Received history:', history);
      if (history.length > 0) {
        setMessages(history);
      }
    });

    return () => {
      socket.off('signal');
      socket.off('history');
    };
  }, [socket]);

  const handleJoinRoom = async () => {
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      await connect(room);
      setJoinedRoom(room);
      setMessages([]); // Clear messages when joining new room
    } catch (error) {
      console.error('Failed to connect to room:', error);
      alert('Failed to connect to room. Please try again.');
    }
  };

  const handleSendMessage = () => {
    if (!socket || !isConnected || !message.trim()) return;

    const payload: Message = {
      msg: message,
      senderId: socket.id!,
      senderName: username,
      ts: Date.now()
    };

    // Add to local messages immediately
    setMessages(prev => [...prev, payload]);

    // Send to server
    socket.emit('signal', { roomId: joinedRoom, payload });

    // Clear input
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = async (text: string, buttonElement: HTMLElement) => {
    try {
      await navigator.clipboard.writeText(text);
      const originalText = buttonElement.textContent;
      buttonElement.textContent = '✅';
      buttonElement.classList.add('bg-green-500');
      
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.classList.remove('bg-green-500');
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <Header isConnected={isConnected} />
        
        <RoomControls
          room={room}
          setRoom={setRoom}
          username={username}
          setUsername={setUsername}
          onJoinRoom={handleJoinRoom}
        />

        {/* Main Chat Layout */}
        <ChatLayout
          messages={messages}
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          isConnected={isConnected}
          username={username}
          socket={socket}
          joinedRoom={joinedRoom}
          onCopyMessage={copyMessage}
        />
      </div>
    </div>
  );
}
