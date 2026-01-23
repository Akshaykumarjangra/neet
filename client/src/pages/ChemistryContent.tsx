import { useState } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChemistryChapter1 } from "@/components/ChemistryChapter1";
import { ChemistryChapter2 } from "@/components/ChemistryChapter2";
import { ChemistryChapter3 } from "@/components/ChemistryChapter3";
import { ChemistryChapter4 } from "@/components/ChemistryChapter4";
import { ChemistryChapter5 } from "@/components/ChemistryChapter5";
import { ChemistryChapter6 } from "@/components/ChemistryChapter6";
import { ChemistryChapter7 } from "@/components/ChemistryChapter7";
import { ChemistryChapter8 } from "@/components/ChemistryChapter8";
import { ChemistryChapter9 } from "@/components/ChemistryChapter9";
import { ChemistryChapter10 } from "@/components/ChemistryChapter10";
import { ChemistryChapter11 } from "@/components/ChemistryChapter11";
import { ChemistryChapter12 } from "@/components/ChemistryChapter12";
import { ChemistryChapter13 } from "@/components/ChemistryChapter13";
import { ChemistryChapter14 } from "@/components/ChemistryChapter14";
import { ChemistryChapter15 } from "@/components/ChemistryChapter15";
import { ChemistryChapter16 } from "@/components/ChemistryChapter16";
import { ChemistryChapter17 } from "@/components/ChemistryChapter17";
import { ChemistryChapter18 } from "@/components/ChemistryChapter18";
import { ChemistryChapter19 } from "@/components/ChemistryChapter19";
import { ChemistryChapter20 } from "@/components/ChemistryChapter20";
import { ChemistryChapter21 } from "@/components/ChemistryChapter21";
import { ChemistryChapter22 } from "@/components/ChemistryChapter22";
import { ChemistryChapter23 } from "@/components/ChemistryChapter23";
import { ChemistryChapter24 } from "@/components/ChemistryChapter24";
import { ChemistryChapter25 } from "@/components/ChemistryChapter25";
import { ChemistryChapter26 } from "@/components/ChemistryChapter26";
import { ChemistryChapter27 } from "@/components/ChemistryChapter27";
import { ChemistryChapter28 } from "@/components/ChemistryChapter28";
import { ChemistryChapter29 } from "@/components/ChemistryChapter29";
import { ChemistryChapter30 } from "@/components/ChemistryChapter30";
import { ChemistryChapter31 } from "@/components/ChemistryChapter31";
import { ChemistryChapter32 } from "@/components/ChemistryChapter32";
import { ChemistryChapter33 } from "@/components/ChemistryChapter33";
import { ChemistryChapter34 } from "@/components/ChemistryChapter34";
import { ChemistryChapter35 } from "@/components/ChemistryChapter35";
import { ChemistryChapter36 } from "@/components/ChemistryChapter36";
import { ChemistryChapter37 } from "@/components/ChemistryChapter37";
import { ChemistryChapter38 } from "@/components/ChemistryChapter38";
import { ChemistryChapter39 } from "@/components/ChemistryChapter39";
import { ChemistryChapter40 } from "@/components/ChemistryChapter40";
import { ChemistryChapter41 } from "@/components/ChemistryChapter41";
import { ChemistryChapter42 } from "@/components/ChemistryChapter42";
import { ChemistryChapter43 } from "@/components/ChemistryChapter43";
import { ChemistryChapter44 } from "@/components/ChemistryChapter44";
import { ChemistryChapter45 } from "@/components/ChemistryChapter45";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, TestTubes } from "lucide-react";

