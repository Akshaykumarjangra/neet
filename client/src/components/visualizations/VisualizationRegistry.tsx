import { lazy, Suspense, ComponentType } from "react";

type VisualizationType = 
  | "atom"
  | "molecule" 
  | "cell"
  | "organ"
  | "wave"
  | "circuit"
  | "pendulum"
  | "projectile"
  | "default";

interface VisualizationProps {
  [key: string]: any;
}

const visualizations: Record<VisualizationType, ComponentType<VisualizationProps>> = {
  atom: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400 animate-spin" style={{ animationDuration: "8s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
      </div>
    </div>
  ),
  molecule: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-full bg-red-500" />
      <div className="w-3 h-3 bg-gray-400 rounded-full" />
      <div className="w-12 h-12 rounded-full bg-blue-500" />
    </div>
  ),
  cell: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="relative w-48 h-36 rounded-[60%] bg-gradient-to-br from-green-200 to-green-400 border-4 border-green-600">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-500" />
      </div>
    </div>
  ),
  organ: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="w-24 h-32 bg-gradient-to-b from-red-400 to-red-600 rounded-t-full" />
    </div>
  ),
  wave: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-48">
        <path
          d="M0 50 Q25 20 50 50 T100 50 T150 50 T200 50"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />
      </svg>
    </div>
  ),
  circuit: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="border-2 border-yellow-400 w-32 h-24 rounded">
        <div className="absolute w-4 h-4 bg-yellow-400 rounded-full" />
      </div>
    </div>
  ),
  pendulum: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="relative">
        <div className="w-1 h-32 bg-gray-400 origin-top animate-[swing_2s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500" />
      </div>
    </div>
  ),
  projectile: () => (
    <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-48">
        <path
          d="M10 90 Q100 10 190 90"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray="5"
        />
        <circle cx="10" cy="90" r="5" fill="#22c55e" />
      </svg>
    </div>
  ),
  default: () => (
    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Visualization loading...</p>
    </div>
  ),
};

interface VisualizationRegistryProps {
  type: VisualizationType;
  props?: VisualizationProps;
}

export function VisualizationRegistry({ type, props = {} }: VisualizationRegistryProps) {
  const Component = visualizations[type] || visualizations.default;

  return (
    <Suspense
      fallback={
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center animate-pulse">
          <p className="text-muted-foreground">Loading visualization...</p>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
}

interface VisualizationRendererProps {
  visualizationType?: string;
  visualizationConfig?: Record<string, any>;
}

export function VisualizationRenderer({ visualizationType, visualizationConfig }: VisualizationRendererProps) {
  const type = (visualizationType || "default") as VisualizationType;
  return <VisualizationRegistry type={type} props={visualizationConfig} />;
}

export default VisualizationRegistry;
