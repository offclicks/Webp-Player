import { WebPPlayer } from "@/components/ui/webp-player";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WebP Animation Controller
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A lightweight, React-powered WebP animation controller with play/pause controls 
            and hover interactions.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Controls Example */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Play/Pause Controls</h2>
            <p className="text-gray-600 mb-6">
              Control WebP animations with play and pause buttons
            </p>
            <WebPPlayer
              src="/sample-webp.webp"
              showControls={true}
              loop={true}
              initialState="pause"
              className="rounded-lg shadow-md"
            />
          </Card>

          {/* Hover to Play Example */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hover Interaction</h2>
            <p className="text-gray-600 mb-6">
              Animations that play on hover and pause when mouse leaves
            </p>
            <WebPPlayer
              src="/sample-webp.webp"
              playOnHover={true}
              showControls={false}
              initialState="pause"
              className="rounded-lg shadow-md"
            />
          </Card>
        </div>

        {/* Installation */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <code className="text-sm bg-gray-100 px-3 py-2 rounded">
              npm install webp-animation-controller
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}