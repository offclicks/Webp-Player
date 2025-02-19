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
  private isTransitioning: boolean = false;

  constructor(element: HTMLImageElement, options: WebPControlOptions = {}) {
    this.element = element;
    this.originalSrc = element.src;
    this.options = {
      autoplay: false,
      loop: true,
      ...options
    };

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
    if (this.isPlaying || this.isTransitioning) return;

    try {
      this.isTransitioning = true;
      await this.loadPromise;
      this.isPlaying = true;
      this.element.src = this.originalSrc;
      this.options.onPlay?.();
    } catch (error) {
      console.error('Error playing WebP animation:', error);
    } finally {
      this.isTransitioning = false;
    }
  }

  async pause() {
    if (!this.isPlaying || this.isTransitioning) return;

    try {
      this.isTransitioning = true;
      await this.loadPromise;

      const canvas = document.createElement('canvas');
      canvas.width = this.element.naturalWidth || this.element.width;
      canvas.height = this.element.naturalHeight || this.element.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Ensure image is loaded before drawing
      if (this.element.complete) {
        ctx.drawImage(this.element, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        this.element.src = dataUrl;
        this.isPlaying = false;
        this.options.onPause?.();
      }
    } catch (error) {
      console.error('Error pausing WebP animation:', error);
      // Fallback: just stop the animation by setting the original source
      this.element.src = this.originalSrc;
    } finally {
      this.isTransitioning = false;
    }
  }

  async restart() {
    try {
      await this.loadPromise;
      if (this.isPlaying) {
        this.element.src = this.originalSrc;
      }
    } catch (error) {
      console.error('Error restarting WebP animation:', error);
    }
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
    try {
      this.pause();
      this.element.src = this.originalSrc;
    } catch (error) {
      console.error('Error destroying WebP controller:', error);
    }
  }
}