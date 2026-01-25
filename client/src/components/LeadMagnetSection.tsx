
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, FileText, Video, Award } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { LeadMagnet } from "@shared/schema";

export function LeadMagnetSection() {
    const { toast } = useToast();
    const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const { data: magnets, isLoading } = useQuery<LeadMagnet[]>({
        queryKey: ["/api/growth/lead-magnets"],
    });

    const captureMutation = useMutation({
        mutationFn: async (vars: any) => {
            return apiRequest("POST", "/api/growth/capture-lead", vars);
        },
        onSuccess: () => {
            toast({
                title: "Success!",
                description: "Your resource is ready for download.",
            });
            if (selectedMagnet) {
                window.open(selectedMagnet.contentUrl, "_blank");
            }
            setSelectedMagnet(null);
            setEmail("");
            setName("");
        },
        onError: (err: any) => {
            toast({
                title: "Error",
                description: err.message || "Failed to process request.",
                variant: "destructive",
            });
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!magnets || magnets.length === 0) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case "pdf": return <FileText className="h-5 w-5" />;
            case "video": return <Video className="h-5 w-5" />;
            case "test_series": return <Award className="h-5 w-5" />;
            default: return <Download className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Free Study Resources</h2>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">New</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {magnets.map((magnet) => (
                    <Card key={magnet.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                        {magnet.thumbnailUrl && (
                            <div className="h-40 overflow-hidden relative">
                                <img
                                    src={magnet.thumbnailUrl}
                                    alt={magnet.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 dark:bg-black/90 rounded text-xs font-bold uppercase tracking-wider text-indigo-600">
                                    {magnet.type}
                                </div>
                            </div>
                        )}
                        <CardHeader className="p-4">
                            <div className="flex items-center gap-2 mb-1 text-indigo-600 dark:text-indigo-400">
                                {getIcon(magnet.type)}
                                <span className="text-xs font-semibold uppercase">{magnet.type.replace('_', ' ')}</span>
                            </div>
                            <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">{magnet.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{magnet.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            {selectedMagnet?.id === magnet.id ? (
                                <div className="space-y-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                                    <Input
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white"
                                    />
                                    <Input
                                        placeholder="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white"
                                    />
                                    <Button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                        disabled={captureMutation.isPending || !email}
                                        onClick={() => captureMutation.mutate({
                                            magnetId: magnet.id,
                                            email,
                                            name,
                                            status: "new"
                                        })}
                                    >
                                        {captureMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                                        Access Now
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full text-xs text-gray-500"
                                        onClick={() => setSelectedMagnet(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="w-full group-hover:bg-indigo-600 group-hover:text-white transition-all"
                                    onClick={() => setSelectedMagnet(magnet)}
                                >
                                    {magnet.callToAction}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
