// Smooth sticky solution with position switching
class StickyProductDetails {
  constructor() {
    this.stickyElement = document.querySelector('.product-content-sticky');
    this.container = document.querySelector('.product-container');
    this.imagesColumn = document.querySelector('.product-images-column');
    this.contentColumn = document.querySelector('.product-content-column');
    
    if (!this.stickyElement || window.innerWidth <= 768) return;
    
    this.init();
  }

  init() {
    this.isSticky = false;
    this.isBottom = false;
    this.originalTop = this.stickyElement.offsetTop;
    
    // Store original styles
    this.originalStyle = {
      position: this.stickyElement.style.position,
      top: this.stickyElement.style.top,
      width: this.stickyElement.style.width,
      zIndex: this.stickyElement.style.zIndex
    };
    
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  handleScroll() {
    const containerRect = this.container.getBoundingClientRect();
    const imagesRect = this.imagesColumn.getBoundingClientRect();
    const stickyRect = this.stickyElement.getBoundingClientRect();
    
    const containerTop = containerRect.top;
    const imagesBottom = imagesRect.bottom;
    const stickyHeight = stickyRect.height;
    
    if (containerTop > 0) {
      // Above the sticky zone
      this.makeNormal();
    } else if (imagesBottom > stickyHeight) {
      // In sticky zone
      this.makeSticky();
    } else {
      // Bottom zone - content should scroll with images
      this.makeBottom();
    }
  }

  makeNormal() {
    if (!this.isSticky && !this.isBottom) return;
    
    this.isSticky = false;
    this.isBottom = false;
    
    Object.assign(this.stickyElement.style, this.originalStyle);
  }

  makeSticky() {
    if (this.isSticky && !this.isBottom) return;
    
    this.isSticky = true;
    this.isBottom = false;
    
    const columnRect = this.contentColumn.getBoundingClientRect();
    
    this.stickyElement.style.position = 'fixed';
    this.stickyElement.style.top = '0px';
    this.stickyElement.style.left = `${columnRect.left}px`;
    this.stickyElement.style.width = `${columnRect.width}px`;
    this.stickyElement.style.zIndex = '100';
  }

  makeBottom() {
    if (this.isBottom) return;
    
    this.isSticky = false;
    this.isBottom = true;
    
    const imagesRect = this.imagesColumn.getBoundingClientRect();
    const columnRect = this.contentColumn.getBoundingClientRect();
    const stickyHeight = this.stickyElement.offsetHeight;
    
    // Position relative to the content column, not absolutely
    const maxTranslate = this.imagesColumn.offsetHeight - stickyHeight;
    
    this.stickyElement.style.position = 'relative';
    this.stickyElement.style.top = `${maxTranslate}px`;
    this.stickyElement.style.left = '0';
    this.stickyElement.style.width = '100%';
    this.stickyElement.style.zIndex = '100';
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      Object.assign(this.stickyElement.style, this.originalStyle);
      return;
    }
    
    this.handleScroll();
  }
}

// Initialize sticky product details when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.stickyProductDetails = new StickyProductDetails();
});