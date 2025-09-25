interface RoomControlsProps {
  room: string;
  setRoom: (room: string) => void;
  username: string;
  setUsername: (username: string) => void;
  onJoinRoom: () => Promise<void>;
}

export default function RoomControls({
  room,
  setRoom,
  username,
  setUsername,
  onJoinRoom
}: RoomControlsProps) {
  return (
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
        onClick={onJoinRoom}
        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
      >
        Join Chat
      </button>
    </div>
  );
}