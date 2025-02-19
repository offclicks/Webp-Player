import { useEffect, useRef, useState } from "react";
import { WebPController, type WebPControlOptions } from "@/lib/webp-control";

export function useWebPPlayer(options?: WebPControlOptions) {
  const controllerRef = useRef<WebPController | null>(null);
  const [isPlaying, setIsPlaying] = useState(options?.initialState === 'play');

  const initialize = (element: HTMLImageElement | null) => {
    if (!element) return;

    // Clean up previous controller if it exists
    if (controllerRef.current) {
      controllerRef.current.destroy();
    }

    // Create new controller with wrapped callbacks to update state
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
    play: async () => {
      if (controllerRef.current && !isPlaying) {
        await controllerRef.current.play();
      }
    },
    pause: async () => {
      if (controllerRef.current && isPlaying) {
        await controllerRef.current.pause();
      }
    },
    toggle: async () => {
      if (controllerRef.current) {
        await controllerRef.current.toggle();
      }
    }
  };
}