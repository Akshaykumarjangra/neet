import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

interface UsePixiAppOptions {
  width: number;
  height: number;
  background?: number;
  antialias?: boolean;
  onReady?: (app: PIXI.Application) => void | (() => void);
  enabled?: boolean;
}

interface UsePixiAppReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  app: PIXI.Application | null;
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
}

export function usePixiApp(options: UsePixiAppOptions): UsePixiAppReturn {
  const {
    width,
    height,
    background = 0x000000,
    antialias = true,
    onReady,
    enabled = true
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const onReadyRef = useRef(onReady);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update onReady ref when it changes without triggering re-init
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!containerRef.current || !enabled) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    let localApp: PIXI.Application | null = null;
    let cleanup: (() => void) | void;

    (async () => {
      const app = new PIXI.Application();
      localApp = app;
      
      try {
        await app.init({
          width,
          height,
          background,
          antialias,
          preference: 'webgl',
        });

        if (!mounted || !containerRef.current) {
          app.destroy(true, { children: true });
          return;
        }

        containerRef.current.appendChild(app.canvas);
        appRef.current = app;
        setIsReady(true);
        setIsLoading(false);

        // Call onReady callback if provided
        if (onReadyRef.current) {
          cleanup = onReadyRef.current(app);
        }
      } catch (err) {
        console.error('Failed to initialize PixiJS:', err);
        setError(
          'WebGL is not available in this environment. Please try opening this page in a standard browser with WebGL support.'
        );
        setIsLoading(false);
        if (localApp) {
          localApp.destroy(true, { children: true });
        }
      }
    })();

    return () => {
      mounted = false;
      if (cleanup) {
        cleanup();
      }
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      } else if (localApp) {
        localApp.destroy(true, { children: true });
      }
    };
  }, [width, height, background, antialias, enabled]);

  return {
    containerRef,
    app: appRef.current,
    isReady,
    isLoading,
    error,
  };
}
