export interface WebPControlOptions {
  autoplay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export class WebPController {
  private element: HTMLImageElement;
  private originalSrc: string;
  private isPlaying: boolean = false;
  private options: WebPControlOptions;

  constructor(element: HTMLImageElement, options: WebPControlOptions = {}) {
    this.element = element;
    this.originalSrc = element.src;
    this.options = {
      autoplay: false,
      loop: true,
      ...options
    };

    if (this.options.autoplay) {
      this.play();
    }

    // Handle looping by restarting when animation ends
    this.element.addEventListener('load', () => {
      if (this.options.loop && this.isPlaying) {
        this.restart();
      } else {
        this.options.onEnd?.();
      }
    });
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      // Force WebP animation to restart by reloading the source
      this.element.src = this.originalSrc;
      this.options.onPlay?.();
    }
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      // Create a static copy of the current frame
      const canvas = document.createElement('canvas');
      canvas.width = this.element.width;
      canvas.height = this.element.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(this.element, 0, 0);
        this.element.src = canvas.toDataURL();
      }
      this.options.onPause?.();
    }
  }

  restart() {
    this.element.src = this.originalSrc;
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  isAnimating() {
    return this.isPlaying;
  }

  destroy() {
    this.pause();
    this.element.src = this.originalSrc;
  }
}
