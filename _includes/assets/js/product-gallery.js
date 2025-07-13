class ProductGallery {
  constructor() {
    this.mainImages = document.querySelectorAll('.product-image-large');
    this.thumbnails = document.querySelectorAll('.thumbnail-wrapper');
    this.currentIndex = 0;
    
    if (this.mainImages.length > 1 && this.thumbnails.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.bindEvents();
    this.setActiveImage(0);
  }
  
  bindEvents() {
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.setActiveImage(index);
      });
    });
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousImage();
      } else if (e.key === 'ArrowRight') {
        this.nextImage();
      }
    });
  }
  
  setActiveImage(index) {
    if (index < 0 || index >= this.mainImages.length) return;
    
    // Update main images
    this.mainImages.forEach((img, i) => {
      if (i === index) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
    
    // Update thumbnails
    this.thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
    
    this.currentIndex = index;
  }
  
  nextImage() {
    const nextIndex = (this.currentIndex + 1) % this.mainImages.length;
    this.setActiveImage(nextIndex);
  }
  
  previousImage() {
    const prevIndex = this.currentIndex === 0 ? this.mainImages.length - 1 : this.currentIndex - 1;
    this.setActiveImage(prevIndex);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.productGallery = new ProductGallery();
});