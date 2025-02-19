import { useEffect, useRef, useState } from "react";
import { WebPController, type WebPControlOptions } from "@/lib/webp-control";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

/**
 * Props for the WebPPlayer component
 * @property {string} src - The source URL of the WebP animation
 * @property {number} [width] - Optional width of the player
 * @property {number} [height] - Optional height of the player
 * @property {string} [className] - Optional CSS classes
 * @property {boolean} [playOnHover=false] - Whether to play on hover
 * @property {boolean} [showControls=true] - Whether to show play/pause controls
 * @property {boolean} [loop=true] - Whether to loop the animation
 * @property {boolean} [freezeOnPause=true] - Whether to freeze on the current frame when paused
 * @property {'play' | 'pause'} [initialState='pause'] - Initial playback state
 */
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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (imgRef.current) {
        // Ensure image is loaded
        if (!imgRef.current.complete) {
          await new Promise(resolve => {
            imgRef.current!.onload = resolve;
          });
        }
        
        // Destroy previous controller if it exists
        if (controllerRef.current) {
          controllerRef.current.destroy();
        }

        // Create new controller
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

        // Set initial state
        if (options.initialState === 'pause') {
          controllerRef.current.pause();
        }
      }
    };

    init();

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
      <img
        ref={imgRef}
        src={src}
        width={width}
        height={height}
        className={`max-w-full h-auto ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
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