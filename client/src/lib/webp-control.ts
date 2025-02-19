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

    // Add base classes
    this.element.classList.add('webp-image');
    this.element.parentElement?.classList.add('webp-container');

    // Set initial state
    this.isPlaying = false;
    if (this.options.initialState === 'play') {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    if (this.isPlaying) return;

    this.element.classList.remove('webp-paused');
    this.element.classList.add('webp-playing');
    this.isPlaying = true;
    this.options.onPlay?.();
  }

  pause() {
    if (!this.isPlaying && this.element.classList.contains('webp-paused')) return;

    this.element.classList.remove('webp-playing');
    this.element.classList.add('webp-paused');
    this.isPlaying = false;
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
    this.element.classList.remove('webp-playing', 'webp-paused', 'webp-image');
    this.element.parentElement?.classList.remove('webp-container');
  }
}