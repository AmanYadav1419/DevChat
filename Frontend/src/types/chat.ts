export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
}