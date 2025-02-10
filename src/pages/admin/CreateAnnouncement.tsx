
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AnnouncementType } from "@/types/supabase/database";
import { useNavigate } from "react-router-dom";

const CreateAnnouncement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "announcement" as AnnouncementType,
    is_highlighted: false,
    action: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("announcements").insert([
        {
          ...formData,
          date: new Date().toISOString(),
          is_new: true,
          action: formData.action || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement created successfully",
      });

      navigate("/announcements");
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast({
        title: "Error",
        description: "Failed to create announcement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Create Announcement" showBack={true} />
      
      <div className="container max-w-2xl mx-auto p-6 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Announcement content"
              required
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: AnnouncementType) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="new-feature">New Feature</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="update">Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Action URL (Optional)</Label>
            <Input
              id="action"
              value={formData.action}
              onChange={(e) => setFormData({ ...formData, action: e.target.value })}
              placeholder="/optional-url"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="highlighted"
              checked={formData.is_highlighted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_highlighted: checked })
              }
            />
            <Label htmlFor="highlighted">Highlight this announcement</Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Announcement"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
