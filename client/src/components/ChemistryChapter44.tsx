
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Coffee, Brain, Heart, Shield, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const examDayTimeline = [
  {
    time: "Night Before (10 PM - 11 PM)",
    activities: [
      "Pack your exam essentials: Admit card, ID proof, stationery",
      "Quick revision of formulas and mnemonics (30 min max)",
      "Prepare clothes, water bottle, snacks for next day",
      "Set 2-3 alarms for wake-up time",
      "Sleep by 11 PM - DO NOT study late night!"
    ],
    icon: "🌙",
    color: "blue"
  },
  {
    time: "Morning (6 AM - 8 AM)",
    activities: [
      "Wake up fresh at 6 AM, light exercise/yoga (15 min)",
      "Healthy breakfast with good carbs and protein",
      "Quick glance at rapid fire notes (15 min only)",
      "Arrive at exam center by 1 PM (for 2 PM exam)",
      "Use washroom, hydrate well"
    ],
    icon: "☀️",
    color: "yellow"
  },
  {
    time: "At Exam Center (1 PM - 2 PM)",
    activities: [
      "Reach center 1 hour early to avoid last-minute stress",
      "Light snack and water 30 minutes before exam",
      "Visit washroom 15 minutes before reporting time",
      "Avoid discussing topics with peers - causes confusion",
      "Stay calm, do deep breathing exercises"
    ],
    icon: "🏫",
    color: "green"
  },
  {
    time: "In Exam Hall (2 PM - 5:20 PM)",
    activities: [
      "Listen to all instructions carefully",
      "Check if your question paper code matches OMR sheet",
      "Start with your strongest section (usually Chemistry)",
      "Use 3-pass strategy strictly",
      "Mark answers carefully, avoid silly bubbling errors"
    ],
    icon: "📝",
    color: "purple"
  },
  {
    time: "After Exam",
    activities: [
      "Don't discuss answers with friends - it's done!",
      "Have a good meal, rest and relax",
      "Avoid social media discussions about paper",
      "Trust your preparation and wait for results",
      "Plan celebration - you've earned it!"
    ],
    icon: "🎉",
    color: "pink"
  }
];

const stressManagement = [
  {
    situation: "Feeling anxious before exam",
    solution: "Practice 4-7-8 breathing: Inhale 4 sec, Hold 7 sec, Exhale 8 sec. Repeat 5 times.",
    emergency: "Splash cold water on face, do 10 jumping jacks"
  },
  {
    situation: "Blank mind during exam",
    solution: "Close eyes, take 3 deep breaths. Skip question, come back later. Your brain will recall.",
    emergency: "Move to next section, return when calm"
  },
  {
    situation: "Running out of time",
    solution: "Don't panic! Focus on attempting remaining easy questions. Quality > Quantity.",
    emergency: "Use elimination method for quick guesses on remaining questions"
  },
  {
    situation: "Made silly mistake, realized late",
    solution: "Correct it if you're 100% sure. Otherwise, move on. Don't dwell on past questions.",
    emergency: "Accept it and focus on next questions. One mistake won't ruin your score."
  },
  {
    situation: "Stomach ache or headache",
    solution: "Inform invigilator immediately. Take prescribed medicine if available.",
    emergency: "Request for brief break, use washroom, splash water on face"
  }
];

const dosDonts = {
  dos: [
    "✅ Start with your strongest section to build confidence",
    "✅ Read questions carefully, underline key words",
    "✅ Use rough work space systematically",
    "✅ Mark difficult questions for review",
    "✅ Double-check OMR bubbling every 10 questions",
    "✅ Maintain steady pace, don't rush",
    "✅ Stay hydrated, sip water between sections",
    "✅ Trust your preparation and first instinct",
    "✅ Keep track of time using wall clock",
    "✅ Stay positive even if some questions are tough"
  ],
  donts: [
    "❌ Don't panic if some questions seem difficult",
    "❌ Don't spend too much time on single question",
    "❌ Don't change answers unless 100% sure",
    "❌ Don't leave OMR bubbling for the end",
    "❌ Don't discuss questions during breaks",
    "❌ Don't compare your paper with others",
    "❌ Don't keep looking at clock every minute",
    "❌ Don't attempt questions you have no clue about",
    "❌ Don't second-guess yourself repeatedly",
    "❌ Don't carry mobile phone or prohibited items"
  ]
};

