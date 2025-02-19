import { WebPPlayer } from "@/components/ui/webp-player";
import { useWebPPlayer } from "@/hooks/use-webp-player";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { initialize, isPlaying, play, pause, toggle } = useWebPPlayer({
    loop: true,
    freezeOnPause: true,
    initialState: 'pause',
    onPlay: () => console.log("Playing"),
    onPause: () => console.log("Paused")
  });

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        WebP Animation Controller Demo
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Player - Paused Initially */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Basic Controls (Initially Paused)</h2>
          <WebPPlayer
            src="/sample-webp.webp"
            width={300}
            height={200}
            showControls={true}
            loop={true}
            initialState="pause"
            freezeOnPause={true}
          />
        </div>

        {/* Auto-playing Player */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Auto-playing Controls</h2>
          <WebPPlayer
            src="/sample-webp.webp"
            width={300}
            height={200}
            showControls={true}
            loop={true}
            initialState="play"
            freezeOnPause={true}
          />
        </div>

        {/* Hover to Play with Frame Freeze */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Hover to Play (with frame freeze)</h2>
          <WebPPlayer
            src="/sample-webp.webp"
            width={300}
            height={200}
            playOnHover={true}
            showControls={false}
            freezeOnPause={true}
            initialState="pause"
          />
        </div>

        {/* No Frame Freeze Example */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Controls without Frame Freeze</h2>
          <WebPPlayer
            src="/sample-webp.webp"
            width={300}
            height={200}
            showControls={true}
            freezeOnPause={false}
            initialState="pause"
          />
        </div>

        {/* Custom Controls Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Custom Controls</h2>
          <Card className="p-4 space-y-4">
            <img
              ref={initialize}
              src="/sample-webp.webp"
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