import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Users, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/chat";

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@devchat.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    status: "online"
  },
  {
    id: "2", 
    name: "Alex Rodriguez",
    email: "alex@devchat.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    status: "online"
  },
  {
    id: "3",
    name: "Jamie Kim",
    email: "jamie@devchat.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie",
    status: "away"
  },
  {
    id: "4",
    name: "Morgan Taylor",
    email: "morgan@devchat.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: "5",
    name: "Riley Johnson",
    email: "riley@devchat.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=riley",
    status: "online"
  }
];

const mockChannels = [
  { id: "general", name: "general", type: "text" },
  { id: "random", name: "random", type: "text" },
  { id: "tech-talk", name: "tech-talk", type: "text" },
  { id: "announcements", name: "announcements", type: "text" }
];

interface ChatSidebarProps {
  currentUser: User | null;
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ChatSidebar = ({ currentUser, selectedUserId, onUserSelect, isCollapsed }: ChatSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("devchat-user");
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-online-status";
      case "away":
        return "bg-dev-orange";
      case "offline":
        return "bg-offline-status";
      default:
        return "bg-offline-status";
    }
  };

  if (isCollapsed) {
    return (
      <motion.div
        initial={false}
        animate={{ width: "64px" }}
        className="bg-card border-r border-border flex flex-col h-full"
      >
        <div className="p-4 border-b border-border">
          <Avatar className="w-8 h-8">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          {mockUsers.map((user) => (
            <Button
              key={user.id}
              variant={selectedUserId === user.id ? "secondary" : "ghost"}
              size="sm"
              className="w-full p-2 h-auto"
              onClick={() => onUserSelect(user.id)}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: "280px" }}
      className="bg-card border-r border-border flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">DevChat</h2>
        
        {/* Channels Section */}
        <div className="mb-6">
          <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            <Hash className="w-3 h-3 mr-1" />
            Channels
          </div>
          <div className="space-y-1">
            {mockChannels.map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              >
                <Hash className="w-4 h-4 mr-2" />
                {channel.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          <Users className="w-3 h-3 mr-1" />
          Direct Messages
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {mockUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ x: 4 }}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
              selectedUserId === user.id
                ? "bg-primary/20 border border-primary/30"
                : "hover:bg-secondary/50"
            }`}
            onClick={() => onUserSelect(user.id)}
          >
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(user.status)}`} />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.status === "offline" ? user.lastSeen : user.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online-status rounded-full border-2 border-card" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">online</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;