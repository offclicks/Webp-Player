# WebP Animation Controller for React

A TypeScript-first WebP animation control library with advanced React integration, focusing on precise animation management and user interaction.

## Features

- 🎮 Play/Pause controls for WebP animations
- 🖱️ Hover-to-play functionality
- ⏸️ Frame freezing on pause
- 🔄 Loop control
- 🎯 TypeScript support
- ⚛️ React hooks and components

## Installation

```bash
npm install webp-animation-controller
```

## Usage

### Basic Usage with Controls

```tsx
import { WebPPlayer } from 'webp-animation-controller';

function App() {
  return (
    <WebPPlayer
      src="/path/to/animation.webp"
      width={300}
      height={200}
      showControls={true}
      loop={true}
      initialState="pause"
      freezeOnPause={true}
    />
  );
}
```

### Hover to Play

```tsx
import { WebPPlayer } from 'webp-animation-controller';

function App() {
  return (
    <WebPPlayer
      src="/path/to/animation.webp"
      playOnHover={true}
      showControls={false}
      freezeOnPause={true}
    />
  );
}
```

### Using the Hook for Custom Controls

```tsx
import { useWebPPlayer } from 'webp-animation-controller';

function CustomPlayer() {
  const { initialize, isPlaying, play, pause, toggle } = useWebPPlayer({
    loop: true,
    freezeOnPause: true,
    initialState: 'pause',
    onPlay: () => console.log("Playing"),
    onPause: () => console.log("Paused")
  });

  return (
    <div>
      <img 
        ref={initialize}
        src="/path/to/animation.webp"
        width={300}
        height={200}
      />
      <button onClick={toggle}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```

## Props

### WebPPlayer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | Source URL of the WebP animation |
| width | number | - | Width of the player |
| height | number | - | Height of the player |
| className | string | "" | Additional CSS classes |
| playOnHover | boolean | false | Play animation on hover |
| showControls | boolean | true | Show play/pause controls |
| loop | boolean | true | Loop the animation |
| freezeOnPause | boolean | true | Freeze on current frame when paused |
| initialState | 'play' \| 'pause' | 'pause' | Initial playback state |
| onPlay | () => void | - | Callback when animation starts playing |
| onPause | () => void | - | Callback when animation is paused |
| onEnd | () => void | - | Callback when animation ends |

## Publishing

To publish this as a package:

1. Remove demo-specific code (pages/home.tsx)
2. Update package.json with appropriate details
3. Build the package using TypeScript
4. Publish to npm

## License

MIT
