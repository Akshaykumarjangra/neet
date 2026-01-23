import type { Plugin } from "vite";

type ReplitPluginOptions = Record<string, unknown>;

declare module "@replit/vite-plugin-cartographer" {
  export default function cartographer(options?: ReplitPluginOptions): Plugin;
}

declare module "@replit/vite-plugin-dev-banner" {
  export default function devBanner(options?: ReplitPluginOptions): Plugin;
}

declare module "@replit/vite-plugin-runtime-error-modal" {
  export default function runtimeErrorModal(options?: ReplitPluginOptions): Plugin;
}