const emergencyChecklist = [
  "Admit card and ID proof (2 copies each)",
  "Ball point pens (3-4 blue/black)",
  "Transparent water bottle",
  "Simple watch (analog recommended)",
  "Light snacks (chocolate, glucose)",
  "Pocket tissues",
  "Small sanitizer bottle",
  "Extra mask",
  "Sweater/jacket (AC can be cold)",
  "Any prescribed medicines"
];

export function ChemistryChapter44() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 44: Exam Day Mastery</h1>
          <p className="text-muted-foreground">Everything you need to ace NEET on D-Day</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Your Final Battle Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg">
            This is what you've been preparing for. Stay calm, stay focused, and execute your plan!
          </p>
          <p className="text-sm text-muted-foreground">
            Remember: Preparation × Strategy × Execution = SUCCESS
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">
            <Coffee className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="stress">
            <Heart className="h-4 w-4 mr-2" />
            Stress Control
          </TabsTrigger>
          <TabsTrigger value="dos-donts">
            <Shield className="h-4 w-4 mr-2" />
            Do's & Don'ts
          </TabsTrigger>
          <TabsTrigger value="checklist">
            <Star className="h-4 w-4 mr-2" />
            Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {examDayTimeline.map((slot, idx) => (
            <Card key={idx} className={`border-${slot.color}-500/20`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{slot.icon}</span>
                  <div>
                    <p className="text-xl">{slot.time}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {slot.activities.map((activity, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2">
                      <div className={`h-6 w-6 rounded-full bg-${slot.color}-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                        {aIdx + 1}
                      </div>
                      <p className="text-sm">{activity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="stress" className="space-y-4">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-500" />
                Stay Calm Under Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Stress is normal. It's your body preparing you to perform. Use these techniques to channel it positively.
              </p>
            </CardContent>
          </Card>

          {stressManagement.map((item, idx) => (
            <Card key={idx} className="border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-orange-600 dark:text-orange-400">
                  Situation: {item.situation}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Badge className="mb-2">Recommended Solution</Badge>
                  <p className="text-sm">{item.solution}</p>
                </div>
                <Card className="bg-red-500/10 border-red-500/20">
                  <CardContent className="pt-4">
                    <Badge variant="destructive" className="mb-2">Emergency Action</Badge>
                    <p className="text-sm">{item.emergency}</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="dos-donts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Shield className="h-6 w-6" />
                  DO These Things
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dosDonts.dos.map((item, idx) => (
                    <Card key={idx} className="bg-green-500/10">
                      <CardContent className="pt-4">
                        <p className="text-sm">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Shield className="h-6 w-6" />
                  DON'T Do These
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dosDonts.donts.map((item, idx) => (
                    <Card key={idx} className="bg-red-500/10">
                      <CardContent className="pt-4">
                        <p className="text-sm">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-purple-500" />
                Essential Items Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {emergencyChecklist.map((item, idx) => (
                  <Card key={idx} className="bg-purple-500/10">
                    <CardContent className="pt-4 flex items-center gap-2">
                      <input type="checkbox" className="h-5 w-5" />
                      <p className="text-sm font-medium">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardHeader>
              <CardTitle>⚠️ Night Before Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">Admit card printed and kept safely</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">ID proof verified and packed</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">Exam center location confirmed</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">Transport arrangement done</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">All stationery items packed</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  <p className="text-sm">Early sleep planned (by 11 PM)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-2xl">🌟 Final Words of Wisdom</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-lg font-semibold">
            You've prepared for this moment. Trust your preparation.
          </p>
          <p className="text-sm">
            ✨ Stay calm, stay focused, stay positive
          </p>
          <p className="text-sm">
            ✨ Execute your strategy without panic
          </p>
          <p className="text-sm">
            ✨ Remember: It's just another test, not the end of the world
          </p>
          <p className="text-sm">
            ✨ Give your 100%, leave the rest to destiny
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-4">
            🏆 ALL THE BEST! YOU'VE GOT THIS! 🏆
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
