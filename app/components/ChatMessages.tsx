import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from '../../types/socket';

interface ChatMessagesProps {
  messages: Message[];
  currentUsername: string;
  socketId?: string;
  onCopyMessage: (text: string, buttonElement: HTMLElement) => void;
}

export default function ChatMessages({
  messages,
  currentUsername,
  socketId,
  onCopyMessage
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-96 overflow-y-auto mb-4 p-2 bg-slate-900/50 rounded">
      {messages.length === 0 ? (
        <div className="text-center text-slate-400 mt-20">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((msg, index) => {
          const isMe = socketId === msg.senderId;
          return (
            <MessageBubble
              key={index}
              message={msg}
              isMe={isMe}
              onCopyMessage={onCopyMessage}
            />
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}