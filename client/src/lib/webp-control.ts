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
  private frameCanvas: HTMLCanvasElement;
  private frameContext: CanvasRenderingContext2D | null;
  private currentFrameDataUrl: string | null = null;
  private isDestroyed: boolean = false;

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

    // Initialize canvas for frame capture
    this.frameCanvas = document.createElement('canvas');
    this.frameContext = this.frameCanvas.getContext('2d');

    // Set initial state
    if (this.options.initialState === 'play' || this.options.autoplay) {
      this.play();
    } else {
      this.initializePausedState();
    }
  }

  private async initializePausedState() {
    try {
      await this.waitForImageLoad();
      if (this.options.freezeOnPause) {
        await this.captureAndSetFrame();
      }
      this.isPlaying = false;
      this.options.onPause?.();
    } catch (error) {
      console.error('Error initializing paused state:', error);
    }
  }

  private waitForImageLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (this.element.complete) {
        resolve();
      } else {
        const handleLoad = () => {
          this.element.removeEventListener('load', handleLoad);
          resolve();
        };
        this.element.addEventListener('load', handleLoad);
      }
    });
  }

  private async captureAndSetFrame(): Promise<void> {
    if (!this.frameContext || this.isDestroyed) return;

    try {
      // Ensure we're capturing from the original image
      const tempImage = new Image();
      tempImage.src = this.originalSrc;
      await new Promise((resolve) => {
        tempImage.onload = resolve;
      });

      // Set canvas dimensions to match the image
      this.frameCanvas.width = tempImage.naturalWidth;
      this.frameCanvas.height = tempImage.naturalHeight;

      // Draw the current frame
      this.frameContext.clearRect(0, 0, this.frameCanvas.width, this.frameCanvas.height);
      this.frameContext.drawImage(tempImage, 0, 0);

      // Store and set the frame
      this.currentFrameDataUrl = this.frameCanvas.toDataURL();
      this.element.src = this.currentFrameDataUrl;
    } catch (error) {
      console.error('Error capturing frame:', error);
      this.element.src = this.originalSrc;
    }
  }

  async play() {
    if (this.isPlaying || this.isDestroyed) return;

    try {
      this.isPlaying = true;
      this.element.src = this.originalSrc;
      await this.waitForImageLoad();
      this.options.onPlay?.();
    } catch (error) {
      console.error('Error playing WebP animation:', error);
      this.isPlaying = false;
    }
  }

  async pause() {
    if (!this.isPlaying || this.isDestroyed) return;

    try {
      if (this.options.freezeOnPause) {
        await this.captureAndSetFrame();
      }
      this.isPlaying = false;
      this.options.onPause?.();
    } catch (error) {
      console.error('Error pausing WebP animation:', error);
    }
  }

  async toggle() {
    if (this.isPlaying) {
      await this.pause();
    } else {
      await this.play();
    }
  }

  isAnimating(): boolean {
    return this.isPlaying;
  }

  destroy() {
    this.isDestroyed = true;
    this.pause();
    this.element.src = this.originalSrc;
    this.frameContext = null;
  }
}