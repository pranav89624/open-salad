import type { Message } from '../../types/socket';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  onCopyMessage: (text: string, buttonElement: HTMLElement) => void;
}

export default function MessageBubble({ message, isMe, onCopyMessage }: MessageBubbleProps) {
  return (
    <div className={`mb-3 flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`group relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isMe
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
            : 'bg-slate-700 text-slate-100'
        }`}
      >
        <button
          onClick={(e) => onCopyMessage(message.msg, e.currentTarget)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 rounded px-2 py-1 text-xs"
          title="Copy message"
        >
          📋
        </button>
        
        <div className="pr-8 whitespace-pre-wrap break-words">
          {message.msg}
        </div>
        
        <div className="text-xs opacity-70 mt-1">
          {message.senderName} • {new Date(message.ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}