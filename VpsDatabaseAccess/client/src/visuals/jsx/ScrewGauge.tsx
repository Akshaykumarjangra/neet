
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Ruler, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function ScrewGauge() {
  const [rotation, setRotation] = useState([0]);
  const [objectDiameter, setObjectDiameter] = useState([2.5]);
  const [announcement, setAnnouncement] = useState("");

  const pitch = 0.5; // mm per rotation
  const divisions = 50;
  const leastCount = pitch / divisions; // 0.01 mm

  const mainScaleReading = Math.floor(rotation[0]) * pitch;
  const circularScaleReading = (rotation[0] % 1) * divisions;
  const totalReading = mainScaleReading + (circularScaleReading * leastCount);

  const reset = () => {
    setRotation([0]);
    setObjectDiameter([2.5]);
    setAnnouncement("Reset to default");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Screw Gauge Simulator
          </span>
          <Badge variant="outline">Physics - Measurement</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Measure small diameters with precision
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 border rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {/* Main Scale */}
          <div className="absolute top-20 left-10 right-10 h-12 bg-gray-300 dark:bg-gray-700 rounded border-2 border-gray-400">
            <div className="flex justify-between items-center h-full px-2">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-black dark:bg-white" />
                  <span className="text-xs mt-1">{num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Scale */}
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
            <div 
              className="w-32 h-32 rounded-full border-4 border-gray-400 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 relative"
              style={{ transform: `rotate(${rotation[0] * 360}deg)` }}
            >
              {Array.from({ length: divisions }).map((_, i) => {
                const angle = (i * 360) / divisions;
                const isMainDivision = i % 5 === 0;
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 origin-bottom"
                    style={{
                      height: '50%',
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <div 
                      className={`w-0.5 ${isMainDivision ? 'h-3 bg-black dark:bg-white' : 'h-2 bg-gray-600 dark:bg-gray-400'} mx-auto`} 
                    />
                    {isMainDivision && (
                      <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs">
                        {i}
                      </span>
                    )}
                  </div>
                );
              })}
              {/* Reference line */}
              <div className="absolute top-0 left-1/2 w-1 h-16 bg-red-500 transform -translate-x-1/2" />
            </div>
          </div>

          {/* Object being measured */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div 
              className="h-8 bg-blue-500 rounded"
              style={{ width: `${objectDiameter[0] * 20}px` }}
            />
            <p className="text-xs text-center mt-1">Object</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Rotate Screw: {rotation[0].toFixed(2)} rotations
            </label>
            <Slider
              value={rotation}
              onValueChange={(val) => {
                setRotation(val);
                setAnnouncement(`Rotation: ${val[0].toFixed(2)} turns`);
              }}
              min={0}
              max={5}
              step={0.02}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Object Diameter: {objectDiameter[0]} mm
            </label>
            <Slider
              value={objectDiameter}
              onValueChange={(val) => {
                setObjectDiameter(val);
                setRotation([val[0] / pitch]);
                setAnnouncement(`Object diameter: ${val[0]} mm`);
              }}
              min={0.5}
              max={5}
              step={0.01}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Main Scale Reading</p>
              <p className="text-lg font-bold">{mainScaleReading.toFixed(2)} mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Circular Scale</p>
              <p className="text-lg font-bold">{circularScaleReading.toFixed(0)} div</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Total Reading</p>
              <p className="text-2xl font-bold text-green-600">{totalReading.toFixed(3)} mm</p>
            </div>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Screw Gauge:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Pitch = Distance moved / No. of rotations</li>
            <li>• Least Count = Pitch / No. of divisions</li>
            <li>• Reading = MSR + (CSR × LC)</li>
            <li>• Zero error = CSR when faces touch</li>
            <li>• Positive error: subtract from reading</li>
            <li>• Negative error: add to reading</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
