
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/visuals/hooks/usePrefersMotion";

interface D3ChartBaseProps {
  title: string;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  children?: React.ReactNode;
}

export default function D3ChartBase({
  title,
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
}: D3ChartBaseProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();

    // Create main group with margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add grid lines
    const xGrid = g
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`);

    const yGrid = g.append("g").attr("class", "grid");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [innerWidth, innerHeight, margin]);

  return (
    <Card className="visual-canvas">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto"
          style={{ maxWidth: "100%" }}
        />
      </CardContent>
    </Card>
  );
}
