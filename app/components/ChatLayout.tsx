import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import type { Message } from '../../types/socket';
import type { Socket } from 'socket.io-client';

interface ChatLayoutProps {
  messages: Message[];
  joinedRoom: string | null;
  socket: Socket | null;
  isConnected: boolean;
  message: string;
  setMessage: (message: string) => void;
  username: string;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCopyMessage: (text: string, buttonElement: HTMLElement) => void;
}

export default function ChatLayout({
  messages,
  joinedRoom,
  socket,
  isConnected,
  message,
  setMessage,
  username,
  onSendMessage,
  onKeyPress,
  onCopyMessage
}: ChatLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Messages Panel */}
      <div className="lg:col-span-3">
        <ChatMessages
          messages={messages}
          currentUsername={username}
          socketId={socket?.id}
          onCopyMessage={onCopyMessage}
        />
        <MessageInput
          message={message}
          setMessage={setMessage}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
          isConnected={isConnected}
        />
      </div>

      {/* Sidebar */}
      <Sidebar socket={socket} username={username} joinedRoom={joinedRoom} />
    </div>
  );
}