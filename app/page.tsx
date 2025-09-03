'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from './hooks/useSocket';

interface Message {
  msg: string;
  senderId: string;
  senderName: string;
  ts: number;
}

export default function ChatRoom() {
  const { socket, isConnected, connect } = useSocket();
  const [room, setRoom] = useState('general');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleJoinRoom = () => {
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }

    connect(room);
    setJoinedRoom(room);
    setMessages([]); // Clear messages when joining new room
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
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Baatein — Where conversations flow</h1>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm text-slate-300">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-300">Room:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
              placeholder="general"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-300">Your Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Join Chat
          </button>
        </div>

        {/* Main Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Messages Panel */}
          <div className="lg:col-span-3 bg-slate-800/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Messages</h3>
              <span className="text-sm text-slate-400">
                Room: {joinedRoom || '—'}
              </span>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto mb-4 p-2 bg-slate-900/50 rounded">
              {messages.length === 0 ? (
                <div className="text-center text-slate-400 mt-20">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isMe = socket?.id === msg.senderId;
                  return (
                    <div
                      key={index}
                      className={`mb-3 flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`group relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isMe
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'bg-slate-700 text-slate-100'
                        }`}
                      >
                        <button
                          onClick={(e) => copyMessage(msg.msg, e.currentTarget)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 rounded px-2 py-1 text-xs"
                          title="Copy message"
                        >
                          📋
                        </button>
                        
                        <div className="pr-8 whitespace-pre-wrap break-words">
                          {msg.msg}
                        </div>
                        
                        <div className="text-xs opacity-70 mt-1">
                          {msg.senderName} • {new Date(msg.ts).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message... (Shift+Enter for new line)"
                className="flex-1 px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none resize-none"
                rows={2}
                disabled={!isConnected}
              />
              <button
                onClick={handleSendMessage}
                disabled={!isConnected || !message.trim()}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded font-semibold hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all"
              >
                Send
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Connection Info */}
            <div className="bg-slate-800/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Connection Info</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div><strong>Your ID:</strong> {socket?.id || '—'}</div>
                <div><strong>Name:</strong> {username || '—'}</div>
                <div><strong>Room:</strong> {joinedRoom || '—'}</div>
              </div>
            </div>

            {/* How to use */}
            <div className="bg-slate-800/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3">How to use</h3>
              <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                <li>Enter your name and room name</li>
                <li>Click <strong>Join Chat</strong> to connect</li>
                <li>Type messages and press <strong>Send</strong></li>
                <li>Share the room name with friends!</li>
                <li>New joiners will see chat history</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
