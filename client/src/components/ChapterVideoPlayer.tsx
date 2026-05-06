"use strict";

/**
 * ChapterVideoPlayer — Overflow-safe, responsive video section
 * for chapter pages. Handles AI-generated videos + YouTube links.
 *
 * Anti-overflow guarantees:
 * - max-w-full on all containers
 * - aspect-ratio boxes with overflow-hidden
 * - truncate/line-clamp on all text
 * - No hardcoded px widths
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, Film, Clock, ExternalLink, Sparkles, ChevronRight } from "lucide-react";

interface VideoLink {
  title: string;
  url: string;
  duration?: string;
  source: string;
}

interface ContentAsset {
  id: number;
  type: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  metadata?: Record<string, any>;
}

interface ChapterVideoPlayerProps {
  videoLinks: VideoLink[];
  contentAssets: ContentAsset[];
  chapterTitle: string;
  subject: string;
}

const subjectAccent: Record<string, string> = {
  Physics: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  Chemistry: "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  Botany: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  Zoology: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
};

function formatDuration(seconds?: number): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : url;
}

export function ChapterVideoPlayer({
  videoLinks,
  contentAssets,
  chapterTitle,
  subject,
}: ChapterVideoPlayerProps) {
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    isYouTube: boolean;
  } | null>(null);

  // Merge AI-generated videos from contentAssets + curated videoLinks
  const aiVideos = contentAssets.filter(
    (a) => a.type === "video" && a.metadata?.source === "video-agent"
  );
  const allVideoLinks = videoLinks || [];

  const hasVideos = aiVideos.length > 0 || allVideoLinks.length > 0;

  if (!hasVideos) return null;

  const accent = subjectAccent[subject] || subjectAccent.Physics;

  return (
    <>
      {/* ── Video Section Card ── */}
      <Card className={`max-w-full overflow-hidden border bg-gradient-to-br ${accent}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg truncate">
            <Film className="h-5 w-5 shrink-0 text-primary" />
            <span className="truncate">Video Lessons</span>
            {aiVideos.length > 0 && (
              <Badge variant="secondary" className="shrink-0 text-[10px] gap-1">
                <Sparkles className="h-3 w-3" /> AI Generated
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 max-w-full overflow-hidden">
          {/* AI-Generated Videos (priority display) */}
          {aiVideos.map((video) => (
            <button
              key={video.id}
              onClick={() =>
                setActiveVideo({
                  url: video.url,
                  title: video.title,
                  isYouTube: false,
                })
              }
              className="w-full group cursor-pointer"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/80">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <Film className="h-12 w-12 text-white/30" />
                  </div>
                )}

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                    <Play className="h-7 w-7 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                {video.durationSeconds && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {formatDuration(video.durationSeconds)}
                  </div>
                )}

                {/* AI badge */}
                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> 3D Animation
                </div>
              </div>

              <p className="mt-2 text-sm font-medium text-left truncate max-w-full">
                {video.title}
              </p>
              {video.description && (
                <p className="text-xs text-muted-foreground text-left line-clamp-2 max-w-full">
                  {video.description}
                </p>
              )}
            </button>
          ))}

          {/* Curated Video Links */}
          {allVideoLinks.length > 0 && (
            <div className="space-y-2 max-w-full overflow-hidden">
              {aiVideos.length > 0 && (
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2">
                  More Videos
                </p>
              )}

              {allVideoLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isYouTubeUrl(link.url)) {
                      setActiveVideo({
                        url: getYouTubeEmbedUrl(link.url),
                        title: link.title,
                        isYouTube: true,
                      });
                    } else {
                      setActiveVideo({
                        url: link.url,
                        title: link.title,
                        isYouTube: false,
                      });
                    }
                  }}
                  className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors group max-w-full overflow-hidden"
                >
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate max-w-full">
                      {link.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      {link.duration && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" /> {link.duration}
                        </span>
                      )}
                      <span className="truncate max-w-[120px]">{link.source}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Video Player Modal ── */}
      <Dialog
        open={activeVideo !== null}
        onOpenChange={(open) => !open && setActiveVideo(null)}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-black text-white border-white/20">
          <DialogHeader className="sr-only">
            <DialogTitle>Video Player</DialogTitle>
            <DialogDescription>Watch the chapter video</DialogDescription>
          </DialogHeader>
          {activeVideo && (
            <div className="flex flex-col max-w-full overflow-hidden">
              {/* Video container — 16:9 aspect ratio, overflow-hidden */}
              <div className="relative w-full pt-[56.25%] bg-black overflow-hidden">
                {activeVideo.isYouTube ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={activeVideo.url}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full object-contain"
                    src={activeVideo.url}
                    controls
                    autoPlay
                    controlsList="nodownload"
                  >
                    <track kind="captions" />
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              {/* Title bar */}
              <div className="p-4 bg-slate-900 max-w-full overflow-hidden">
                <h3 className="text-lg font-semibold truncate max-w-full">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 truncate">
                  {chapterTitle}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
