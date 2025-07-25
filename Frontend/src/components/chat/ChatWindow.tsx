import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, MoreHorizontal, Send, Smile, Paperclip } from "lucide-react";
import { User, Message } from "@/types/chat";

interface ChatWindowProps {
  selectedUser: User | null;
  currentUser: User | null;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "Sarah Chen",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    content: "Hey! How's the new React project coming along?",
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false
  },
  {
    id: "2",
    senderId: "current",
    senderName: "You",
    senderAvatar: "",
    content: "Pretty good! Just implemented the new authentication flow. Want to review it?",
    timestamp: new Date(Date.now() - 3000000),
    isOwn: true
  },
  {
    id: "3",
    senderId: "1",
    senderName: "Sarah Chen",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    content: "Absolutely! I'll take a look at the PR. Also, did you see the new TypeScript 5.0 features?",
    timestamp: new Date(Date.now() - 2400000),
    isOwn: false
  },
  {
    id: "4",
    senderId: "current",
    senderName: "You",
    senderAvatar: "",
    content: "Yes! The decorators support is amazing. We should consider upgrading our project.",
    timestamp: new Date(Date.now() - 1800000),
    isOwn: true
  },
  {
    id: "5",
    senderId: "1",
    senderName: "Sarah Chen",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    content: "Agreed! Let's discuss this in tomorrow's standup. Also, check out this cool animation library I found: https://framer.com/motion",
    timestamp: new Date(Date.now() - 1200000),
    isOwn: false
  }
];

const ChatWindow = ({ selectedUser, currentUser, isCollapsed, onToggleSidebar }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: currentUser?.name || "You",
      senderAvatar: currentUser?.avatar || "",
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          "That's a great point!",
          "I'll look into that right away.",
          "Thanks for sharing! 🚀",
          "Awesome! Let's implement that.",
          "Good idea, let's schedule a call to discuss."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedUser?.id || "1",
          senderName: selectedUser?.name || "Developer",
          senderAvatar: selectedUser?.avatar || "",
          content: randomResponse,
          timestamp: new Date(),
          isOwn: false
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  if (!selectedUser) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose someone to start chatting with</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center">
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="mr-3 md:hidden"
            >
              ☰
            </Button>
          )}
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedUser.avatar} />
              <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(selectedUser.status)}`} />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-foreground">{selectedUser.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedUser.status === "online" ? "Active now" : selectedUser.status}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              {!message.isOwn && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={message.senderAvatar} />
                  <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`mx-2 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                {!message.isOwn && (
                  <p className="text-xs text-muted-foreground mb-1">{message.senderName}</p>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.isOwn
                      ? 'bg-chat-bubble-own text-white'
                      : 'bg-chat-bubble text-foreground'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex">
              <Avatar className="w-8 h-8 mt-1">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback className="text-xs">{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mx-2">
                <div className="bg-chat-bubble rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${selectedUser.name}`}
              className="bg-chat-input border-border text-foreground pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;