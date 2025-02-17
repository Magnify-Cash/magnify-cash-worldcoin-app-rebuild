
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AnnouncementGroup } from "@/features/announcements/AnnouncementGroup";
import { groupAnnouncementsByMonth } from "@/features/announcements/utils";

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
          <AnnouncementGroup
            key={monthYear}
            monthYear={monthYear}
            announcements={monthAnnouncements}
            groupIndex={groupIndex}
            isRead={isRead}
            onMarkRead={(id) => markAsReadMutation.mutate(id)}
          />
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
