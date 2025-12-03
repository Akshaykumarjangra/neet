import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Trophy, Calendar, Clock, BookOpen, Zap, Brain, Heart } from "lucide-react";

const examDayStrategy = [
  {
    time: "Night Before (10 PM - 11 PM)",
    tasks: [
      "Review formula sheets (don't learn new topics)",
      "Glance through mnemonics and quick tips",
      "Check exam center location, admit card, stationery",
      "Set 2-3 alarms for morning",
      "Sleep by 11 PM (8 hours sleep is crucial)"
    ]
  },
  {
    time: "Exam Day Morning (6 AM - 1 PM)",
    tasks: [
      "Wake up at 6 AM, light exercise/yoga (10 min)",
      "Breakfast: banana, eggs, juice (avoid heavy food)",
      "Quick revision: only formulas, no full chapters",
      "Reach exam center 45 minutes early",
      "Use washroom before entering hall"
    ]
  },
  {
    time: "First 15 Minutes (Strategy Phase)",
    tasks: [
      "Read all instructions carefully on OMR sheet",
      "Fill personal details accurately, carefully",
      "Take 3 deep breaths to calm nerves",
      "Quick scan of entire paper (don't read deeply)",
      "Identify easy, moderate, tough questions"
    ]
  },
  {
    time: "Chemistry Section (55-60 minutes)",
    tasks: [
      "Start with Physical Chemistry (formulas fresh in mind)",
      "Then Inorganic (factual, quick to solve)",
      "Finally Organic (requires most thinking)",
      "Don't spend >2 min on any question initially",
      "Mark doubtful questions, return later"
    ]
  }
];

const timeManagement = {
  chemistry: [
    { topic: "Physical Chemistry (15 Q)", time: "25-28 min", strategy: "Formula-based, fast if practiced" },
    { topic: "Inorganic Chemistry (15 Q)", time: "18-22 min", strategy: "Factual recall, eliminate options" },
    { topic: "Organic Chemistry (15 Q)", time: "22-25 min", strategy: "Mechanisms, reactions, take time" },
    { topic: "Review & Doubtful", time: "8-10 min", strategy: "Revisit marked questions" }
  ]
};

const commonMistakes = [
  {
    mistake: "Attempting all questions",
    why: "Negative marking (-1 for wrong, 0 for unattempted)",
    solution: "Attempt only if 80%+ sure. Skip intelligently."
  },
  {
    mistake: "Spending too long on one question",
    why: "Loses time for easier questions later",
    solution: "Max 2 min per question. Mark and move on."
  },
  {
    mistake: "Not reading question fully",
    why: "Misses key words like 'except', 'not', 'incorrect'",
    solution: "Underline keywords mentally. Read twice if needed."
  },
  {
    mistake: "Panic when stuck",
    why: "Increases stress, reduces logical thinking",
    solution: "Skip immediately. Come back with fresh mind."
  },
  {
    mistake: "Changing answers unnecessarily",
    why: "First instinct often correct (unless calculation error)",
    solution: "Change only if 100% certain of mistake."
  },
  {
    mistake: "Starting with tough questions",
    why: "Demotivates, wastes prime time",
    solution: "Start with your strength (Physics/Chemistry/Biology)."
  }
];

const motivationalMantras = [
  "I have prepared well. I am ready. I will succeed.",
  "Every question I know is a gift. Every question I skip is wisdom.",
  "My goal is not 720/720, but my personal best with smart choices.",
  "Negative marks are worse than blank marks. I choose wisely.",
  "I trust my preparation. I trust my instincts. I trust myself.",
  "This is just one exam. I am more than this exam.",
  "Calm mind solves better than anxious mind. I breathe and focus.",
  "I have worked hard for months. 3 hours of focus is all I need."
];

const lastWeekChecklist = [
  { task: "Complete all 38 chapters at least once", priority: "Critical" },
  { task: "Solve 3 full-length mock tests", priority: "Critical" },
  { task: "Review all formula sheets daily", priority: "Critical" },
  { task: "Revise chapter 38 (Mind Maps) twice", priority: "High" },
  { task: "Practice numerical questions (Ch 37)", priority: "High" },
  { task: "Sleep 7-8 hours daily", priority: "Critical" },
  { task: "Light physical activity (30 min)", priority: "Medium" },
  { task: "Avoid social media/distractions", priority: "High" },
  { task: "Stay hydrated, eat healthy", priority: "High" },
  { task: "Visualize success, positive self-talk", priority: "Medium" }
];

