import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save, Eye, Palette, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { Header } from "@/components/Header";

interface ChapterSummary {
  id: number;
  chapterTitle: string;
  subject: string;
  classLevel: string;
  status: string;
  detailedNotes: string;
  keyConcepts: Array<{ title: string; description: string }>;
  visualizationsData: Array<{ title: string; description: string }>;
}

interface ContentVersion {
  id: number;
  version: number;
  changeDescription: string | null;
  contentSnapshot: Record<string, any>;
  createdAt: string;
  createdBy: string | null;
}

export default function LmsContentStudio() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: chapters = [], isLoading } = useQuery<ChapterSummary[]>({
    queryKey: ["/api/chapters"],
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedId) ?? (chapters[0] ?? null),
    [chapters, selectedId]
  );

  useEffect(() => {
    if (!selectedId && chapters.length) {
      setSelectedId(chapters[0].id);
    }
  }, [chapters, selectedId]);

  const [editorState, setEditorState] = useState({
    detailedNotes: "",
    visualizationsData: "",
    keyConcepts: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!selectedChapter) return;
    setEditorState({
      detailedNotes: selectedChapter.detailedNotes,
      visualizationsData: JSON.stringify(selectedChapter.visualizationsData || [], null, 2),
      keyConcepts: JSON.stringify(selectedChapter.keyConcepts || [], null, 2),
    });
  }, [selectedChapter]);

  const updateChapter = async (payload: Record<string, any>) => {
    if (!selectedChapter) return;
    setIsSaving(true);
    const response = await fetch(`/api/chapters/${selectedChapter.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to save chapter");
    }
    setIsSaving(false);
    toast({ title: "Chapter saved", description: "Draft updated automatically." });
  };

  useEffect(() => {
    if (!selectedChapter) return;
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      const payload: any = {
        detailedNotes: editorState.detailedNotes,
      };
      try {
        payload.visualizationsData = JSON.parse(editorState.visualizationsData);
      } catch (error) {
        return;
      }
      try {
        payload.keyConcepts = JSON.parse(editorState.keyConcepts);
      } catch (error) {
        return;
      }
      updateChapter(payload).catch((error) => {
        toast({ title: "Autosave failed", description: error.message, variant: "destructive" });
      });
    }, 1000);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [editorState, selectedChapter]);

  const { data: versions = [] } = useQuery<ContentVersion[]>({
    queryKey: ["/api/automation/content-versions", selectedChapter?.id],
    enabled: !!selectedChapter,
    queryFn: async () => {
      const response = await fetch(`/api/automation/content-versions/${selectedChapter?.id}`, {
        credentials: "include",
      });
      return response.json().then((data) => data.versions || []);
    },
  });

  const [themeState, setThemeState] = useState({
    primaryColor: "#7c3aed",
    accentColor: "#f43f5e",
    headingFont: "Inter",
  });

  const themeMutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await fetch("/api/admin/settings/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ settings: payload }),
      });
      if (!response.ok) throw new Error("Failed to save theme");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Theme saved" });
    },
    onError: () => {
      toast({ title: "Theme save failed", variant: "destructive" });
    },
  });

  const handlePublish = async () => {
    if (!selectedChapter) return;
    const response = await fetch(`/api/chapters/${selectedChapter.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: "published" }),
    });
    if (response.ok) {
      toast({ title: "Chapter published", description: "Live preview ready." });
    } else {
      toast({ title: "Publish failed", variant: "destructive" });
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold leading-tight">LMS Content Studio</h1>
          <p className="text-muted-foreground">
            Inline editing, visual assets, live preview + publish, and theme controls for your chapters.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Chapters</CardTitle>
              <CardDescription>Select a chapter to edit</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {chapters.map((chapter) => (
                    <Button
                      key={chapter.id}
                      variant={selectedChapter?.id === chapter.id ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => setSelectedId(chapter.id)}
                    >
                      <span>{chapter.chapterTitle}</span>
                      <Badge variant="secondary">
                        {chapter.subject} • {chapter.classLevel}
                      </Badge>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Inline Editor</CardTitle>
                <CardDescription>Autosaves every change and keeps version history for preview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Detailed Notes</Label>
                  <Textarea
                    rows={6}
                    value={editorState.detailedNotes}
                    onChange={(event) =>
                      setEditorState((prev) => ({ ...prev, detailedNotes: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Key Concepts (JSON)</Label>
                  <Textarea
                    rows={4}
                    value={editorState.keyConcepts}
                    onChange={(event) =>
                      setEditorState((prev) => ({ ...prev, keyConcepts: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Visualizations (JSON)</Label>
                  <Textarea
                    rows={4}
                    value={editorState.visualizationsData}
                    onChange={(event) =>
                      setEditorState((prev) => ({ ...prev, visualizationsData: event.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {isSaving ? "Saving..." : "Changes auto-saved every second of inactivity."}
                  </div>
                  <Button size="sm" variant="outline" onClick={handlePublish} disabled={!selectedChapter}>
                    <Save className="h-4 w-4 mr-2" />
                    Publish chapter
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Asset Studio</CardTitle>
                <CardDescription>Upload PDFs, 3D viewer metadata, and reference videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <VisualAssetForm toast={toast} chapters={chapters} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Preview & Versions</CardTitle>
                <CardDescription>Compare latest published version with draft snapshots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {versions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No versions saved yet.</p>
                ) : (
                  versions.map((version) => (
                    <div key={version.id} className="border rounded-lg p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong>Version {version.version}</strong>
                        <Badge variant="outline">
                          {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {version.changeDescription || "Snapshot auto-generated."}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme Customizer</CardTitle>
                <CardDescription>Persist colors + typography per organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={themeState.primaryColor}
                    onChange={(event) =>
                      setThemeState((prev) => ({ ...prev, primaryColor: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <Input
                    type="color"
                    value={themeState.accentColor}
                    onChange={(event) =>
                      setThemeState((prev) => ({ ...prev, accentColor: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Heading Font</Label>
                  <Select
                    value={themeState.headingFont}
                    onValueChange={(value) => setThemeState((prev) => ({ ...prev, headingFont: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    themeMutation.mutate({
                      theme_primary_color: themeState.primaryColor,
                      theme_accent_color: themeState.accentColor,
                      theme_heading_font: themeState.headingFont,
                    })
                  }
                  disabled={themeMutation.isPending}
                >
                  {themeMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      Save Theme
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Live Preview
                </CardTitle>
                <CardDescription>
                  Simulated preview panel for the selected chapter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="font-semibold">{selectedChapter?.chapterTitle ?? "Awaiting chapter"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Inline preview renders your live edits before publishing.
                  </p>
                  <Separator />
                  <p className="text-sm">
                    {selectedChapter?.detailedNotes.substring(0, 120) || "Draft not loaded yet."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function VisualAssetForm({ toast, chapters }: { toast: ReturnType<typeof useToast>["toast"], chapters: ChapterSummary[] }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    type: "pdf",
    description: "",
    chapterContentId: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/automation/content-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to upload asset");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Asset created" });
      setForm({
        title: "",
        url: "",
        type: "pdf",
        description: "",
        chapterContentId: "",
      });
    },
    onError: (error: any) => {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="space-y-3">
      <div>
        <Label>Title</Label>
        <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
      </div>
      <div>
        <Label>URL or File Upload</Label>
        <div className="flex gap-2">
          <Input value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} placeholder="https://..." />
          <div className="relative">
            <Button variant="outline" size="icon" className="relative cursor-pointer">
              <Layers className="h-4 w-4" />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("folder", "lms-assets");

                  try {
                    toast({ title: "Uploading..." });
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });
                    if (!res.ok) throw new Error("Upload failed");
                    const data = await res.json();
                    setForm({ ...form, url: data.url, title: form.title || file.name });
                    toast({ title: "File uploaded", description: "URL auto-filled." });
                  } catch (err: any) {
                    toast({ title: "Error", description: err.message, variant: "destructive" });
                  }
                }}
              />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Label>Type</Label>
        <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="threejs">3D Visual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          rows={3}
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
        />
      </div>
      <div>
        <Label>Link to Chapter (Optional)</Label>
        <Select
          value={form.chapterContentId}
          onValueChange={(value) => setForm({ ...form, chapterContentId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a chapter..." />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={String(chapter.id)}>
                {chapter.chapterTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !form.title || !form.url}
      >
        <Layers className="h-4 w-4 mr-2" />
        Upload asset
      </Button>
    </div>
  );
}
