import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Plus, Pin } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  audience: "all" | "premium";
  actionLabel?: string;
  actionUrl?: string;
  bannerColor: string;
  isPinned: boolean;
  isActive: boolean;
  expiresAt?: string;
}

export default function AdminAnnouncements() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: "",
    message: "",
    bannerColor: "primary",
    audience: "all" as "all" | "premium",
    actionLabel: "",
    actionUrl: "",
    isPinned: false,
    isActive: true,
    expiresAt: "",
  });

  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements/admin"],
    queryFn: async () => {
      const response = await fetch("/api/announcements/admin", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load announcements");
      }
      return (await response.json()) as Announcement[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: typeof form) => {
      return apiRequest("POST", "/api/announcements", payload);
    },
    onSuccess: () => {
      toast({ title: "Announcement saved" });
      setForm({
        title: "",
        message: "",
        bannerColor: "primary",
        audience: "all",
        actionLabel: "",
        actionUrl: "",
        isPinned: false,
        isActive: true,
        expiresAt: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/announcements/admin"] });
    },
    onError: (error: any) => {
      toast({
        title: "Unable to save",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<Announcement> }) => {
      return apiRequest("PUT", `/api/announcements/${id}`, payload);
    },
    onSuccess: () => {
      toast({ title: "Announcement updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/announcements/admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/announcements/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Announcement removed" });
      queryClient.invalidateQueries({ queryKey: ["/api/announcements/admin"] });
    },
    onError: () => {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.message.trim()) {
      toast({ title: "Title and message required", variant: "destructive" });
      return;
    }
    createMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Owner Announcements</h1>
          <p className="text-muted-foreground max-w-3xl">
            Create push banners or in-app campaigns that appear on the landing page, community, and
            other premium touchpoints.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
            <Textarea
              placeholder="Message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label className="text-xs">Audience</Label>
                <Select
                  value={form.audience}
                  onValueChange={(value) => setForm({ ...form, audience: value as "all" | "premium" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All users</SelectItem>
                    <SelectItem value="premium">Premium only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Banner Color</Label>
                <Select
                  value={form.bannerColor}
                  onValueChange={(value) => setForm({ ...form, bannerColor: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="muted">Muted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Options</Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={form.isPinned}
                    onCheckedChange={(value) => setForm({ ...form, isPinned: value })}
                  />
                  <span className="text-sm">Pinned</span>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={form.isActive}
                    onCheckedChange={(value) => setForm({ ...form, isActive: value })}
                  />
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Action label (e.g., Learn More)"
                value={form.actionLabel}
                onChange={(event) => setForm({ ...form, actionLabel: event.target.value })}
              />
              <Input
                placeholder="Action URL"
                value={form.actionUrl}
                onChange={(event) => setForm({ ...form, actionUrl: event.target.value })}
              />
            </div>
            <Input
              placeholder="Expires at (YYYY-MM-DD)"
              value={form.expiresAt}
              onChange={(event) => setForm({ ...form, expiresAt: event.target.value })}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="gap-2 w-full sm:w-auto"
              disabled={createMutation.isPending}
            >
              <Plus className="h-4 w-4" />
              {createMutation.isPending ? "Publishing..." : "Publish announcement"}
            </Button>
          </CardFooter>
        </Card>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Published announcements</h2>
          <div className="space-y-3">
            {(isLoading
              ? Array.from({ length: 3 }, () => null)
              : (announcements as (Announcement | null)[])
            ).map((announcement, index) => (
              <Card
                key={announcement?.id ?? index}
                className="border-muted/30 bg-muted/5 shadow-sm relative overflow-hidden"
              >
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg">{announcement?.title ?? <Skeleton className="h-4 w-32" />}</CardTitle>
                        {announcement?.isPinned && (
                          <Badge variant="outline" className="text-xs">
                            <Pin className="h-3 w-3" />
                            Pinned
                          </Badge>
                        )}
                        {announcement && announcement.audience === "premium" && (
                          <Badge variant="secondary" className="text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                      {announcement && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(announcement.id)}
                          disabled={deleteMutation.isPending}
                          className="text-destructive self-start sm:self-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground break-words">
                      {announcement?.message ?? "Loading..."}
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                      <span>{announcement?.actionLabel || "No action"}</span>
                      <span>{announcement?.expiresAt ? `Expires: ${announcement.expiresAt}` : "No expiry"}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {announcement && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateMutation.mutate({
                              id: announcement.id,
                              payload: { isPinned: !announcement.isPinned },
                            })
                          }
                        >
                          {announcement.isPinned ? "Unpin" : "Pin"}
                        </Button>
                      )}
                      {announcement && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateMutation.mutate({
                              id: announcement.id,
                              payload: { isActive: !announcement.isActive },
                            })
                          }
                        >
                          {announcement.isActive ? "Disable" : "Enable"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
