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
  private originalSrc: string;
  private isPlaying: boolean = false;
  private options: WebPControlOptions;
  private loadPromise: Promise<void>;
  private isTransitioning: boolean = false;
  private currentFrameDataUrl: string | null = null;

  constructor(element: HTMLImageElement, options: WebPControlOptions = {}) {
    this.element = element;
    this.originalSrc = element.src;
    this.options = {
      autoplay: false,
      loop: true,
      freezeOnPause: true,
      initialState: 'pause',
      ...options
    };

    this.loadPromise = this.waitForLoad();

    if (this.options.initialState === 'play' || this.options.autoplay) {
      this.play();
    } else {
      this.pause();
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

  private async captureFrame(): Promise<string | null> {
    try {
      await this.loadPromise;

      const canvas = document.createElement('canvas');
      canvas.width = this.element.naturalWidth || this.element.width;
      canvas.height = this.element.naturalHeight || this.element.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Ensure we have the original image loaded before capture
      this.element.src = this.originalSrc;
      await new Promise(resolve => setTimeout(resolve, 50)); // Small delay to ensure frame is rendered

      ctx.drawImage(this.element, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing frame:', error);
      return null;
    }
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
    if (!this.isPlaying && this.currentFrameDataUrl) return;

    try {
      this.isTransitioning = true;
      await this.loadPromise;

      if (this.options.freezeOnPause) {
        const frameDataUrl = await this.captureFrame();
        if (frameDataUrl) {
          this.currentFrameDataUrl = frameDataUrl;
          this.element.src = frameDataUrl;
        }
      } else {
        this.element.src = this.originalSrc;
      }

      this.isPlaying = false;
      this.options.onPause?.();
    } catch (error) {
      console.error('Error pausing WebP animation:', error);
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