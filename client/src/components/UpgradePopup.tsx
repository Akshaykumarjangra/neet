
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { UpgradingPopup } from "@shared/schema";

export function UpgradePopup() {
    const [location] = useLocation();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [activePopup, setActivePopup] = useState<UpgradingPopup | null>(null);

    const { data: popups } = useQuery<UpgradingPopup[]>({
        queryKey: ["/api/growth/popups", location],
        queryFn: async () => {
            const res = await fetch(`/api/growth/popups?page=${encodeURIComponent(location)}`);
            if (!res.ok) throw new Error("Failed to fetch popups");
            return res.json();
        },
        enabled: !!user && !user.isPaidUser, // Only for free users
    });

    useEffect(() => {
        if (!popups || popups.length === 0 || isOpen) return;

        // Logic for the first applicable popup
        const popup = popups[0];

        // Check if we've seen this popup in this session
        const shownKey = `popup_shown_${popup.id}`;
        if (sessionStorage.getItem(shownKey)) return;

        if (popup.triggerType === "timer") {
            const waitTime = (popup.triggerValue as any)?.seconds || 10;
            const timer = setTimeout(() => {
                setActivePopup(popup);
                setIsOpen(true);
                sessionStorage.setItem(shownKey, "true");
            }, waitTime * 1000);
            return () => clearTimeout(timer);
        }

        // Exit intent logic
        if (popup.triggerType === "exit-intent") {
            const handleMouseOut = (e: MouseEvent) => {
                if (e.clientY <= 0) {
                    setActivePopup(popup);
                    setIsOpen(true);
                    sessionStorage.setItem(shownKey, "true");
                    document.removeEventListener("mouseout", handleMouseOut);
                }
            };
            document.addEventListener("mouseout", handleMouseOut);
            return () => document.removeEventListener("mouseout", handleMouseOut);
        }
    }, [popups, location, isOpen]);

    if (!activePopup) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px] border-none p-0 overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
                {activePopup.imageUrl && (
                    <div className="w-full h-48 overflow-hidden relative">
                        <img
                            src={activePopup.imageUrl}
                            alt={activePopup.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <h2 className="text-white text-2xl font-bold">{activePopup.title}</h2>
                        </div>
                    </div>
                )}
                <div className="p-6">
                    {!activePopup.imageUrl && (
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                {activePopup.title}
                            </DialogTitle>
                        </DialogHeader>
                    )}
                    <DialogDescription className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        {activePopup.content}
                    </DialogDescription>
                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="flex-1"
                        >
                            Maybe Later
                        </Button>
                        <Button
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                            onClick={() => {
                                setIsOpen(false);
                                window.location.href = activePopup.ctaLink;
                            }}
                        >
                            {activePopup.ctaText}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