export function ChemistryChapter40() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 40: Final Strategy & Success Mantras</h1>
          <p className="text-muted-foreground">Your roadmap to NEET Chemistry excellence</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-2xl">🏆 You've Come This Far!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-lg">Congratulations on completing all 39 chapters! You now have:</p>
          <div className="grid md:grid-cols-2 gap-3">
            <Badge variant="secondary" className="p-3 text-sm justify-start">✓ Mastered all NEET Chemistry topics</Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">✓ Practiced 1500+ questions</Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">✓ Understood complex concepts deeply</Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">✓ Built strong problem-solving skills</Badge>
          </div>
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-lg mt-4">
            Now, let's seal the deal with the perfect exam strategy!
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="exam-day" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="exam-day">
            <Clock className="h-4 w-4 mr-2" />
            Exam Day
          </TabsTrigger>
          <TabsTrigger value="time-mgmt">
            <Target className="h-4 w-4 mr-2" />
            Time Plan
          </TabsTrigger>
          <TabsTrigger value="mistakes">
            <Zap className="h-4 w-4 mr-2" />
            Avoid Mistakes
          </TabsTrigger>
          <TabsTrigger value="mantras">
            <Heart className="h-4 w-4 mr-2" />
            Mantras
          </TabsTrigger>
          <TabsTrigger value="last-week">
            <Calendar className="h-4 w-4 mr-2" />
            Last Week
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exam-day" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                Hour-by-Hour Exam Day Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examDayStrategy.map((phase, idx) => (
                <Card key={idx} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      {phase.time}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {phase.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">{tIdx + 1}</Badge>
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-mgmt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-green-500" />
                Chemistry Section Time Allocation (55-60 min)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeManagement.chemistry.map((item, idx) => (
                  <Card key={idx} className="border-green-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.topic}</h4>
                        <Badge variant="secondary">{item.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.strategy}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="bg-orange-500/10 border-orange-500/20 mt-4">
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    ⚡ Pro Tip: If you're strong in Chemistry, allocate 65 min and save time from Biology/Physics. Flexibility is key!
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-red-500" />
                Common Mistakes & How to Avoid Them
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonMistakes.map((item, idx) => (
                <Card key={idx} className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                      <Badge variant="destructive">{idx + 1}</Badge>
                      {item.mistake}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">Why Bad?</Badge>
                      <p>{item.why}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="default" className="bg-green-500">Solution</Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">{item.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mantras" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                Success Mantras & Mental Preparation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Read these daily in the last week. Say them out loud. Believe them.
              </p>
              {motivationalMantras.map((mantra, idx) => (
                <Card key={idx} className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/10">
                  <CardContent className="pt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-lg font-medium">{mantra}</p>
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 mt-6">
                <CardContent className="pt-4">
                  <p className="text-center text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    🌟 You are capable. You are prepared. You will succeed. 🌟
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="last-week" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-purple-500" />
                Last Week Checklist (7 Days to NEET)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lastWeekChecklist.map((item, idx) => (
                <Card key={idx} className={`border-purple-500/20 ${
                  item.priority === 'Critical' ? 'bg-red-500/5' :
                  item.priority === 'High' ? 'bg-orange-500/5' : 'bg-blue-500/5'
                }`}>
                  <CardContent className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-5 w-5" />
                      <span className="text-sm">{item.task}</span>
                    </div>
                    <Badge variant={
                      item.priority === 'Critical' ? 'destructive' :
                      item.priority === 'High' ? 'default' : 'secondary'
                    }>
                      {item.priority}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-xl">📅 Daily Schedule (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>6 AM - 8 AM:</strong> Quick revision (formulas, reactions)</p>
              <p><strong>8 AM - 9 AM:</strong> Breakfast + light exercise</p>
              <p><strong>9 AM - 12 PM:</strong> Mock test OR topic-wise practice</p>
              <p><strong>12 PM - 1 PM:</strong> Lunch break</p>
              <p><strong>1 PM - 4 PM:</strong> Review mistakes, weak areas</p>
              <p><strong>4 PM - 5 PM:</strong> Break + snack</p>
              <p><strong>5 PM - 8 PM:</strong> Chapter revision (2-3 chapters daily)</p>
              <p><strong>8 PM - 9 PM:</strong> Dinner</p>
              <p><strong>9 PM - 10 PM:</strong> Formula sheets, mnemonics, light revision</p>
              <p><strong>10 PM - 11 PM:</strong> Relaxation, sleep preparation</p>
              <p className="text-green-600 dark:text-green-400 font-semibold mt-3">
                Sleep by 11 PM. 8 hours sleep = sharp brain on exam day!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500" />
            Final Words
            <Trophy className="h-10 w-10 text-yellow-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-xl font-semibold">
            You've completed an incredible journey through 40 chapters of NEET Chemistry.
          </p>
          <p className="text-lg">
            You have the knowledge. You have the practice. You have the strategy.
          </p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            Now, go out there and show what you're capable of!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="border-blue-500/20">
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <p className="font-semibold text-lg">Trust Your Preparation</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/20">
              <CardContent className="pt-6 text-center">
                <Target className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-lg">Execute Your Strategy</p>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/20">
              <CardContent className="pt-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <p className="font-semibold text-lg">Achieve Your Dream</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-2xl font-bold text-gradient mt-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Best wishes for NEET 2025! You've got this! 🎯🔬✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
}