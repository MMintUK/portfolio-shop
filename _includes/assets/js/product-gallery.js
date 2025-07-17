/**
 * ProductGallery - Rebuilt from scratch
 * Handles thumbnail gallery with responsive image display
 * Features: portrait/landscape handling, square thumbnail cropping, keyboard navigation
 */
class ProductGallery {
  constructor() {
    // Core elements
    this.galleryWidget = document.querySelector('.thumbnail-gallery-widget');
    this.displayWindow = document.querySelector('.image-display-window');
    this.mainImage = document.getElementById('gallery-main-image');
    this.thumbnailContainer = document.getElementById('thumbnail-gallery');
    this.thumbnails = [];
    
    // State
    this.currentIndex = 0;
    this.images = [];
    this.isLoading = false;
    this.isMobileZoomed = false;
    
    if (this.galleryWidget && this.mainImage && this.thumbnailContainer) {
      this.init();
    }
  }
  
  init() {
    this.collectImageData();
    this.bindEvents();
    this.setupResponsiveHandling();
    
    // Load first image
    if (this.images.length > 0) {
      this.showImage(0);
    }
  }
  
  collectImageData() {
    // Get all thumbnail elements
    this.thumbnails = Array.from(this.thumbnailContainer.querySelectorAll('.thumbnail-item'));
    
    // Extract image data from thumbnails
    this.images = this.thumbnails.map((thumbnail, index) => {
      const alt = thumbnail.dataset.alt || '';
      
      // First priority: get high-res image from hidden product-images section
      const productImages = document.querySelectorAll('.product-images .product-image-large img');
      let displaySrc = null;
      
      if (productImages[index]) {
        displaySrc = productImages[index].src;
      }
      
      // If no product image found, try to construct high-res path from thumbnail
      if (!displaySrc) {
        const thumbnailImg = thumbnail.querySelector('.thumbnail-image img');
        if (thumbnailImg) {
          let thumbnailSrc = thumbnailImg.src;
          // Try to upgrade resolution by replacing size indicators
          if (thumbnailSrc.includes('-150.')) {
            displaySrc = thumbnailSrc.replace('-150.', '-1080.');
          } else if (thumbnailSrc.includes('-300.')) {
            displaySrc = thumbnailSrc.replace('-300.', '-1080.');
          } else {
            displaySrc = thumbnailSrc;
          }
        }
      }
      
      // Final fallback: use data-full-src
      if (!displaySrc) {
        displaySrc = thumbnail.dataset.fullSrc;
      }
      
      return {
        index,
        fullSrc: displaySrc,
        alt,
        thumbnailSrc: thumbnail.querySelector('.thumbnail-image img')?.src || '',
        thumbnail
      };
    });
  }
  
  bindEvents() {
    // Thumbnail clicks
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        this.showImage(index);
      });
    });
    
    // Zoom and pan on hover
    this.setupZoomAndPan();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.galleryWidget.contains(document.activeElement) && 
          document.activeElement !== document.body) {
        return; // Only handle keys when gallery area has focus or no specific focus
      }
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextImage();
          break;
        case 'Home':
          e.preventDefault();
          this.showImage(0);
          break;
        case 'End':
          e.preventDefault();
          this.showImage(this.images.length - 1);
          break;
      }
    });
    
    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }
  
  setupResponsiveHandling() {
    // Ensure display window maintains proper size within left column
    this.updateDisplayWindowSize();
  }
  
  setupZoomAndPan() {
    if (!this.displayWindow || !this.mainImage) return;
    
    // Mouse events for desktop
    this.displayWindow.addEventListener('mousemove', (e) => {
      const rect = this.displayWindow.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      this.mainImage.style.transformOrigin = `${x}% ${y}%`;
    });
    
    this.displayWindow.addEventListener('mouseleave', () => {
      this.mainImage.style.transformOrigin = 'center';
    });
    
    // Touch events for mobile
    this.displayWindow.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.isMobileZoomed = true;
      this.displayWindow.classList.add('mobile-zoomed');
      
      const touch = e.touches[0];
      const rect = this.displayWindow.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      
      this.mainImage.style.transformOrigin = `${x}% ${y}%`;
    });
    
    this.displayWindow.addEventListener('touchmove', (e) => {
      if (!this.isMobileZoomed) return;
      
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      const rect = this.displayWindow.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      
      this.mainImage.style.transformOrigin = `${x}% ${y}%`;
    });
    
    this.displayWindow.addEventListener('touchend', () => {
      this.isMobileZoomed = false;
      this.displayWindow.classList.remove('mobile-zoomed');
      this.mainImage.style.transformOrigin = 'center';
    });
    
    this.displayWindow.addEventListener('touchcancel', () => {
      this.isMobileZoomed = false;
      this.displayWindow.classList.remove('mobile-zoomed');
      this.mainImage.style.transformOrigin = 'center';
    });
  }
  
  updateDisplayWindowSize() {
    if (!this.displayWindow) return;
    
    const container = this.displayWindow.closest('.product-images-column');
    if (container) {
      const containerWidth = container.offsetWidth;
      
      // Ensure window doesn't exceed container width
      this.displayWindow.style.maxWidth = `${containerWidth}px`;
      
      // Remove any height overrides to maintain CSS square aspect ratio
      this.displayWindow.style.height = '';
    }
  }
  
  showImage(index) {
    if (index < 0 || index >= this.images.length || this.isLoading) return;
    
    const imageData = this.images[index];
    if (!imageData) return;
    
    this.isLoading = true;
    this.mainImage.classList.add('loading');
    
    // Create a new image to preload
    const newImage = new Image();
    
    newImage.onload = () => {
      // Update main image
      this.mainImage.src = newImage.src;
      this.mainImage.alt = imageData.alt;
      
      // Update active states
      this.updateActiveStates(index);
      
      // Update current index
      this.currentIndex = index;
      
      // Remove loading state
      this.mainImage.classList.remove('loading');
      this.isLoading = false;
      
      // Ensure proper image positioning
      this.optimizeImageDisplay(newImage);
    };
    
    newImage.onerror = () => {
      console.warn(`Failed to load image: ${imageData.fullSrc}`);
      // Try thumbnail version as fallback
      if (imageData.thumbnailSrc && imageData.thumbnailSrc !== imageData.fullSrc) {
        newImage.src = imageData.thumbnailSrc;
      } else {
        this.isLoading = false;
        this.mainImage.classList.remove('loading');
      }
    };
    
    // Start loading the full resolution image
    newImage.src = imageData.fullSrc;
  }
  
  optimizeImageDisplay(img) {
    // All images now use object-fit: contain within the square window
    // No additional styling needed as CSS handles the square aspect ratio
  }
  
  updateActiveStates(activeIndex) {
    this.thumbnails.forEach((thumbnail, index) => {
      if (index === activeIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }
  
  nextImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(nextIndex);
  }
  
  previousImage() {
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.showImage(prevIndex);
  }
  
  handleResize() {
    this.updateDisplayWindowSize();
    
    // Re-optimize current image display
    if (this.mainImage.src) {
      const img = new Image();
      img.onload = () => {
        this.optimizeImageDisplay(img);
      };
      img.src = this.mainImage.src;
    }
  }
  
  // Public API methods
  getCurrentIndex() {
    return this.currentIndex;
  }
  
  getTotalImages() {
    return this.images.length;
  }
  
  goToImage(index) {
    this.showImage(index);
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.productGallery = new ProductGallery();
});