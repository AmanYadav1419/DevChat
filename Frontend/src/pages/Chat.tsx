import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
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

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("devchat-user");
    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser({
        ...user,
        status: "online" as const
      });
      // Auto-select first user for demo
      setSelectedUserId("1");
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    // Close mobile sidebar when user is selected
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const selectedUser = mockUsers.find(user => user.id === selectedUserId) || null;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileSidebarOpen ? 0 : window.innerWidth < 768 ? -280 : 0,
        }}
        className="fixed md:relative z-50 md:z-0 h-full md:flex"
      >
        <ChatSidebar
          currentUser={currentUser}
          selectedUserId={selectedUserId}
          onUserSelect={handleUserSelect}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-card border-b border-border p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">DevChat</h1>
          <div className="w-10" /> {/* Spacer for center alignment */}
        </div>

        {/* Desktop Toggle Button */}
        <div className="hidden md:block">
          {isSidebarCollapsed && (
            <div className="absolute top-4 left-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="text-muted-foreground hover:text-foreground"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        <ChatWindow
          selectedUser={selectedUser}
          currentUser={currentUser}
          isCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default Chat;