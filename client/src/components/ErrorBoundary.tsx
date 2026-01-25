import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <Card className="w-full max-w-md shadow-lg border-destructive/20">
                        <CardContent className="pt-6 text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                                    <AlertCircle className="h-6 w-6 text-destructive" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
                            <p className="text-muted-foreground mb-6">
                                We apologize for the inconvenience. The application has encountered an unexpected error.
                            </p>
                            <div className="space-y-4">
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="w-full"
                                >
                                    Reload Page
                                </Button>
                                <div className="text-xs text-muted-foreground bg-muted p-2 rounded overflow-auto max-h-32 text-left">
                                    {this.state.error?.message}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
