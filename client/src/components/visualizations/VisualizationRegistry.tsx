import { lazy, Suspense, ComponentType } from "react";
import { getVisualization } from "@/visuals/registry";
import { ThreeDViewer } from "@/components/ThreeDViewer";

type VisualizationType = 
  | "atom"
  | "molecule" 
  | "cell"
  | "organ"
  | "wave"
  | "circuit"
  | "pendulum"
  | "projectile"
  | "default"
  | "threejs"
  | "d3"
  | "image"
  | "video";

interface VisualizationProps {
  [key: string]: any;
}

const LazyMoleculeViewer = lazy(() => import("@/components/simulations/MoleculeViewer"));

const placeholderVisualization = () => (
  <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
    <div className="text-center space-y-2">
      <p className="text-muted-foreground">Interactive Visualization</p>
      <p className="text-xs text-muted-foreground">This visualization helps illustrate key concepts</p>
    </div>
  </div>
);

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
      <div className="relative border-2 border-yellow-400 w-32 h-24 rounded">
        <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 rounded-full" />
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
  default: placeholderVisualization,
  threejs: placeholderVisualization,
  d3: placeholderVisualization,
  image: placeholderVisualization,
  video: placeholderVisualization,
};

const visualizationTypeAliases: Record<string, string> = {
  "planetary-orbit-3d": "planetary-orbit",
  "wave-motion": "interference-pattern",
  "circular-motion": "angular-momentum",
};

const visualizationTypeFallbacks: Record<string, string> = {
  wave: "interference-pattern",
  projectile: "projectile-motion",
  atom: "atomic-spectrum",
  molecule: "molecular-orbital",
  circuit: "ac-circuit",
  pendulum: "simple-pendulum-phase",
};

const infoTypeLabels: Record<string, string> = {
  concept: "Concept",
  diagram: "Diagram",
  flowchart: "Flowchart",
  graph: "Graph",
  table: "Table",
  comparison: "Comparison",
  animation: "Animation",
  "comparative-anatomy": "Comparative Anatomy",
};

const biologyModelTypes: Record<string, "atom" | "molecule" | "cell" | "organ"> = {
  "cell-structure": "cell",
  "tissue-anatomy": "cell",
  "animal-anatomy": "organ",
  "plant-anatomy": "organ",
};

const infoVisualizationTypes = new Set(Object.keys(infoTypeLabels));

function renderInfoPreview(type: string) {
  const normalizedType = type === "comparative-anatomy" ? "comparison" : type;

  switch (normalizedType) {
    case "graph":
      return (
        <div className="flex items-end gap-2 h-24">
          {[28, 52, 38, 70, 45].map((height, idx) => (
            <div
              key={idx}
              className="w-4 rounded-sm bg-emerald-500/70"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      );
    case "table":
      return (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx} className="h-6 rounded bg-muted/60" />
          ))}
        </div>
      );
    case "flowchart":
      return (
        <div className="space-y-2">
          {["Step 1", "Step 2", "Step 3"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex-1 h-8 rounded border bg-muted/40 flex items-center justify-center text-xs text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      );
    case "comparison":
      return (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-md border bg-muted/40 p-2">
            <div className="font-semibold">Option A</div>
            <div className="mt-2 h-6 rounded bg-muted/60" />
            <div className="mt-2 h-6 rounded bg-muted/60" />
          </div>
          <div className="rounded-md border bg-muted/40 p-2">
            <div className="font-semibold">Option B</div>
            <div className="mt-2 h-6 rounded bg-muted/60" />
            <div className="mt-2 h-6 rounded bg-muted/60" />
          </div>
        </div>
      );
    case "animation":
      return (
        <div className="flex items-center justify-center h-20">
          <div className="flex gap-2">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="h-3 w-3 rounded-full bg-primary/70 animate-pulse" />
            ))}
          </div>
        </div>
      );
    case "diagram":
      return (
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 rounded-full bg-primary/70" />
          <div className="flex-1 mx-2 h-px bg-muted-foreground/40" />
          <div className="h-6 w-6 rounded-full bg-primary/40" />
          <div className="flex-1 mx-2 h-px bg-muted-foreground/40" />
          <div className="h-6 w-6 rounded-full bg-primary/70" />
        </div>
      );
    default:
      return (
        <div className="space-y-2">
          <div className="h-3 rounded bg-muted/60" />
          <div className="h-3 rounded bg-muted/60" />
          <div className="h-3 rounded bg-muted/60 w-2/3" />
        </div>
      );
  }
}

function InfoVisualization({ type, title, description }: { type: string; title?: string; description?: string }) {
  const label = infoTypeLabels[type] || "Visualization";
  const fallbackTitle = `${label} Preview`;

  return (
    <div className="rounded-lg border bg-muted/10 p-4 space-y-3">
      <div>
        <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
        <div className="text-base font-semibold">{title || fallbackTitle}</div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="rounded-md border bg-background p-3">
        {renderInfoPreview(type)}
      </div>
    </div>
  );
}

