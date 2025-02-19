import { useEffect, useRef, useState } from "react";
import { WebPController, type WebPControlOptions } from "@/lib/webp-control";

export function useWebPPlayer(options?: WebPControlOptions) {
  const controllerRef = useRef<WebPController | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initialize = (element: HTMLImageElement) => {
    if (element) {
      controllerRef.current = new WebPController(element, {
        ...options,
        onPlay: () => {
          setIsPlaying(true);
          options?.onPlay?.();
        },
        onPause: () => {
          setIsPlaying(false);
          options?.onPause?.();
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  return {
    initialize,
    isPlaying,
    play: () => controllerRef.current?.play(),
    pause: () => controllerRef.current?.pause(),
    toggle: () => controllerRef.current?.toggle(),
    restart: () => controllerRef.current?.restart()
  };
}
