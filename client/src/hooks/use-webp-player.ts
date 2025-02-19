import { useEffect, useRef, useState } from "react";
import { WebPController, type WebPControlOptions } from "@/lib/webp-control";

export function useWebPPlayer(options?: WebPControlOptions) {
  const controllerRef = useRef<WebPController | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initialize = (element: HTMLImageElement | null) => {
    if (!element) return;

    // Clean up previous controller if it exists
    if (controllerRef.current) {
      controllerRef.current.destroy();
    }

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
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  return {
    initialize,
    isPlaying,
    play: () => {
      if (controllerRef.current && !isPlaying) {
        controllerRef.current.play();
      }
    },
    pause: () => {
      if (controllerRef.current && isPlaying) {
        controllerRef.current.pause();
      }
    },
    toggle: () => {
      if (controllerRef.current) {
        controllerRef.current.toggle();
      }
    },
    restart: () => {
      if (controllerRef.current) {
        controllerRef.current.restart();
      }
    }
  };
}