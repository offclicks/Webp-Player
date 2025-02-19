import { WebPPlayer } from "@/components/ui/webp-player";
import { useWebPPlayer } from "@/hooks/use-webp-player";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { initialize, isPlaying, play, pause, toggle } = useWebPPlayer({
    loop: true,
    onPlay: () => console.log("Playing"),
    onPause: () => console.log("Paused")
  });

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        WebP Animation Controller Demo
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Player with Controls */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Basic Controls</h2>
          <WebPPlayer
            src="attached_assets/sample-webp.webp"
            width={300}
            height={200}
            showControls={true}
            loop={true}
          />
        </div>

        {/* Hover to Play Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Hover to Play</h2>
          <WebPPlayer
            src="attached_assets/sample-webp.webp"
            width={300}
            height={200}
            playOnHover={true}
            showControls={false}
          />
        </div>

        {/* Custom Controls Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Custom Controls</h2>
          <Card className="p-4 space-y-4">
            <img
              ref={initialize}
              src="attached_assets/sample-webp.webp"
              width={300}
              height={200}
              className="max-w-full h-auto"
            />
            <div className="flex justify-center gap-4">
              <Button onClick={play} disabled={isPlaying}>
                Play
              </Button>
              <Button onClick={pause} disabled={!isPlaying}>
                Pause
              </Button>
              <Button onClick={toggle}>
                Toggle
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}