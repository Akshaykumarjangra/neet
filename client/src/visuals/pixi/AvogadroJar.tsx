
import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import VisualLoader from '../shared/VisualLoader';
import HindiToggle from '../shared/HindiToggle';
import A11yAnnouncer from '../shared/A11yAnnouncer';

export default function AvogadroJar() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [moleculeCount, setMoleculeCount] = useState([100]);
  const [moles, setMoles] = useState(0);
  const [hindi, setHindi] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!canvasRef.current) return;

    let app: PIXI.Application | null = null;
    let molecules: PIXI.Graphics[] = [];
    let countText: PIXI.Text | null = null;
    let molesText: PIXI.Text | null = null;

    const initPixi = async () => {
      try {
        app = new PIXI.Application();
        await app.init({
          width: canvasRef.current!.clientWidth,
          height: 400,
          background: 0xf0f4f8,
          antialias: true,
          preference: 'webgl',
        });

        if (!canvasRef.current) return;
        canvasRef.current.appendChild(app.canvas);

        // Jar container
        const jar = new PIXI.Graphics();
        jar.rect(50, 50, 300, 300);
        jar.stroke({ width: 4, color: 0x3b82f6 });
        jar.rect(50, 50, 300, 20);
        jar.fill(0x3b82f6);
        app.stage.addChild(jar);

        // Create molecules
        const updateMolecules = (count: number) => {
          if (!app) return;

          molecules.forEach(m => m.destroy());
          molecules.length = 0;

          for (let i = 0; i < Math.min(count, 500); i++) {
            const molecule = new PIXI.Graphics();
            molecule.circle(0, 0, 3);
            molecule.fill(0xff6b6b);

            molecule.x = 60 + Math.random() * 280;
            molecule.y = 70 + Math.random() * 270;

            molecules.push(molecule);
            app.stage.addChild(molecule);
          }

          // Calculate moles
          const molesValue = count / 6.022e23;
          setMoles(molesValue);

          // Update text labels
          if (countText) {
            countText.text = `Molecules: ${count}`;
          }
          if (molesText) {
            molesText.text = `Moles: ${molesValue.toExponential(2)}`;
          }
        };

        updateMolecules(moleculeCount[0]);

        // Animation
        app.ticker.add(() => {
          molecules.forEach(molecule => {
            molecule.y += Math.random() * 0.5 - 0.25;
            molecule.x += Math.random() * 0.5 - 0.25;

            if (molecule.y < 70) molecule.y = 330;
            if (molecule.y > 330) molecule.y = 70;
            if (molecule.x < 60) molecule.x = 330;
            if (molecule.x > 330) molecule.x = 60;
          });
        });

        // Labels
        countText = new PIXI.Text({
          text: `Molecules: ${moleculeCount[0]}`,
          style: { fontSize: 16, fill: 0x000000 }
        });
        countText.x = 400;
        countText.y = 100;
        app.stage.addChild(countText);

        molesText = new PIXI.Text({
          text: `Moles: ${(moleculeCount[0] / 6.022e23).toExponential(2)}`,
          style: { fontSize: 16, fill: 0x000000 }
        });
        molesText.x = 400;
        molesText.y = 130;
        app.stage.addChild(molesText);

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize PixiJS:', error);
        setLoading(false);
      }
    };

    initPixi();

    return () => {
      molecules.forEach(m => m.destroy());
      if (app) {
        app.destroy(true, { children: true, texture: true });
      }
    };
  }, [moleculeCount]);

  const handleMoleculeChange = (value: number[]) => {
    setMoleculeCount(value);
    setAnnouncement(`Molecule count set to ${value[0]}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'आवोगाद्रो जार' : "Avogadro's Jar"}
              <Badge variant="secondary">PixiJS</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'अणुओं को गिनें और मोल की गणना करें' : 'Count molecules and calculate moles'}
            </p>
          </div>
          <HindiToggle isHindi={hindi} onToggle={() => setHindi((prev) => !prev)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && <VisualLoader />}
        <div ref={canvasRef} className="w-full rounded-lg overflow-hidden border" style={{ height: 400 }} />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {hindi ? 'अणु संख्या: ' : 'Molecule Count: '}
            {moleculeCount[0].toLocaleString()}
          </label>
          <Slider
            value={moleculeCount}
            onValueChange={handleMoleculeChange}
            min={10}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted p-3 rounded">
            <p className="text-2xl font-bold">{moleculeCount[0].toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{hindi ? 'अणु' : 'Molecules'}</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <p className="text-2xl font-bold">{moles.toExponential(2)}</p>
            <p className="text-sm text-muted-foreground">{hindi ? 'मोल' : 'Moles'}</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Mole Concept:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• 1 mole = 6.022 × 10²³ entities (Avogadro's number)</li>
            <li>• Molar mass = mass of 1 mole of substance</li>
            <li>• n = mass/molar mass = N/N_A</li>
            <li>• At STP: 1 mole gas = 22.4 L</li>
            <li>• Molarity: M = moles/volume(L)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
