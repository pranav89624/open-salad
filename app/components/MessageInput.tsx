interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isConnected: boolean;
}

export default function MessageInput({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  isConnected
}: MessageInputProps) {
  return (
    <div className="flex gap-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyPress}
        placeholder="Type your message... (Shift+Enter for new line)"
        className="flex-1 px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none resize-none"
        rows={2}
        disabled={!isConnected}
      />
      <button
        onClick={onSendMessage}
        disabled={!isConnected || !message.trim()}
        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded font-semibold hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all"
      >
        Send
      </button>
    </div>
  );
}