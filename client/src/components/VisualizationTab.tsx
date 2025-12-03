import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, BookOpen, Beaker, Atom } from "lucide-react";

interface VisualizationTabProps {
  title?: string;
  visualizations?: {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultTab?: string;
}

export function VisualizationTab({
  title = "Interactive Visualizations",
  visualizations = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Overview visualization</p>
        </div>
      ),
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "structure",
      label: "Structure",
      content: (
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Structure visualization</p>
        </div>
      ),
      icon: <Atom className="w-4 h-4" />,
    },
    {
      id: "reaction",
      label: "Reaction",
      content: (
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Reaction visualization</p>
        </div>
      ),
      icon: <Beaker className="w-4 h-4" />,
    },
  ],
  defaultTab = "overview",
}: VisualizationTabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Card data-testid="visualization-tabs">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${visualizations.length}, 1fr)` }}>
            {visualizations.map((viz) => (
              <TabsTrigger
                key={viz.id}
                value={viz.id}
                className="flex items-center gap-2"
                data-testid={`tab-${viz.id}`}
              >
                {viz.icon}
                {viz.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {visualizations.map((viz) => (
            <TabsContent key={viz.id} value={viz.id} className="mt-4">
              {viz.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default VisualizationTab;
