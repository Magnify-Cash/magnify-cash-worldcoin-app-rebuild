
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getBadgeVariant, getBadgeText, isRecent } from "./utils";
import type { Announcement } from "./utils";

interface AnnouncementItemProps {
  announcement: Announcement;
  isRead: boolean;
  onMarkRead: (id: number) => void;
  index: number;
  groupIndex: number;
}

export const AnnouncementItem = ({
  announcement,
  isRead,
  onMarkRead,
  index,
  groupIndex,
}: AnnouncementItemProps) => {
  const navigate = useNavigate();

  const handleActionClick = () => {
    if (!announcement.action) return;
    
    // Check if the action is an external URL
    if (announcement.action.startsWith('http') || announcement.action.includes('.')) {
      window.open(announcement.action, '_blank');
    } else {
      // Internal route
      navigate(announcement.action);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(announcement.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (groupIndex + index) * 0.1 }}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-all duration-200 
        ${announcement.is_highlighted 
          ? "border-2 border-primary ring-2 ring-primary/20 bg-primary/5" 
          : "border-border"
        }`}
    >
      {announcement.is_new && !isRead && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {announcement.is_highlighted && (
            <Star className="h-5 w-5 text-primary animate-pulse" />
          )}
          <h3 className="text-lg font-semibold text-foreground">
            {announcement.title}
          </h3>
          <div className="flex gap-2">
            <Badge variant={getBadgeVariant(announcement.type)}>
              {getBadgeText(announcement.type)}
            </Badge>
            {isRecent(announcement.date) && (
              <Badge variant="default" className="bg-primary hover:bg-primary">
                New
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formattedDate}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={`${isRead ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => onMarkRead(announcement.id)}
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
          onClick={handleActionClick}
          className="mt-4 gap-2"
          variant="outline"
          size="sm"
        >
          Try it now
          {(announcement.action.startsWith('http') || announcement.action.includes('.')) && (
            <ExternalLink className="h-4 w-4" />
          )}
        </Button>
      )}
    </motion.div>
  );
};