function AtomicStructureVisualization({
  title,
  description,
  config,
}: {
  title?: string;
  description?: string;
  config?: Record<string, any>;
}) {
  const particleRows = [
    { label: "Protons", value: config?.protons },
    { label: "Neutrons", value: config?.neutrons },
    { label: "Electrons", value: config?.electrons },
  ];
  const showDetails = particleRows.some((row) => typeof row.value === "number");

  return (
    <div className="space-y-3">
      <ThreeDViewer
        modelType="atom"
        title={title || "Atomic Structure"}
        description={description}
      />
      {showDetails && (
        <div className="grid grid-cols-3 gap-2 text-xs">
          {particleRows.map((row) => (
            <div key={row.label} className="rounded-md border bg-muted/40 p-2 text-center">
              <div className="font-semibold">{row.label}</div>
              <div className="text-muted-foreground">{row.value ?? "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  suppressTitleDescription?: boolean;
}

export function VisualizationRenderer({
  visualizationType,
  visualizationConfig,
  suppressTitleDescription = false,
}: VisualizationRendererProps) {
  const sanitizedConfig =
    suppressTitleDescription && visualizationConfig
      ? { ...visualizationConfig, title: undefined, description: undefined }
      : visualizationConfig;
  const type = (visualizationType || "default") as VisualizationType;
  const normalizedTitle =
    typeof visualizationConfig?.title === "string" ? visualizationConfig.title.toLowerCase() : "";
  const configVisualizationName =
    typeof visualizationConfig?.visualizationName === "string"
      ? visualizationConfig.visualizationName
      : null;
  const titleVisualizationName =
    !configVisualizationName && visualizationType === "concept"
      ? normalizedTitle.includes("fundamental forces")
        ? "fundamental-forces-comparison"
        : normalizedTitle.includes("timeline of physics")
        ? "physics-discoveries-timeline"
        : normalizedTitle.includes("scientific method")
        ? "scientific-method-flow"
        : normalizedTitle.includes("conservation laws")
        ? "conservation-laws-summary"
        : normalizedTitle.includes("scale of")
        ? "physics-scale-overview"
        : normalizedTitle.includes("si units")
        ? "si-units-map"
        : normalizedTitle.includes("metric prefix")
        ? "metric-prefix-scale"
        : normalizedTitle.includes("dimensional analysis")
        ? "dimensional-analysis-checker"
        : normalizedTitle.includes("range vs angle")
        ? "range-angle-graph"
        : normalizedTitle.includes("vernier")
        ? "vernier-caliper"
        : normalizedTitle.includes("screw gauge")
        ? "screw-gauge"
        : normalizedTitle.includes("unification")
        ? "physics-unification-ladder"
        : normalizedTitle.includes("technology")
        ? "physics-technology-map"
        : null
      : null;
  const derivedVisualizationName = configVisualizationName || titleVisualizationName;

  const registryCandidates = [
    derivedVisualizationName,
    visualizationType ? visualizationTypeAliases[visualizationType] : null,
    visualizationType ? visualizationTypeFallbacks[visualizationType] : null,
    visualizationType,
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of registryCandidates) {
    const registryEntry = getVisualization(candidate);
    if (registryEntry) {
      const Component = registryEntry.component;
      return (
        <Suspense
          fallback={
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center animate-pulse">
              <p className="text-muted-foreground">Loading visualization...</p>
            </div>
          }
        >
          <Component {...sanitizedConfig} visualizationType={visualizationType} />
        </Suspense>
      );
    }
  }

  if (visualizationType === "biomolecule-structure") {
    return (
      <Suspense
        fallback={
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center animate-pulse">
            <p className="text-muted-foreground">Loading visualization...</p>
          </div>
        }
      >
        <LazyMoleculeViewer />
      </Suspense>
    );
  }

  if (visualizationType === "atomic-structure") {
    return (
      <AtomicStructureVisualization
        title={sanitizedConfig?.title}
        description={sanitizedConfig?.description}
        config={visualizationConfig}
      />
    );
  }

  const biologyModelType = visualizationType ? biologyModelTypes[visualizationType] : undefined;
  if (biologyModelType) {
    return (
      <ThreeDViewer
        modelType={biologyModelType}
        title={sanitizedConfig?.title}
        description={sanitizedConfig?.description}
      />
    );
  }

  if (visualizationType && infoVisualizationTypes.has(visualizationType)) {
    return (
      <InfoVisualization
        type={visualizationType}
        title={sanitizedConfig?.title}
        description={sanitizedConfig?.description}
      />
    );
  }
  
  // Handle special visualization types
  if (visualizationType === "threejs" || visualizationType === "d3" || visualizationType === "image" || visualizationType === "video") {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">{visualizationConfig?.title || `Interactive ${visualizationType} Visualization`}</p>
          <p className="text-xs text-muted-foreground">
            {visualizationConfig?.description || `This ${visualizationType} visualization will be rendered here`}
          </p>
          {visualizationType === "image" && visualizationConfig?.assetUrl && (
            <img 
              src={visualizationConfig.assetUrl} 
              alt={visualizationConfig.title || "Visualization"}
              className="max-w-full max-h-48 rounded"
            />
          )}
          {visualizationType === "video" && visualizationConfig?.assetUrl && (
            <video 
              src={visualizationConfig.assetUrl}
              controls
              className="max-w-full max-h-48 rounded"
              autoPlay={visualizationConfig?.autoplay}
            />
          )}
        </div>
      </div>
    );
  }
  
  return <VisualizationRegistry type={type} props={visualizationConfig} />;
}

export default VisualizationRegistry;
