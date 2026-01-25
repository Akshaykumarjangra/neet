import { Link } from "wouter";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function AccessDenied() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-col items-center text-center pb-2">
                    <div className="h-16 w-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                        <ShieldAlert className="h-8 w-8 text-orange-600" />
                    </div>
                    <h1 className="text-2xl font-bold">Premium Content</h1>
                    <p className="text-muted-foreground">
                        This chapter is part of our premium study material.
                    </p>
                </CardHeader>
                <CardContent className="text-center pb-6">
                    <ul className="text-sm text-left space-y-2 mb-6 bg-muted/50 p-4 rounded-lg">
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Access to all 90+ Chapters
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Unlimited Practice Questions
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> AI Doubt Solving
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Personalized Analytics
                        </li>
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Link href="/pricing" className="w-full">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                            Upgrade to Premium
                        </Button>
                    </Link>
                    <Link href="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full">
                            Back to Dashboard
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
