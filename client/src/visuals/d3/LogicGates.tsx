
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR';

export default function LogicGates() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');
  const [announcement, setAnnouncement] = useState("");

  const width = 800;
  const height = 500;

  const calculateOutput = (gate: GateType, a: boolean, b: boolean): boolean => {
    switch (gate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'NOT': return !a;
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      case 'XOR': return a !== b;
    }
  };

  const output = calculateOutput(selectedGate, inputA, inputB);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Gate symbol coordinates
    const gateX = 400;
    const gateY = 250;
    const gateWidth = 100;
    const gateHeight = 80;

    // Draw gate based on type
    const drawGate = () => {
      const gateGroup = svg.append("g");

      switch (selectedGate) {
        case 'AND':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 50} ${gateY - 40} L ${gateX} ${gateY - 40} A 40 40 0 0 1 ${gateX} ${gateY + 40} L ${gateX - 50} ${gateY + 40} Z`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;

        case 'OR':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 50} ${gateY - 40} Q ${gateX - 20} ${gateY} ${gateX - 50} ${gateY + 40} Q ${gateX} ${gateY + 20} ${gateX + 50} ${gateY} Q ${gateX} ${gateY - 20} ${gateX - 50} ${gateY - 40}`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;

        case 'NOT':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 40} ${gateY - 30} L ${gateX + 30} ${gateY} L ${gateX - 40} ${gateY + 30} Z`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          gateGroup.append("circle")
            .attr("cx", gateX + 40)
            .attr("cy", gateY)
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;

        case 'NAND':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 50} ${gateY - 40} L ${gateX} ${gateY - 40} A 40 40 0 0 1 ${gateX} ${gateY + 40} L ${gateX - 50} ${gateY + 40} Z`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          gateGroup.append("circle")
            .attr("cx", gateX + 10)
            .attr("cy", gateY)
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;

        case 'NOR':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 50} ${gateY - 40} Q ${gateX - 20} ${gateY} ${gateX - 50} ${gateY + 40} Q ${gateX} ${gateY + 20} ${gateX + 40} ${gateY} Q ${gateX} ${gateY - 20} ${gateX - 50} ${gateY - 40}`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          gateGroup.append("circle")
            .attr("cx", gateX + 50)
            .attr("cy", gateY)
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;

        case 'XOR':
          gateGroup.append("path")
            .attr("d", `M ${gateX - 60} ${gateY - 40} Q ${gateX - 30} ${gateY} ${gateX - 60} ${gateY + 40}`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2);
          gateGroup.append("path")
            .attr("d", `M ${gateX - 50} ${gateY - 40} Q ${gateX - 20} ${gateY} ${gateX - 50} ${gateY + 40} Q ${gateX} ${gateY + 20} ${gateX + 50} ${gateY} Q ${gateX} ${gateY - 20} ${gateX - 50} ${gateY - 40}`)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 3);
          break;
      }

      // Gate label
      svg.append("text")
        .attr("x", gateX)
        .attr("y", gateY + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .attr("fill", "#3b82f6")
        .text(selectedGate);
    };

    drawGate();

    // Input A
    const inputAX = 150;
    const inputAY = selectedGate === 'NOT' ? gateY : gateY - 25;

    svg.append("circle")
      .attr("cx", inputAX)
      .attr("cy", inputAY)
      .attr("r", 20)
      .attr("fill", inputA ? "#10b981" : "#ef4444")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", () => {
        setInputA(!inputA);
        setAnnouncement(`Input A is now ${!inputA ? '1' : '0'}`);
      });

    svg.append("text")
      .attr("x", inputAX)
      .attr("y", inputAY + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .attr("fill", "#fff")
      .style("pointer-events", "none")
      .text(inputA ? "1" : "0");

    svg.append("text")
      .attr("x", inputAX)
      .attr("y", inputAY - 35)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("fill", "#000")
      .text("A");

    // Input B (not for NOT gate)
    if (selectedGate !== 'NOT') {
      const inputBY = gateY + 25;

      svg.append("circle")
        .attr("cx", inputAX)
        .attr("cy", inputBY)
        .attr("r", 20)
        .attr("fill", inputB ? "#10b981" : "#ef4444")
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", () => {
          setInputB(!inputB);
          setAnnouncement(`Input B is now ${!inputB ? '1' : '0'}`);
        });

      svg.append("text")
        .attr("x", inputAX)
        .attr("y", inputBY + 5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .attr("fill", "#fff")
        .style("pointer-events", "none")
        .text(inputB ? "1" : "0");

      svg.append("text")
        .attr("x", inputAX)
        .attr("y", inputBY + 45)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("fill", "#000")
        .text("B");

      // Wire B
      svg.append("line")
        .attr("x1", inputAX + 20)
        .attr("y1", inputBY)
        .attr("x2", gateX - 50)
        .attr("y2", gateY + 25)
        .attr("stroke", inputB ? "#10b981" : "#999")
        .attr("stroke-width", 3);
    }

    // Wire A
    svg.append("line")
      .attr("x1", inputAX + 20)
      .attr("y1", inputAY)
      .attr("x2", gateX - 50)
      .attr("y2", selectedGate === 'NOT' ? gateY : gateY - 25)
      .attr("stroke", inputA ? "#10b981" : "#999")
      .attr("stroke-width", 3);

    // Output
    const outputX = 650;
    const outputY = gateY;

    svg.append("line")
      .attr("x1", selectedGate === 'NOT' ? gateX + 48 : gateX + 50)
      .attr("y1", gateY)
      .attr("x2", outputX - 20)
      .attr("y2", outputY)
      .attr("stroke", output ? "#10b981" : "#999")
      .attr("stroke-width", 3);

    svg.append("circle")
      .attr("cx", outputX)
      .attr("cy", outputY)
      .attr("r", 20)
      .attr("fill", output ? "#10b981" : "#ef4444")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    svg.append("text")
      .attr("x", outputX)
      .attr("y", outputY + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .attr("fill", "#fff")
      .text(output ? "1" : "0");

    svg.append("text")
      .attr("x", outputX)
      .attr("y", outputY - 35)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("fill", "#000")
      .text("Y");

  }, [inputA, inputB, selectedGate, output]);

  const handleReset = () => {
    setInputA(false);
    setInputB(false);
    setSelectedGate('AND');
    setAnnouncement("Reset to default");
  };

  const gates: GateType[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Logic Gates
          </span>
          <Badge variant="outline">Physics - Electronics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive digital logic gate simulator
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {gates.map((gate) => (
            <Button
              key={gate}
              variant={selectedGate === gate ? "default" : "outline"}
              onClick={() => {
                setSelectedGate(gate);
                setAnnouncement(`Selected ${gate} gate`);
              }}
            >
              {gate}
            </Button>
          ))}
        </div>

        <svg ref={svgRef} width={width} height={height} className="border rounded-lg bg-white" />

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Truth Table for {selectedGate}</h4>
          {selectedGate === 'NOT' ? (
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="p-2">A</th>
                  <th className="p-2">Y</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0</td>
                  <td className="p-2">{calculateOutput(selectedGate, false, false) ? '1' : '0'}</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">{calculateOutput(selectedGate, true, false) ? '1' : '0'}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="p-2">A</th>
                  <th className="p-2">B</th>
                  <th className="p-2">Y</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0</td>
                  <td className="p-2">0</td>
                  <td className="p-2">{calculateOutput(selectedGate, false, false) ? '1' : '0'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0</td>
                  <td className="p-2">1</td>
                  <td className="p-2">{calculateOutput(selectedGate, false, true) ? '1' : '0'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1</td>
                  <td className="p-2">0</td>
                  <td className="p-2">{calculateOutput(selectedGate, true, false) ? '1' : '0'}</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">1</td>
                  <td className="p-2">{calculateOutput(selectedGate, true, true) ? '1' : '0'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Logic Gates:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• AND: Y = A·B (both inputs must be 1)</li>
            <li>• OR: Y = A+B (either input can be 1)</li>
            <li>• NOT: Y = Ā (inverts input)</li>
            <li>• NAND: Y = (A·B)̄ (NOT AND)</li>
            <li>• NOR: Y = (A+B)̄ (NOT OR)</li>
            <li>• XOR: Y = A⊕B (exclusive OR)</li>
            <li>• NAND and NOR are universal gates</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
