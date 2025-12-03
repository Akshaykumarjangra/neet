
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

declare global {
  interface Window {
    JXG: any;
  }
}

export default function VernierCaliper() {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardInstanceRef = useRef<any>(null);
  const boardId = useRef(`jxgboard-${Math.random().toString(36).substr(2, 9)}`);
  const [observedReading, setObservedReading] = useState(0);
  const [mainScaleReading, setMainScaleReading] = useState(0);
  const [vernierCoincidence, setVernierCoincidence] = useState(0);
  const [zeroError, setZeroError] = useState(0.02);
  const [announcement, setAnnouncement] = useState("");
  const [isReady, setIsReady] = useState(false);

  // Load JSXGraph script
  useEffect(() => {
    console.log('[VernierCaliper] useEffect triggered', {
      loaded: !!window.JXG,
      hasRef: !!boardRef.current,
      hasJXG: typeof window.JXG !== 'undefined'
    });

    if (window.JXG) {
      console.log('[VernierCaliper] JSXGraph already loaded');
      setIsReady(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="jsxgraphcore"]');
    if (existingScript) {
      console.log('[VernierCaliper] Script exists, waiting for load...');
      const checkInterval = setInterval(() => {
        if (window.JXG) {
          console.log('[VernierCaliper] JSXGraph loaded from existing script');
          clearInterval(checkInterval);
          setIsReady(true);
        }
      }, 100);
      
      return () => clearInterval(checkInterval);
    }

    console.log('[VernierCaliper] Loading JSXGraph script...');
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/jsxgraph@1.4.6/distrib/jsxgraphcore.js";
    script.async = true;
    script.onload = () => {
      console.log('[VernierCaliper] Script loaded successfully');
      setIsReady(true);
    };
    script.onerror = (error) => {
      console.error('[VernierCaliper] Script failed to load:', error);
    };
    
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        script.remove();
      }
    };
  }, []);

  // Initialize board
  useEffect(() => {
    if (!isReady || !boardRef.current || !window.JXG) {
      return;
    }

    if (boardInstanceRef.current) {
      try {
        window.JXG.JSXGraph.freeBoard(boardInstanceRef.current);
      } catch (e) {
        console.error('Board cleanup error:', e);
      }
      boardInstanceRef.current = null;
    }

    try {
      console.log('[VernierCaliper] Initializing board with ID:', boardId.current);
      const board = window.JXG.JSXGraph.initBoard(boardId.current, {
        boundingbox: [-2, 3, 12, -3],
        axis: false,
        showCopyright: false,
        showNavigation: false,
      });
      
      boardInstanceRef.current = board;

      // Main scale (0-10 cm)
      board.create('segment', [[0, 0], [10, 0]], {
        strokeColor: '#1e293b',
        strokeWidth: 3,
      });

      // Main scale markings
      for (let i = 0; i <= 10; i++) {
        board.create('segment', [[i, 0], [i, -0.3]], {
          strokeColor: '#1e293b',
          strokeWidth: 2,
        });
        board.create('text', [i, -0.6, i.toString()], {
          fontSize: 12,
          fixed: true,
        });
      }

      // Vernier scale (draggable)
      const vernierPosition = board.create('point', [zeroError, -1], {
        name: '',
        size: 0,
        fixed: false,
      });

      board.create('segment', [
        [() => vernierPosition.X(), -1],
        [() => vernierPosition.X() + 0.9, -1]
      ], {
        strokeColor: '#3b82f6',
        strokeWidth: 3,
      });

      // Vernier markings (10 divisions = 0.9 cm)
      for (let i = 0; i <= 10; i++) {
        const x = () => vernierPosition.X() + (i * 0.09);
        board.create('segment', [[x, -1], [x, -0.7]], {
          strokeColor: '#3b82f6',
          strokeWidth: 1.5,
        });
      }

      // Update measurement function
      const updateMeasurement = () => {
        const position = vernierPosition.X();
        const msr = Math.floor(position * 10) / 10;
        const fraction = position - msr;
        const vcDivisions = Math.round(fraction / 0.01);
        const vc = vcDivisions * 0.01;
        const observed = msr + vc;
        const corrected = observed - zeroError;
        
        setMainScaleReading(msr);
        setVernierCoincidence(vcDivisions);
        setObservedReading(Math.max(0, observed));
        setAnnouncement(`Corrected measurement: ${Math.max(0, corrected).toFixed(2)} cm`);
      };

      vernierPosition.on('drag', updateMeasurement);
      updateMeasurement();
    } catch (error) {
      console.error('Board initialization error:', error);
    }

    return () => {
      if (boardInstanceRef.current && window.JXG) {
        try {
          window.JXG.JSXGraph.freeBoard(boardInstanceRef.current);
        } catch (e) {
          console.error('Cleanup error:', e);
        }
        boardInstanceRef.current = null;
      }
    };
  }, [isReady, zeroError]);

  if (!isReady) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Vernier Caliper Simulator</span>
            <Badge variant="outline">Loading...</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Loading visualization...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vernier Caliper Simulator</span>
          <Badge variant="outline">Physics - Measurement</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag the blue vernier scale to measure. Least count = 0.01 cm
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          id={boardId.current}
          ref={boardRef} 
          className="visual-canvas jxgbox"
          style={{ width: '100%', height: '300px' }}
          data-testid="canvas-vernier-caliper"
        />
        
        <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Main Scale Reading (MSR)</p>
              <p className="text-2xl font-bold" data-testid="text-main-scale">{mainScaleReading.toFixed(1)} cm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vernier Coincidence (VC)</p>
              <p className="text-2xl font-bold" data-testid="text-vernier-coincidence">{vernierCoincidence}</p>
            </div>
          </div>
          <div className="border-t pt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Observed Reading</p>
              <p className="text-lg font-semibold" data-testid="text-observed-reading">
                {mainScaleReading.toFixed(1)} + ({vernierCoincidence} × 0.01) = {observedReading.toFixed(2)} cm
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Zero Error</p>
              <p className="text-lg font-bold text-destructive" data-testid="text-zero-error">
                {zeroError > 0 ? '+' : ''}{zeroError.toFixed(2)} cm
              </p>
            </div>
          </div>
          <div className="border-t pt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Corrected Reading</p>
            <p className="text-3xl font-bold text-primary" data-testid="text-total-reading">
              {observedReading.toFixed(2)} - ({zeroError > 0 ? '+' : ''}{zeroError.toFixed(2)}) = {Math.max(0, observedReading - zeroError).toFixed(2)} cm
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Zero Error Adjustment:</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setZeroError(0)}
              data-testid="button-reset-zero-error"
            >
              Reset to 0
            </Button>
          </div>
          <Slider
            value={[zeroError * 100]}
            onValueChange={(val) => setZeroError(val[0] / 100)}
            min={-10}
            max={10}
            step={1}
            className="w-full"
            data-testid="slider-zero-error"
          />
          <p className="text-xs text-muted-foreground text-center">
            Adjust zero error: {zeroError > 0 ? '+' : ''}{zeroError.toFixed(2)} cm
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Quick Facts:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Least Count = 1 MSD - 1 VSD = 0.1 cm - 0.09 cm = 0.01 cm</li>
            <li>• Main Scale Division (MSD) = 0.1 cm</li>
            <li>• 10 Vernier divisions = 9 Main scale divisions</li>
            <li>• Zero Error: Positive when vernier zero is ahead of main scale zero</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
