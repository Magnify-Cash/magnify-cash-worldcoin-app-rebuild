import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Sample announcements data - can be moved to an API/database later
const announcements = [
  {
    id: 1,
    title: "V2 is live",
    date: "2024-03-21",
    content: "V2 is now live featuring a new loan type \"Passport Verification\". Try it out!",
    action: "/loan",
    type: "new-feature",
    isHighlighted: true,
    isNew: true
  },
  {
    id: 2,
    title: "Welcome to Magnify Cash v2",
    date: "2024-03-20",
    content: "We're excited to launch the new version of Magnify Cash with improved features and user experience.",
    type: "announcement",
    isNew: true
  },
  {
    id: 3,
    title: "New Wallet Features",
    date: "2024-03-19",
    content: "Check out our enhanced wallet functionality with better transaction tracking and real-time updates.",
    type: "update",
    isNew: false
  },
  {
    id: 4,
    title: "Security Updates",
    date: "2024-03-18",
    content: "We've implemented additional security measures to keep your assets safe.",
    type: "security",
    isNew: false
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "new-feature":
      return "secondary";
    case "security":
      return "destructive";
    case "update":
      return "default";
    default:
      return "outline";
  }
};

const getBadgeText = (type: string) => {
  switch (type) {
    case "new-feature":
      return "New Feature";
    case "security":
      return "Security";
    case "update":
      return "Update";
    default:
      return "Announcement";
  }
};

const Announcements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [readAnnouncements, setReadAnnouncements] = useState<number[]>(() => {
    const saved = localStorage.getItem('readAnnouncements');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('readAnnouncements', JSON.stringify(readAnnouncements));
  }, [readAnnouncements]);

  const markAsRead = (id: number) => {
    if (!readAnnouncements.includes(id)) {
      const newReadAnnouncements = [...readAnnouncements, id];
      setReadAnnouncements(newReadAnnouncements);
      toast({
        title: "Marked as read",
        description: "This announcement has been marked as read",
      });
    }
  };

  const isRead = (id: number) => readAnnouncements.includes(id);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Announcements" showBack={false} />
      
      <div className="container max-w-2xl mx-auto p-6 space-y-6">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 hover-lift transition-all duration-200 hover:shadow-lg relative ${
              announcement.isHighlighted 
                ? "border-2 border-secondary ring-2 ring-secondary/20" 
                : ""
            }`}
          >
            {announcement.isNew && !isRead(announcement.id) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            )}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {announcement.isHighlighted && (
                  <Star className="h-5 w-5 text-secondary animate-pulse" />
                )}
                <h3 className="text-lg font-semibold text-foreground">
                  {announcement.title}
                </h3>
                <Badge variant={getBadgeVariant(announcement.type)}>
                  {getBadgeText(announcement.type)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isRead(announcement.id) ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => markAsRead(announcement.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mt-2">
              {announcement.content}
            </p>
            {announcement.action && (
              <Button
                onClick={() => navigate(announcement.action)}
                className="mt-4"
                variant="outline"
                size="sm"
              >
                Try it now
              </Button>
            )}
          </motion.div>
        ))}

        <div className="flex justify-center pt-6">
          <Button
            onClick={() => navigate("/wallet")}
            className="w-full max-w-xs"
            size="lg"
          >
            Go to Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;