import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/SignupForm";
import { ShieldAlert } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: "login" | "signup";
    title?: string;
    description?: string;
}

export function AuthModal({
    isOpen,
    onClose,
    initialTab = "login",
    title = "Unlock Premium Content",
    description = "Please login or create an account to continue your NEET preparation.",
}: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <Tabs
                    value={activeTab}
                    onValueChange={(val) => setActiveTab(val as "login" | "signup")}
                    className="w-full mt-2"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <div className="mt-4 max-h-[60vh] overflow-y-auto px-1">
                        <TabsContent value="login">
                            <LoginForm onSuccess={() => onClose()} />
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignupForm onSuccess={() => onClose()} />
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
