import type { Socket } from 'socket.io-client';

interface ConnectionInfoProps {
  socket: Socket | null;
  username: string;
  joinedRoom: string | null;
}

export default function ConnectionInfo({ socket, username, joinedRoom }: ConnectionInfoProps) {
  return (
    <div className="bg-slate-800/30 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Connection Info</h3>
      <div className="space-y-2 text-sm text-slate-300">
        <div><strong>Your ID:</strong> {socket?.id || '—'}</div>
        <div><strong>Name:</strong> {username || '—'}</div>
        <div><strong>Room:</strong> {joinedRoom || '—'}</div>
      </div>
    </div>
  );
}