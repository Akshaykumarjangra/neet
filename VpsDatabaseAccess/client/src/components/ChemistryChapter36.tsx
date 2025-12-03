
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Calendar, Trophy, CheckCircle2, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const studyPlan = [
  {
    phase: "Final 7 Days",
    days: [
      {
        day: "Day 7",
        focus: "Physical Chemistry Revision",
        tasks: [
          "Mole concept & stoichiometry formulas",
          "Thermodynamics laws & calculations",
          "Equilibrium & ionic equilibrium",
          "Solve 20 numerical problems",
          "Review previous errors in this section"
        ],
        time: "8 hours"
      },
      {
        day: "Day 6",
        focus: "Inorganic Chemistry Revision",
        tasks: [
          "Periodic table trends & exceptions",
          "s, p, d, f block elements",
          "Coordination chemistry",
          "Qualitative analysis",
          "Practice 30 MCQs"
        ],
        time: "8 hours"
      },
      {
        day: "Day 5",
        focus: "Organic Chemistry Revision",
        tasks: [
          "All name reactions & mechanisms",
          "Functional group tests",
          "GOC principles",
          "Biomolecules & polymers",
          "Practice 30 MCQs"
        ],
        time: "8 hours"
      },
      {
        day: "Day 4",
        focus: "Full Mock Test",
        tasks: [
          "Complete 45-question mock (180 min)",
          "Analyze mistakes thoroughly",
          "Revise weak areas identified",
          "Update formula sheet",
          "Rest & recovery"
        ],
        time: "6 hours study + rest"
      },
      {
        day: "Day 3",
        focus: "High-Yield Topics",
        tasks: [
          "Chemical bonding & molecular structure",
          "Electrochemistry calculations",
          "Aldehydes, ketones, carboxylic acids",
          "d-block & coordination compounds",
          "Practice mixed 40 MCQs"
        ],
        time: "7 hours"
      },
      {
        day: "Day 2",
        focus: "Quick Revision & Formula Sheet",
        tasks: [
          "Go through all formula sheets",
          "Revise exception cases",
          "Named reactions list",
          "Color reactions & tests",
          "Light practice (20 MCQs)"
        ],
        time: "6 hours"
      },
      {
        day: "Day 1",
        focus: "Exam Day Preparation",
        tasks: [
          "Light revision (no new topics)",
          "Read important formulas",
          "Relax & visualize success",
          "Early sleep (10 PM)",
          "Check admit card & documents"
        ],
        time: "3-4 hours only"
      }
    ]
  }
];

const examDayStrategy = [
  {
    time: "Morning (2-3 hours before exam)",
    activities: [
      "Wake up fresh (6-7 hours sleep)",
      "Light breakfast (avoid heavy meals)",
      "Quick 15-min formula revision",
      "Stay calm, avoid last-minute cramming",
      "Organize exam materials"
    ]
  },
  {
    time: "Journey to Exam Center",
    activities: [
      "Leave 1 hour early",
      "Carry admit card, ID, pen, pencil",
      "Listen to calming music",
      "Avoid discussing with anxious peers",
      "Stay positive and confident"
    ]
  },
  {
    time: "At Exam Center (30 min before)",
    activities: [
      "Reach 30 minutes early",
      "Use washroom",
      "Quick water sip",
      "10-min formula glance",
      "Deep breathing exercises"
    ]
  }
];

const duringExamStrategy = {
  first5Min: [
    "Read all instructions carefully",
    "Scan entire question paper",
    "Identify easy, medium, hard questions",
    "Mark sections you're confident in",
    "Plan time allocation (45Q in 180min = 4min/Q)"
  ],
  next120Min: [
    "Start with easiest questions (build confidence)",
    "Do all questions you're 100% sure about",
    "Mark uncertain ones for review",
    "Don't get stuck on any single question",
    "Keep moving to maintain momentum"
  ],
  next40Min: [
    "Attempt moderate difficulty questions",
    "Use elimination method",
    "Make educated guesses where needed",
    "Time per question: max 4 minutes",
    "Start attempting marked questions"
  ],
  last15Min: [
    "Review all marked questions",
    "Double-check calculations",
    "Ensure all bubbles filled correctly",
    "No random guessing (negative marking)",
    "Stay calm until the end"
  ]
};

const subjectWiseStrategy = [
  {
    subject: "Physical Chemistry",
    approach: "Calculation-heavy, formula-based",
    tips: [
      "Keep formula sheet in mind",
      "Check units before calculating",
      "Use approximations where possible",
      "Watch for standard vs non-standard conditions",
      "Common topics: Mole concept, thermodynamics, equilibrium, electrochemistry"
    ],
    timeAllocation: "20-25 minutes for 15 questions"
  },
  {
    subject: "Inorganic Chemistry",
    approach: "Fact-based, memory-intensive",
    tips: [
      "Recall periodic trends quickly",
      "Know exceptions (very important)",
      "Color reactions & tests",
      "Coordination chemistry nomenclature",
      "Common topics: Periodic table, s/p/d/f blocks, coordination"
    ],
    timeAllocation: "15-20 minutes for 15 questions"
  },
  {
    subject: "Organic Chemistry",
    approach: "Mechanism & reaction-based",
    tips: [
      "Draw mechanisms if confused",
      "Know all name reactions",
      "Functional group priority order",
      "Carbocation/carbanion stability",
      "Common topics: GOC, reactions, functional groups"
    ],
    timeAllocation: "20-25 minutes for 15 questions"
  }
];

