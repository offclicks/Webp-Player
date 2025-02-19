import { WebPPlayer } from "@/components/ui/webp-player";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4" variant="secondary">React + TypeScript</Badge>
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          WebP Animation Controller
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A powerful, TypeScript-first library for precise control over WebP animations in React applications.
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">🎮 Precise Controls</h3>
            <p className="text-muted-foreground">Play, pause, and toggle animations with frame-perfect precision.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">⚡ Performance First</h3>
            <p className="text-muted-foreground">Optimized for smooth playback and minimal memory footprint.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">📱 Responsive Design</h3>
            <p className="text-muted-foreground">Works seamlessly across all screen sizes and devices.</p>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-12 space-y-16">
        <h2 className="text-3xl font-bold text-center mb-12">Interactive Demos</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Basic Controls Demo */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Basic Controls</h3>
              <p className="text-muted-foreground mb-6">
                Simple play/pause controls with frame freezing capability.
              </p>
              <CardContent className="bg-gray-50 rounded-lg p-4">
                <WebPPlayer
                  src="/sample-webp.webp"
                  width={300}
                  height={200}
                  showControls={true}
                  loop={true}
                  initialState="pause"
                  freezeOnPause={true}
                />
              </CardContent>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  {`<WebPPlayer
  src="/animation.webp"
  showControls={true}
  loop={true}
  initialState="pause"
  freezeOnPause={true}
/>`}
                </pre>
              </div>
            </div>
          </Card>

          {/* Hover to Play Demo */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Hover to Play</h3>
              <p className="text-muted-foreground mb-6">
                Automatically play animation on hover, with smooth frame freezing.
              </p>
              <CardContent className="bg-gray-50 rounded-lg p-4">
                <WebPPlayer
                  src="/sample-webp.webp"
                  width={300}
                  height={200}
                  playOnHover={true}
                  showControls={false}
                  freezeOnPause={true}
                  initialState="pause"
                />
              </CardContent>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  {`<WebPPlayer
  src="/animation.webp"
  playOnHover={true}
  showControls={false}
  freezeOnPause={true}
  initialState="pause"
/>`}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Installation Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">Install via npm:</p>
              <pre className="bg-gray-50 p-4 rounded-lg">
                npm install webp-animation-controller
              </pre>
              <p className="text-muted-foreground mt-4">
                Check out our documentation for more examples and advanced usage.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}