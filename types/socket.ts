// Shared types between client and server
export interface Message {
  msg: string;
  senderId: string;
  senderName: string;
  ts: number;
}

export interface ClientToServerEvents {
  join: (roomId: string) => void;
  signal: (data: { roomId: string; payload: Message }) => void;
}

export interface ServerToClientEvents {
  history: (messages: Message[]) => void;
  signal: (message: Message) => void;
}

export interface RoomData {
  [roomId: string]: Message[];
}