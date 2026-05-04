import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Search,
    Atom,
    FlaskConical,
    Leaf,
    Bug,
    Play,
    ArrowLeft,
    Calculator,
    Film,
    Clock,
    Youtube,
    PlayCircle
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { videos, VideoItem } from "@/data/videos";

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
    Physics: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
    Chemistry: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
    Botany: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30" },
    Zoology: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/30" },
    Math: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/30" },
};

const subjectIcons: Record<string, React.ReactNode> = {
    Physics: <Atom className="h-4 w-4" />,
    Chemistry: <FlaskConical className="h-4 w-4" />,
    Botany: <Leaf className="h-4 w-4" />,
    Zoology: <Bug className="h-4 w-4" />,
    Math: <Calculator className="h-4 w-4" />,
};

export default function Videos() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSubject, setActiveSubject] = useState("all");
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

    const filteredVideos = useMemo(() => {
        return videos.filter((vid) => {
            const matchesSearch =
                searchQuery === "" ||
                vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vid.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesSubject = activeSubject === "all" || vid.subject === activeSubject;
            return matchesSearch && matchesSubject;
        });
    }, [searchQuery, activeSubject]);

    return (
        <div className="min-h-screen bg-background" data-testid="page-videos">
            <Seo 
                title="NEET Video Lectures & Curated Tutorials | ZERO AI NEET"
                description="Watch curated educational videos for NEET Physics, Chemistry, Biology, and Math. Master complex concepts with expert tutorials and high-quality video content."
                keywords={["NEET videos", "NEET lectures", "medical entrance video tutorials", "biology neet videos", "physics neet lectures"]}
                url="https://neet.zeroai.org.in/videos"
            />
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" data-testid="button-back-dashboard">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold flex items-center gap-2">
                                    <Film className="h-6 w-6 text-primary" />
                                    Video Library
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Curated educational videos for Physics, Chemistry, Biology, and Math
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 max-w-md ml-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search videos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                    data-testid="input-search"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 space-y-6">
                <Tabs value={activeSubject} onValueChange={setActiveSubject}>
                    <TabsList className="grid w-full max-w-md grid-cols-5">
                        <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                        <TabsTrigger value="Physics" data-testid="tab-physics">
                            <Atom className="h-4 w-4 mr-1" /> Physics
                        </TabsTrigger>
                        <TabsTrigger value="Chemistry" data-testid="tab-chemistry">
                            <FlaskConical className="h-4 w-4 mr-1" /> Chem
                        </TabsTrigger>
                        <TabsTrigger value="Botany" data-testid="tab-botany">
                            <Leaf className="h-4 w-4 mr-1" /> Bot
                        </TabsTrigger>
                        <TabsTrigger value="Zoology" data-testid="tab-zoology">
                            <Bug className="h-4 w-4 mr-1" /> Zoo
                        </TabsTrigger>
                        {/* <TabsTrigger value="Math" data-testid="tab-math">
              <Calculator className="h-4 w-4 mr-1" /> Math
            </TabsTrigger> */}
                    </TabsList>

                    {/* Separate simple bar for Math if tabs list is full, or just add it to list if fitting */}
                    <div className="flex gap-2 mt-2 md:hidden overflow-x-auto pb-2">
                        <Button variant={activeSubject === "Math" ? "default" : "outline"} size="sm" onClick={() => setActiveSubject("Math")}>
                            <Calculator className="h-4 w-4 mr-1" /> Math
                        </Button>
                    </div>


                    <TabsContent value={activeSubject} className="mt-6">
                        {filteredVideos.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No videos found matching your criteria.</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setActiveSubject("all"); }}>
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredVideos.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onSelect={() => setSelectedVideo(video)}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main>

            <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black text-white border-white/20">
                    {selectedVideo && (
                        <div className="flex flex-col h-full">
                            <div className="relative pt-[56.25%] bg-black">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                                    title={selectedVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-6 bg-slate-900">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold mb-2">{selectedVideo.title}</h2>
                                        <p className="text-slate-300 text-sm mb-4">{selectedVideo.description}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                                                {selectedVideo.channel}
                                            </Badge>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {selectedVideo.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge variant="default" className={`${subjectColors[selectedVideo.subject]?.bg} ${subjectColors[selectedVideo.subject]?.text} border-none`}>
                                        {selectedVideo.subject}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function VideoCard({ video, onSelect }: { video: VideoItem; onSelect: () => void }) {
    const colors = subjectColors[video.subject] || subjectColors.Physics;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                className={`cursor-pointer transition-all hover:shadow-xl ${colors.border} border-2 overflow-hidden group`}
                onClick={onSelect}
            >
                <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {video.duration}
                    </div>
                </div>

                <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className={`p-1.5 rounded-md ${colors.bg} shrink-0`}>
                            <span className={colors.text}>{subjectIcons[video.subject]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base leading-tight line-clamp-2" title={video.title}>
                                {video.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Youtube className="h-3 w-3" />
                            <span className="truncate min-w-0 flex-1">{video.channel}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5">
                            {video.difficulty}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
