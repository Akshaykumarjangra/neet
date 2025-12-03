import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  subject: string;
  icon: string | LucideIcon;
  progress?: number;
  totalQuestions?: number;
  solvedQuestions?: number;
  color?: string;
  solved?: number;
  total?: number;
}

export function SubjectCard({
  subject,
  icon,
  progress = 0,
  totalQuestions = 0,
  solvedQuestions = 0,
  color = "#3b82f6",
  solved,
  total,
}: SubjectCardProps) {
  const displaySolved = solved !== undefined ? solved : solvedQuestions;
  const displayTotal = total !== undefined ? total : totalQuestions;
  
  const getSubjectPath = (subjectName: string) => {
    const paths: Record<string, string> = {
      Physics: "/physics",
      Chemistry: "/chemistry",
      Biology: "/biology",
      Botany: "/botany",
      Zoology: "/zoology",
    };
    return paths[subjectName] || "/explore";
  };

  const IconComponent = typeof icon === 'string' ? null : icon;

  return (
    <Link href={getSubjectPath(subject)}>
      <Card 
        className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
        data-testid={`card-subject-${subject.toLowerCase()}`}
      >
        <div 
          className="absolute top-0 left-0 w-full h-1" 
          style={{ backgroundColor: color }}
        />
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                border: `2px solid ${color}40`
              }}
            >
              {IconComponent ? (
                <IconComponent className="w-7 h-7" style={{ color }} />
              ) : (
                <img 
                  src={icon as string} 
                  alt={subject} 
                  className="w-10 h-10 object-contain"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {subject}
              </h3>
              <p className="text-sm text-muted-foreground">
                {displaySolved} / {displayTotal} questions solved
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" style={{ color }}>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{ 
                background: `${color}20`,
              }}
            />
          </div>
          
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Tap to continue learning</span>
            <span 
              className="font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${color}20`,
                color 
              }}
            >
              {progress >= 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
