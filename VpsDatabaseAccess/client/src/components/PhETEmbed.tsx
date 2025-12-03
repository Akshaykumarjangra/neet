import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PhETEmbedProps {
  title: string;
  simUrl: string;
  subject: string;
  description?: string;
}

export function PhETEmbed({
  title,
  simUrl,
  subject,
  description,
}: PhETEmbedProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{subject}</Badge>
              <a
                href={simUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
                data-testid="link-open-external"
              >
                Open in new tab
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative w-full pb-[56.25%] bg-muted rounded-lg overflow-hidden">
          <iframe
            src={simUrl}
            className="absolute inset-0 w-full h-full"
            title={title}
            allow="fullscreen"
            data-testid="iframe-phet"
          />
        </div>
      </CardContent>
    </Card>
  );
}
