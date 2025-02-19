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
  private loadPromise: Promise<void>;

  constructor(element: HTMLImageElement, options: WebPControlOptions = {}) {
    this.element = element;
    this.originalSrc = element.src;
    this.options = {
      autoplay: false,
      loop: true,
      ...options
    };

    // Initialize load promise
    this.loadPromise = this.waitForLoad();

    if (this.options.autoplay) {
      this.play();
    }
  }

  private waitForLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (this.element.complete) {
        resolve();
      } else {
        this.element.onload = () => resolve();
      }
    });
  }

  async play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      await this.loadPromise;
      this.element.src = this.originalSrc;
      this.options.onPlay?.();
    }
  }

  async pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      await this.loadPromise;

      try {
        const canvas = document.createElement('canvas');
        canvas.width = this.element.naturalWidth;
        canvas.height = this.element.naturalHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(this.element, 0, 0);
          this.element.src = canvas.toDataURL();
        }
      } catch (error) {
        console.error('Error pausing WebP animation:', error);
      }

      this.options.onPause?.();
    }
  }

  async restart() {
    await this.loadPromise;
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