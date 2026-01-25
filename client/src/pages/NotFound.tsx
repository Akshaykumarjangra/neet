import { Link } from "wouter";
import { FileQuestion, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-muted">
                <CardContent className="pt-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <FileQuestion className="h-24 w-24 text-muted-foreground/20" />
                        <AlertCircle className="h-8 w-8 text-destructive absolute -bottom-1 -right-1 bg-background rounded-full" />
                    </div>

                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                        404
                    </h1>
                    <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                    <Link href="/">
                        <Button size="lg" className="min-w-[200px]">
                            Return Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
