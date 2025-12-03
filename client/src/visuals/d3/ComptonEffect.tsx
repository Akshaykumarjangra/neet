
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Atom, RotateCcw, Zap } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function ComptonEffect() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [incidentEnergy, setIncidentEnergy] = useState([100]); // keV
  const [scatteringAngle, setScatteringAngle] = useState([90]); // degrees
  const [showScattering, setShowScattering] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 60, bottom: 60, left: 60 };

  // Constants
  const h = 6.626e-34; // Planck's constant (J·s)
  const c = 3e8; // Speed of light (m/s)
  const m_e = 9.109e-31; // Electron rest mass (kg)
  const electronVoltToJoule = 1.602e-19;

  // Convert energy to wavelength
  const E_i = incidentEnergy[0] * 1000 * electronVoltToJoule; // Convert keV to J
  const lambda_i = (h * c) / E_i; // Initial wavelength

  // Compton shift formula: Δλ = (h/m_e*c)(1 - cos θ)
  const theta_rad = (scatteringAngle[0] * Math.PI) / 180;
  const delta_lambda = (h / (m_e * c)) * (1 - Math.cos(theta_rad));
  const lambda_f = lambda_i + delta_lambda;

  // Final photon energy
  const E_f = (h * c) / lambda_f;
  const E_f_keV = E_f / (1000 * electronVoltToJoule);

  // Electron kinetic energy
  const KE_electron = E_i - E_f;
  const KE_electron_keV = KE_electron / (1000 * electronVoltToJoule);

  // Compton wavelength
  const lambda_c = h / (m_e * c);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("class", "text-lg font-semibold fill-current")
      .text("Compton Effect - Photon-Electron Collision");

    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    // Draw electron at rest
    g.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 15)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#1e40af")
      .attr("stroke-width", 2);

    g.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-weight", "bold")
      .text("e⁻");

    g.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("fill", "currentColor")
      .text("Electron at rest");

    // Incident photon
    const photonStartX = centerX - 150;
    const photonStartY = centerY;

    // Wavy line for photon
    const photonPath = d3.path();
    photonPath.moveTo(photonStartX, photonStartY);
    
    for (let x = photonStartX; x < centerX - 20; x += 5) {
      const y = photonStartY + 10 * Math.sin(((x - photonStartX) / 10) * Math.PI);
      photonPath.lineTo(x, y);
    }

    g.append("path")
      .attr("d", photonPath.toString())
      .attr("stroke", "#fbbf24")
      .attr("stroke-width", 3)
      .attr("fill", "none");

    // Arrow for incident photon
    g.append("line")
      .attr("x1", centerX - 30)
      .attr("y1", photonStartY)
      .attr("x2", centerX - 20)
      .attr("y2", photonStartY)
      .attr("stroke", "#fbbf24")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#photon-arrow)");

    // Define arrow marker
    const defs = g.append("defs");
    defs.append("marker")
      .attr("id", "photon-arrow")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 9)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .attr("fill", "#fbbf24");

    g.append("text")
      .attr("x", photonStartX)
      .attr("y", photonStartY - 20)
      .style("font-size", "12px")
      .attr("fill", "#fbbf24")
      .text(`Incident photon: ${incidentEnergy[0]} keV`);

    if (showScattering) {
      // Scattered photon
      const scatteredX = centerX + 100 * Math.cos(theta_rad);
      const scatteredY = centerY - 100 * Math.sin(theta_rad);

      const scatteredPath = d3.path();
      scatteredPath.moveTo(centerX + 20, centerY);
      
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = centerX + 20 + t * (scatteredX - centerX - 20);
        const y = centerY + t * (scatteredY - centerY);
        const wave = 8 * Math.sin(i * Math.PI / 2);
        scatteredPath.lineTo(
          x + wave * Math.sin(theta_rad),
          y + wave * Math.cos(theta_rad)
        );
      }

      g.append("path")
        .attr("d", scatteredPath.toString())
        .attr("stroke", "#f97316")
        .attr("stroke-width", 3)
        .attr("fill", "none");

      g.append("text")
        .attr("x", scatteredX)
        .attr("y", scatteredY - 15)
        .style("font-size", "12px")
        .attr("fill", "#f97316")
        .text(`Scattered: ${E_f_keV.toFixed(2)} keV`);

      // Recoil electron
      const electronAngle = Math.atan2(
        Math.sin(theta_rad),
        1 / Math.tan(theta_rad) - Math.cos(theta_rad)
      );
      const electronX = centerX + 100 * Math.cos(-electronAngle);
      const electronY = centerY + 100 * Math.sin(-electronAngle);

      g.append("line")
        .attr("x1", centerX + 15)
        .attr("y1", centerY)
        .attr("x2", electronX)
        .attr("y2", electronY)
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("marker-end", "url(#electron-arrow)");

      defs.append("marker")
        .attr("id", "electron-arrow")
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("refX", 9)
        .attr("refY", 3)
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 10 3, 0 6")
        .attr("fill", "#3b82f6");

      g.append("text")
        .attr("x", electronX)
        .attr("y", electronY + 30)
        .style("font-size", "12px")
        .attr("fill", "#3b82f6")
        .text(`e⁻: ${KE_electron_keV.toFixed(2)} keV`);

      // Scattering angle arc
      const arcPath = d3.arc()
        .innerRadius(40)
        .outerRadius(40)
        .startAngle(0)
        .endAngle(-theta_rad);

      g.append("path")
        .attr("d", arcPath as any)
        .attr("transform", `translate(${centerX},${centerY})`)
        .attr("fill", "none")
        .attr("stroke", "#10b981")
        .attr("stroke-width", 2);

      g.append("text")
        .attr("x", centerX + 50)
        .attr("y", centerY - 25)
        .style("font-size", "12px")
        .attr("fill", "#10b981")
        .text(`θ = ${scatteringAngle[0]}°`);
    }

  }, [incidentEnergy, scatteringAngle, showScattering, E_f_keV, KE_electron_keV, theta_rad]);

  const handleReset = () => {
    setIncidentEnergy([100]);
    setScatteringAngle([90]);
    setShowScattering(false);
    setAnnouncement("Reset to default values");
  };

  const triggerScattering = () => {
    setShowScattering(true);
    setAnnouncement("Compton scattering triggered");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-yellow-500" />
            Compton Effect
          </span>
          <Badge variant="outline">Physics - Modern Physics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Photon-electron scattering demonstrating particle nature of light
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} width={width} height={height} className="border rounded-lg" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Incident Energy: {incidentEnergy[0]} keV
            </label>
            <Slider
              value={incidentEnergy}
              onValueChange={(val) => {
                setIncidentEnergy(val);
                setShowScattering(false);
                setAnnouncement(`Incident energy: ${val[0]} keV`);
              }}
              min={10}
              max={500}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Scattering Angle: {scatteringAngle[0]}°
            </label>
            <Slider
              value={scatteringAngle}
              onValueChange={(val) => {
                setScatteringAngle(val);
                setAnnouncement(`Scattering angle: ${val[0]} degrees`);
              }}
              min={0}
              max={180}
              step={5}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Wavelength Shift</p>
            <p className="text-lg font-bold text-green-600">
              {(delta_lambda * 1e12).toFixed(3)} pm
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Scattered Photon</p>
            <p className="text-lg font-bold text-orange-600">
              {E_f_keV.toFixed(2)} keV
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Electron KE</p>
            <p className="text-lg font-bold text-blue-600">
              {KE_electron_keV.toFixed(2)} keV
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={triggerScattering} disabled={showScattering} className="flex-1">
            <Zap className="mr-2 h-4 w-4" />
            Trigger Scattering
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Compton Effect:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Δλ = (h/m_e·c)(1 - cos θ)</li>
            <li>• λ_c = h/m_e·c = 2.43 pm (Compton wavelength)</li>
            <li>• Maximum shift at θ = 180° (backscattering)</li>
            <li>• No shift at θ = 0° (forward scattering)</li>
            <li>• Proves particle nature of light (photons)</li>
            <li>• Energy conservation: E_i = E_f + KE_electron</li>
            <li>• Momentum conservation in collision</li>
            <li>• Works with X-rays and gamma rays</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Historical Significance:</p>
            <p className="text-muted-foreground">• Discovered by Arthur Compton (1923)</p>
            <p className="text-muted-foreground">• Nobel Prize in Physics (1927)</p>
            <p className="text-muted-foreground">• Confirmed quantum nature of light</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Applications:</p>
            <p className="text-muted-foreground">• Medical imaging (CT scans)</p>
            <p className="text-muted-foreground">• Radiation therapy</p>
            <p className="text-muted-foreground">• Astrophysics observations</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
