import { useEffect, useRef, useState } from "react";
import { WebPController, type WebPControlOptions } from "@/lib/webp-control";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

interface WebPPlayerProps extends WebPControlOptions {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  playOnHover?: boolean;
  showControls?: boolean;
}

export function WebPPlayer({
  src,
  width,
  height,
  className = "",
  playOnHover = false,
  showControls = true,
  ...options
}: WebPPlayerProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const controllerRef = useRef<WebPController | null>(null);
  const [isPlaying, setIsPlaying] = useState(options.initialState === 'play');

  useEffect(() => {
    if (imgRef.current) {
      // Initialize controller
      controllerRef.current = new WebPController(imgRef.current, {
        ...options,
        onPlay: () => {
          setIsPlaying(true);
          options.onPlay?.();
        },
        onPause: () => {
          setIsPlaying(false);
          options.onPause?.();
        }
      });
    }

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  const handleToggle = () => {
    controllerRef.current?.toggle();
  };

  const handleMouseEnter = () => {
    if (playOnHover) {
      controllerRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover) {
      controllerRef.current?.pause();
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div 
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={src}
          width={width}
          height={height}
          className={`max-w-full h-auto ${className} ${options.initialState === 'pause' ? 'webp-paused' : 'webp-playing'}`}
        />
      </div>

      {showControls && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className="w-10 h-10 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}