const chapters = [
  { id: 1, title: "Some Basic Concepts of Chemistry", status: "available", questions: 60 },
  { id: 2, title: "Structure of Atom", status: "available", questions: 45 },
  { id: 3, title: "Classification of Elements & Periodicity", status: "available", questions: 50 },
  { id: 4, title: "Chemical Bonding & Molecular Structure", status: "available", questions: 55 },
  { id: 5, title: "States of Matter - Gases & Liquids", status: "available", questions: 50 },
  { id: 6, title: "Thermodynamics", status: "available", questions: 60 },
  { id: 7, title: "Equilibrium", status: "available", questions: 55 },
  { id: 8, title: "Redox Reactions", status: "available", questions: 55 },
  { id: 45, title: "The Solid State", label: "Class XII Chapter 1: The Solid State", status: "available", questions: 50 },
  { id: 9, title: "Solutions", status: "available", questions: 60 },
  { id: 10, title: "Electrochemistry", status: "available", questions: 55 },
  { id: 11, title: "Chemical Kinetics", status: "available", questions: 55 },
  { id: 12, title: "Surface Chemistry", status: "available", questions: 50 },
  { id: 13, title: "Hydrogen", status: "available", questions: 45 },
  { id: 14, title: "s-Block Elements", status: "available", questions: 55 },
  { id: 15, title: "p-Block Elements", status: "available", questions: 65 },
  { id: 16, title: "d- and f-Block Elements", status: "available", questions: 55 },
  { id: 17, title: "Coordination Compounds", status: "available", questions: 60 },
  { id: 18, title: "General Organic Chemistry", status: "available", questions: 60 },
  { id: 19, title: "Hydrocarbons", status: "available", questions: 60 },
  { id: 20, title: "Haloalkanes and Haloarenes", status: "available", questions: 60 },
  { id: 21, title: "Alcohols, Phenols and Ethers", status: "available", questions: 60 },
  { id: 22, title: "Aldehydes, Ketones and Carboxylic Acids", status: "available", questions: 60 },
  { id: 23, title: "Amines", status: "available", questions: 60 },
  { id: 24, title: "Biomolecules", status: "available", questions: 60 },
  { id: 25, title: "Polymers", status: "available", questions: 60 },
  { id: 26, title: "Chemistry in Everyday Life", status: "available", questions: 60 },
  { id: 27, title: "Environmental Chemistry", status: "available", questions: 60 },
  { id: 28, title: "Comprehensive Revision & Mixed Practice", status: "available", questions: 60 },
  { id: 29, title: "Practical Chemistry & Lab Techniques", status: "available", questions: 60 },
  { id: 30, title: "Final Revision & Exam Strategy", status: "available", questions: 60 },
  { id: 31, title: "Advanced Problem Solving", status: "available", questions: 15 },
  { id: 32, title: "Full-Length Mock Test", status: "available", questions: 45 },
  { id: 33, title: "Topic-Wise Mastery Tests", status: "available", questions: 90 },
  { id: 34, title: "Last-Minute Quick Revision", status: "available", questions: 0 },
  { id: 35, title: "Error Analysis & Common Pitfalls", status: "available", questions: 0 },
  { id: 36, title: "Final Success Blueprint", status: "available", questions: 0 },
  { id: 37, title: "Advanced Numerical Problem Solving", status: "available", questions: 20 },
  { id: 38, title: "Revision Mind Maps & Quick Reference", status: "available", questions: 0 },
  { id: 39, title: "PYQ Analysis & Trends", status: "available", questions: 0 },
  { id: 40, title: "Final Countdown Strategy", status: "available", questions: 0 },
  { id: 41, title: "Rapid Fire Revision Capsules", status: "available", questions: 0 },
  { id: 42, title: "Final Mock Test & Performance Analysis", status: "available", questions: 15 },
  { id: 43, title: "Ultimate Speed Strategies", status: "available", questions: 0 },
  { id: 44, title: "Exam Day Mastery", status: "available", questions: 0 },
];

export default function ChemistryContent() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  if (selectedChapter === 1) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter1 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 2) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter2 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 3) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter3 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 4) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter4 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 5) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter5 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 6) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter6 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 7) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter7 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 8) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter8 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 45) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter45 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 9) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter9 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 10) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter10 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 11) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter11 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 12) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter12 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 13) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter13 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 14) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter14 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 15) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter15 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 16) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter16 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 17) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter17 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 18) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter18 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 19) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter19 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 20) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter20 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 21) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter21 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 22) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter22 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 23) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter23 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 24) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter24 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 25) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter25 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 26) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter26 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 27) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter27 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 28) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter28 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 29) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter29 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 30) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter30 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 31) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter31 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 32) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter32 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 33) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter33 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 34) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter34 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 35) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter35 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 36) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter36 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 37) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter37 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 38) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter38 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 39) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter39 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 40) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter40 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 41) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter41 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 42) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter42 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 43) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter43 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 44) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <ChemistryChapter44 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <TestTubes className="h-10 w-10 text-purple-500" />
              <h1 className="text-4xl font-bold">Chemistry - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""
                  }`}
                onClick={() => chapter.status === "available" && setSelectedChapter(chapter.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <TestTubes className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            {chapter.label ?? `Chapter ${chapter.id}: ${chapter.title}`}
                          </h3>
                          {chapter.status === "available" && (
                            <Badge variant="secondary">Available</Badge>
                          )}
                          {chapter.status === "coming-soon" && (
                            <Badge variant="outline">Coming Soon</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {chapter.questions > 0
                            ? `${chapter.questions} practice questions available`
                            : "Content being prepared"
                          }
                        </p>
                      </div>
                    </div>
                    {chapter.status === "available" && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
