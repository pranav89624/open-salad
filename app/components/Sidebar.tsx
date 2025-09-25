import ConnectionInfo from './ConnectionInfo';
import HowToUse from './HowToUse';
import type { Socket } from 'socket.io-client';

interface SidebarProps {
  socket: Socket | null;
  username: string;
  joinedRoom: string | null;
}

export default function Sidebar({ socket, username, joinedRoom }: SidebarProps) {
  return (
    <div className="space-y-4">
      <ConnectionInfo socket={socket} username={username} joinedRoom={joinedRoom} />
      <HowToUse />
    </div>
  );
}