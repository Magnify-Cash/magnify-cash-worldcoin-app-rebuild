
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tables } from "@/types/supabase/database";
import { Skeleton } from "@/components/ui/skeleton";

type Announcement = Tables<"announcements">;

const getBadgeVariant = (type: Announcement['type']) => {
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

const getBadgeText = (type: Announcement['type']) => {
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

type GroupedAnnouncements = [string, Announcement[]][];

const groupAnnouncementsByMonth = (announcements: Announcement[]): GroupedAnnouncements => {
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

const isRecent = (date: string) => {
  const announcementDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - announcementDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

const Announcements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: announcements, isLoading: isLoadingAnnouncements } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });

  const { data: readAnnouncements } = useQuery({
    queryKey: ['announcement-reads'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_announcement_reads')
        .select('announcement_id')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      return data.map(read => read.announcement_id);
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (announcementId: number) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('user_announcement_reads')
        .upsert({
          user_id: user.id,
          announcement_id: announcementId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcement-reads'] });
      toast({
        title: "Marked as read",
        description: "This announcement has been marked as read",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark announcement as read",
        variant: "destructive",
      });
      console.error("Error marking announcement as read:", error);
    },
  });

  const isRead = (id: number) => readAnnouncements?.includes(id) ?? false;

  if (isLoadingAnnouncements) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Announcements" showBack={false} />
        <div className="container max-w-2xl mx-auto p-6 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const groupedAnnouncements = groupAnnouncementsByMonth(announcements || []);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Announcements" showBack={false} />
      
      <div className="container max-w-2xl mx-auto p-6 space-y-8">
        {groupedAnnouncements.map(([monthYear, monthAnnouncements], groupIndex) => (
          <motion.div
            key={monthYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">{monthYear}</h2>
            <div className="space-y-4">
              {monthAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (groupIndex + index) * 0.1 }}
                  className={`glass-card p-6 hover-lift transition-all duration-200 hover:shadow-lg relative 
                    ${announcement.is_highlighted 
                      ? "border-2 border-primary ring-2 ring-primary/20 bg-primary/5" 
                      : ""
                    }`}
                >
                  {announcement.is_new && !isRead(announcement.id) && (
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
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${isRead(announcement.id) ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={() => markAsReadMutation.mutate(announcement.id)}
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
                      onClick={() => navigate(announcement.action!)}
                      className="mt-4"
                      variant="outline"
                      size="sm"
                    >
                      Try it now
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
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
