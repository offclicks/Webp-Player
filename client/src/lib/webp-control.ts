export interface WebPControlOptions {
  autoplay?: boolean;
  loop?: boolean;
  freezeOnPause?: boolean;
  initialState?: 'play' | 'pause';
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export class WebPController {
  private element: HTMLImageElement;
  private isPlaying: boolean;
  private options: WebPControlOptions;

  constructor(element: HTMLImageElement, options: WebPControlOptions = {}) {
    this.element = element;
    this.options = {
      autoplay: false,
      loop: true,
      freezeOnPause: true,
      initialState: 'pause',
      ...options
    };

    // Set initial state
    this.isPlaying = this.options.initialState === 'play';
    this.updatePlayState();
  }

  private updatePlayState() {
    if (this.isPlaying) {
      this.element.classList.remove('webp-paused');
      this.element.classList.add('webp-playing');
    } else {
      this.element.classList.remove('webp-playing');
      this.element.classList.add('webp-paused');
    }
  }

  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.updatePlayState();
    this.options.onPlay?.();
  }

  pause() {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.updatePlayState();
    this.options.onPause?.();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  isAnimating(): boolean {
    return this.isPlaying;
  }

  destroy() {
    this.element.classList.remove('webp-playing', 'webp-paused');
  }
}