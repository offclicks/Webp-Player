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
  private isPlaying: boolean;
  private options: WebPControlOptions;
  private staticImage: HTMLImageElement | null = null;

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

    // Set up initial styles
    this.element.style.animation = 'none';
    this.isPlaying = false;

    // Initialize based on options
    if (this.options.initialState === 'play' || this.options.autoplay) {
      this.play();
    } else {
      this.pause();
    }
  }

  private createStaticImage(): HTMLImageElement {
    const img = new Image();
    img.src = this.originalSrc;
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.opacity = '0';
    return img;
  }

  async play() {
    if (this.isPlaying) return;

    try {
      // Remove static image if it exists
      if (this.staticImage && this.staticImage.parentNode) {
        this.staticImage.parentNode.removeChild(this.staticImage);
        this.staticImage = null;
      }

      // Start animation
      this.element.style.animation = '';
      this.element.style.opacity = '1';
      this.isPlaying = true;
      this.options.onPlay?.();
    } catch (error) {
      console.error('Error playing WebP animation:', error);
    }
  }

  async pause() {
    if (!this.isPlaying && !this.options.freezeOnPause) return;

    try {
      if (this.options.freezeOnPause) {
        // Create static image for freeze frame if it doesn't exist
        if (!this.staticImage) {
          this.staticImage = this.createStaticImage();
          const container = this.element.parentNode as HTMLElement;
          if (container) {
            container.style.position = 'relative';
            container.insertBefore(this.staticImage, this.element);
          }
        }

        // Show static image and hide animated image
        if (this.staticImage) {
          this.staticImage.style.opacity = '1';
          this.element.style.opacity = '0';
        }
      }

      // Stop animation
      this.element.style.animation = 'none';
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
    if (this.staticImage && this.staticImage.parentNode) {
      this.staticImage.parentNode.removeChild(this.staticImage);
    }
    this.element.style.animation = '';
    this.element.style.opacity = '1';
    this.element.src = this.originalSrc;
  }
}