
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import HindiToggle from '../shared/HindiToggle';
import A11yAnnouncer from '../shared/A11yAnnouncer';

export default function PHCurve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [volume, setVolume] = useState([0]);
  const [hindi, setHindi] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Generate titration curve data (Strong Acid + Strong Base)
    const data = [];
    for (let v = 0; v <= 50; v += 0.5) {
      let pH;
      if (v < 25) {
        // Before equivalence point
        const remaining = 0.1 * (25 - v) / (25 + v);
        pH = -Math.log10(remaining);
      } else if (v === 25) {
        pH = 7; // Equivalence point
      } else {
        // After equivalence point
        const excess = 0.1 * (v - 25) / (25 + v);
        pH = 14 + Math.log10(excess);
      }
      data.push({ volume: v, pH: Math.max(0, Math.min(14, pH)) });
    }

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, 50])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, 14])
      .range([height - margin.bottom, margin.top]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Volume of Base Added (mL)');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('pH');

    // Draw curve
    const line = d3.line<{ volume: number; pH: number }>()
      .x(d => xScale(d.volume))
      .y(d => yScale(d.pH))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Equivalence point
    svg.append('circle')
      .attr('cx', xScale(25))
      .attr('cy', yScale(7))
      .attr('r', 5)
      .attr('fill', '#ef4444');

    svg.append('text')
      .attr('x', xScale(25) + 10)
      .attr('y', yScale(7))
      .attr('fill', '#ef4444')
      .attr('font-size', '12px')
      .text('Equivalence Point');

    // Current position marker
    const currentData = data.find(d => Math.abs(d.volume - volume[0]) < 0.5);
    if (currentData) {
      svg.append('circle')
        .attr('cx', xScale(currentData.volume))
        .attr('cy', yScale(currentData.pH))
        .attr('r', 6)
        .attr('fill', '#10b981')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      svg.append('text')
        .attr('x', xScale(currentData.volume))
        .attr('y', yScale(currentData.pH) - 15)
        .attr('fill', '#10b981')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .text(`pH = ${currentData.pH.toFixed(2)}`);
    }

    // pH regions
    const regions = [
      { y: 0, height: 7, color: '#fecaca', label: 'Acidic' },
      { y: 7, height: 7, color: '#bfdbfe', label: 'Basic' }
    ];

    regions.forEach(region => {
      svg.append('rect')
        .attr('x', margin.left)
        .attr('y', yScale(region.y + region.height))
        .attr('width', width - margin.left - margin.right)
        .attr('height', yScale(region.y) - yScale(region.y + region.height))
        .attr('fill', region.color)
        .attr('opacity', 0.1);
    });

  }, [volume]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    setAnnouncement(`Volume set to ${value[0]} mL`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'अनुमापन वक्र' : 'pH Titration Curve'}
              <Badge variant="secondary">D3.js</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'तीव्र अम्ल बनाम तीव्र क्षार' : 'Strong Acid vs Strong Base Titration'}
            </p>
          </div>
          <HindiToggle isHindi={hindi} onToggle={() => setHindi((prev) => !prev)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} className="w-full border rounded-lg" />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Volume of Base Added: {volume[0]} mL
          </label>
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            min={0}
            max={50}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Acid-Base Titration:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Equivalence point: moles of acid = moles of base</li>
            <li>• For strong acid + strong base: pH = 7 at equivalence</li>
            <li>• Buffer region: before equivalence point</li>
            <li>• Indicators: chosen based on pH at equivalence</li>
            <li>• Phenolphthalein: pH range 8.3-10 (colorless to pink)</li>
            <li>• Methyl orange: pH range 3.1-4.4 (red to yellow)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
