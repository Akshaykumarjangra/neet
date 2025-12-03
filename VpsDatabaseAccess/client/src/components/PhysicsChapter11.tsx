
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoelectricEffect from '@/visuals/d3/PhotoelectricEffect';
import ComptonEffect from '@/visuals/d3/ComptonEffect';
import AtomicSpectrum from '@/visuals/three/AtomicSpectrum';
import CompoundMicroscope from '@/visuals/three/CompoundMicroscope';
import LogicGates from '@/visuals/d3/LogicGates';
import PNJunction from '@/visuals/three/PNJunction';
import MetreBridge from '@/visuals/phet/MetreBridge';
import ScrewGauge from '@/visuals/jsx/ScrewGauge';
import CollisionLab from '@/visuals/matter/CollisionLab';
import ResonanceTube from '@/visuals/d3/ResonanceTube';

export function PhysicsChapter11() {
  // Fetch questions from database for Thermodynamics (topicId: 21)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '21'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=21');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className='container mx-auto p-6 space-y-8'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>Chapter 11: Dual Nature of Radiation & Matter</h1>
        <p className='text-muted-foreground'>
          Interactive visualizations covering photoelectric effect, matter waves, and related topics
        </p>
      </div>
      
      <Tabs defaultValue="photoelectric" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="photoelectric">Photoelectric Effect</TabsTrigger>
          <TabsTrigger value="compton">Compton Effect</TabsTrigger>
          <TabsTrigger value="spectrum">Atomic Spectrum</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
        </TabsList>

        <TabsContent value="photoelectric" className="space-y-8">
          <PhotoelectricEffect />
        </TabsContent>

        <TabsContent value="compton" className="space-y-8">
          <ComptonEffect />
        </TabsContent>

        <TabsContent value="spectrum" className="space-y-8">
          <AtomicSpectrum />
        </TabsContent>

        <TabsContent value="devices" className="space-y-8">
          <div className='grid grid-cols-1 gap-8'>
            <CompoundMicroscope />
            <LogicGates />
            <PNJunction />
            <MetreBridge />
          </div>
        </TabsContent>

        <TabsContent value="fundamentals" className="space-y-8">
          <div className='grid grid-cols-1 gap-8'>
            <ScrewGauge />
            <CollisionLab />
            <ResonanceTube />
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold">NEET Key Concepts - Chapter 11</h2>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">Photoelectric Effect</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Einstein's equation: KE(max) = hf - φ</li>
              <li>Stopping potential: eV₀ = KE(max)</li>
              <li>Threshold frequency: f₀ = φ/h</li>
              <li>Intensity affects number of electrons, not their KE</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">De Broglie Wavelength</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>λ = h/p = h/(mv)</li>
              <li>Wave-particle duality applies to all matter</li>
              <li>Davisson-Germer experiment confirmed matter waves</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Compton Effect</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Δλ = (h/m_e·c)(1 - cos θ)</li>
              <li>Compton wavelength: λ_c = 2.43 pm</li>
              <li>Proves particle nature of electromagnetic radiation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Atomic Spectra</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Rydberg formula: 1/λ = R(1/n₁² - 1/n₂²)</li>
              <li>Energy levels: E_n = -13.6/n² eV (hydrogen)</li>
              <li>Balmer series (visible), Lyman (UV), Paschen (IR)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
