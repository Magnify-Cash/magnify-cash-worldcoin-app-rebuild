
import type { Tables } from "@/types/supabase/database";

export type Announcement = Tables<"announcements">;
export type GroupedAnnouncements = [string, Announcement[]][];

export const getBadgeVariant = (type: Announcement['type']) => {
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

export const getBadgeText = (type: Announcement['type']) => {
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

export const groupAnnouncementsByMonth = (announcements: Announcement[]): GroupedAnnouncements => {
  const groups = announcements.reduce((acc, announcement) => {
    const date = new Date(announcement.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(announcement);
    return acc;
  }, {} as Record<string, Announcement[]>);

  return Object.entries(groups).sort((a, b) => {
    const dateA = new Date(a[1][0].date);
    const dateB = new Date(b[1][0].date);
    return dateB.getTime() - dateA.getTime();
  });
};

export const isRecent = (date: string) => {
  const announcementDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - announcementDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};
