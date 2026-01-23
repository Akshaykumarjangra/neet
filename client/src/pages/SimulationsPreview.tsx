
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function SimulationsPreview() {
    const [, setLocation] = useLocation();

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Simulations Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">This is a preview of the interactive simulations available in the full course.</p>
                    <Button onClick={() => setLocation("/signup")}>Sign up to access simulations</Button>
                </CardContent>
            </Card>
        </div>
    );
}