const finalChecklist = [
  "✅ Revised all 34 chapters thoroughly",
  "✅ Completed minimum 3 full-length mock tests",
  "✅ Analyzed and learned from all mistakes",
  "✅ Mastered all important formulas and reactions",
  "✅ Know common errors and how to avoid them",
  "✅ Prepared admit card and documents",
  "✅ Planned exam day schedule",
  "✅ Maintained positive mindset",
  "✅ Got adequate sleep before exam",
  "✅ Ready to give your best performance!"
];

export function ChemistryChapter36() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 36: Final Success Blueprint</h1>
          <p className="text-muted-foreground">Your complete strategy for NEET Chemistry success</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Final Week
          </TabsTrigger>
          <TabsTrigger value="exam-day">
            <Target className="h-4 w-4 mr-2" />
            Exam Day
          </TabsTrigger>
          <TabsTrigger value="checklist">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Congratulations on Completing the Course!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                You've covered all 36 chapters of comprehensive NEET Chemistry preparation.
                Now it's time to consolidate everything and ace the exam!
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">
                      What You've Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>✓ 30 core topic chapters</p>
                    <p>✓ Advanced problem solving</p>
                    <p>✓ Full-length mock tests</p>
                    <p>✓ Topic-wise mastery</p>
                    <p>✓ Quick revision strategies</p>
                    <p>✓ Error analysis</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      Your Preparation Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Syllabus Coverage</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Practice Questions</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exam Readiness</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-600 dark:text-yellow-400">
                      Expected Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>Target: 160+/180 marks</p>
                    <p>Accuracy: 85-90%</p>
                    <p>Attempt: 42-45 questions</p>
                    <p>Time: Complete in 170 min</p>
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-2">
                      You're ready to excel! 🎯
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject-Wise Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectWiseStrategy.map((subject, idx) => (
                <Card key={idx} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.subject}</CardTitle>
                      <Badge variant="outline">{subject.timeAllocation}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{subject.approach}</p>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {subject.tips.map((tip, tIdx) => (
                      <p key={tIdx}>• {tip}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Final 7-Day Study Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyPlan[0].days.map((day, idx) => (
                <Card key={idx} className={`border-${idx === 6 ? 'green' : 'blue'}-500/20`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{day.day}</CardTitle>
                        <p className="text-sm text-muted-foreground">{day.focus}</p>
                      </div>
                      <Badge variant="secondary">{day.time}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {day.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-day" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Day Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {examDayStrategy.map((phase, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">
                    {phase.time}
                  </h3>
                  <div className="grid gap-2">
                    {phase.activities.map((activity, aIdx) => (
                      <Card key={aIdx} className="border-purple-500/20">
                        <CardContent className="pt-4 flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <p className="text-sm">{activity}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mt-8">
                <CardHeader>
                  <CardTitle>During Exam: Time Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      First 5 Minutes (Scanning Phase)
                    </h4>
                    <ul className="text-sm space-y-1">
                      {duringExamStrategy.first5Min.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                      Next 120 Minutes (Easy Questions Phase)
                    </h4>
                    <ul className="text-sm space-y-1">
                      {duringExamStrategy.next120Min.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                      Next 40 Minutes (Medium Questions Phase)
                    </h4>
                    <ul className="text-sm space-y-1">
                      {duringExamStrategy.next40Min.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                      Last 15 Minutes (Review Phase)
                    </h4>
                    <ul className="text-sm space-y-1">
                      {duringExamStrategy.last15Min.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Final Readiness Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {finalChecklist.map((item, idx) => (
                <Card key={idx} className="border-green-500/20">
                  <CardContent className="pt-4 flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <p className="text-lg">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Final Words of Motivation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg">
                🌟 You've put in the hard work and preparation
              </p>
              <p className="text-lg">
                💪 You've covered every topic systematically
              </p>
              <p className="text-lg">
                🎯 You've practiced extensively
              </p>
              <p className="text-lg">
                ✨ You know your strengths and weaknesses
              </p>
              <p className="text-2xl font-bold text-center mt-6 text-purple-600 dark:text-purple-400">
                Now go and CONQUER that NEET exam! 🚀
              </p>
              <p className="text-center text-lg text-green-600 dark:text-green-400 mt-4">
                Believe in yourself. You've got this! All the very best! 🎉
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
