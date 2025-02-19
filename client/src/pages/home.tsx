import { WebPPlayer } from "@/components/ui/webp-player";

export default function Home() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        WebP Animation Controller Demo
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Player - Initially Paused */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Basic Controls</h2>
          <WebPPlayer
            src="/sample-webp.webp"
            showControls={true}
            loop={true}
            initialState="pause"
            freezeOnPause={true}
          />
        </div>

        {/* Hover to Play Example */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Hover to Play</h2>
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
      </div>
    </div>
  );
}