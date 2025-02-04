import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Sample announcements data - can be moved to an API/database later
const announcements = [
  {
    id: 1,
    title: "V2 is live",
    date: "2024-03-21",
    content: "V2 is now live featuring a new loan type \"Passport Verification\". Try it out!",
    action: "/loan"
  },
  {
    id: 2,
    title: "Welcome to Magnify Cash v2",
    date: "2024-03-20",
    content: "We're excited to launch the new version of Magnify Cash with improved features and user experience.",
  },
  {
    id: 3,
    title: "New Wallet Features",
    date: "2024-03-19",
    content: "Check out our enhanced wallet functionality with better transaction tracking and real-time updates.",
  },
  {
    id: 4,
    title: "Security Updates",
    date: "2024-03-18",
    content: "We've implemented additional security measures to keep your assets safe.",
  },
];

const Announcements = () => {
  const navigate = useNavigate();

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
            className="glass-card p-6 hover-lift"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {announcement.title}
              </h3>
              <span className="text-sm text-muted-foreground">
                {new Date(announcement.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground">
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