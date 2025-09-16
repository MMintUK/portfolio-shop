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
    this.isUpdatingVariants = false; // Prevent infinite loops
    
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
    } else {
      // If no images found initially, try again after a short delay
      // This handles cases where layout changes affect element visibility
      setTimeout(() => {
        this.collectImageData();
        if (this.images.length > 0) {
          this.showImage(0);
        }
      }, 100);
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
    
    // Touch events for mobile - only prevent default when zooming is intended
    this.displayWindow.addEventListener('touchstart', (e) => {
      // Only prevent default on the image itself, not on text content
      const target = e.target;
      if (target === this.mainImage || target === this.displayWindow) {
        e.preventDefault();
        this.isMobileZoomed = true;
        this.displayWindow.classList.add('mobile-zoomed');
        
        const touch = e.touches[0];
        const rect = this.displayWindow.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        
        this.mainImage.style.transformOrigin = `${x}% ${y}%`;
      }
    });
    
    this.displayWindow.addEventListener('touchmove', (e) => {
      if (!this.isMobileZoomed) return;
      
      // Only prevent scrolling when we're actually zooming
      if (this.displayWindow.classList.contains('mobile-zoomed')) {
        e.preventDefault();
      }
      
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
    
    // Check if we're on mobile (where product-images-column uses display: contents)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, use viewport width minus padding
      const viewportWidth = window.innerWidth;
      const padding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--space') || '16px');
      this.displayWindow.style.maxWidth = `${viewportWidth}px`;
      this.displayWindow.style.height = '';
    } else {
      // Desktop: use the product-images-column container
      const container = this.displayWindow.closest('.product-images-column');
      if (container) {
        const containerWidth = container.offsetWidth;
        
        // Ensure window doesn't exceed container width
        this.displayWindow.style.maxWidth = `${containerWidth}px`;
        
        // Remove any height overrides to maintain CSS square aspect ratio
        this.displayWindow.style.height = '';
      }
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
    // Calculate optimal zoom scale based on image vs container dimensions
    const containerRect = this.displayWindow.getBoundingClientRect();
    const containerSize = Math.min(containerRect.width, containerRect.height);
    
    // Calculate the scale needed to show image at full resolution
    const scaleX = img.naturalWidth / containerSize;
    const scaleY = img.naturalHeight / containerSize;
    const maxScale = Math.max(scaleX, scaleY);
    
    // Don't zoom smaller than current size, and cap at a reasonable maximum
    const optimalScale = Math.min(Math.max(maxScale, 1), 4);
    
    // Store the optimal scale as a CSS custom property
    this.mainImage.style.setProperty('--optimal-zoom-scale', optimalScale);
  }
  
  updateActiveStates(activeIndex) {
    this.thumbnails.forEach((thumbnail, index) => {
      if (index === activeIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
    
    // Update variant form to match the selected image
    this.updateVariantsFromImage(activeIndex);
  }
  
  updateVariantsFromImage(imageIndex) {
    // Prevent infinite loops between gallery and variant updates
    if (this.isUpdatingVariants) return;
    
    const imageData = this.images[imageIndex];
    if (!imageData || !imageData.thumbnail) return;
    
    // Find the product form
    const productForm = document.getElementById('product-form');
    if (!productForm) return;
    
    // Set flag to prevent variant system from updating gallery
    this.isUpdatingVariants = true;
    
    const variant = imageData.thumbnail.dataset.variant;
    const caption = imageData.thumbnail.dataset.alt || imageData.alt || '';
    const imageSrc = imageData.fullSrc || '';
    
    // Debug logging
    console.log('Gallery updating variants for image:', imageIndex, {
      variant,
      caption,
      imageSrc: imageSrc.substring(imageSrc.lastIndexOf('/') + 1) // just filename
    });
    
    // Try variant attribute first
    if (variant) {
      this.setVariantFromString(variant, productForm);
    } 
    // Fallback: try to extract variant info from caption or filename
    else if (caption || imageSrc) {
      this.setVariantFromImageInfo(caption, imageSrc, productForm);
    }
    
    // Reset flag after a short delay
    setTimeout(() => {
      this.isUpdatingVariants = false;
    }, 100);
  }
  
  setVariantFromImageInfo(caption, imageSrc, form) {
    // Try to extract variant information from caption or image filename
    const info = `${caption} ${imageSrc}`.toLowerCase();
    
    // Check for color variants
    const colors = ['black', 'white', 'grey', 'gray', 'red', 'blue', 'green', 'yellow', 'pink', 'navy', 'brown'];
    const foundColor = colors.find(color => info.includes(color));
    if (foundColor) {
      this.selectVariantByValue(foundColor, form);
    }
    
    // Check for size variants (T-shirt sizes)
    const sizes = ['xs', 'small', 'medium', 'large', 'xl', 'xxl', 's', 'm', 'l'];
    const foundSize = sizes.find(size => {
      // Look for exact matches or common size patterns
      return info.includes(` ${size} `) || info.includes(`_${size}_`) || 
             info.includes(`${size}.`) || info.includes(`${size},`) ||
             info.endsWith(size);
    });
    if (foundSize) {
      this.selectVariantByValue(foundSize.toUpperCase(), form);
    }
  }
  
  setVariantFromString(variantString, form) {
    // Handle different variant patterns
    if (variantString === 'none') {
      // Select unframed option
      this.selectFrameVariant('none', form);
    } else if (variantString.includes('-')) {
      // Handle composite variants like "pine-90cm", "black-45cm", etc.
      const parts = variantString.split('-');
      if (parts.length >= 2) {
        const frameType = parts[0]; // e.g., "pine", "black", "white"
        const sizePart = parts[1]; // e.g., "90cm", "45cm"
        
        // Select frame variant
        this.selectFrameVariant(frameType, form);
        
        // Select size variant - try to match with size options
        this.selectSizeVariant(sizePart, form);
      }
    } else {
      // Try to match single variants
      this.selectVariantByValue(variantString, form);
    }
  }
  
  selectFrameVariant(frameType, form) {
    // Find frame-related inputs (radio buttons or select)
    const frameInputs = form.querySelectorAll('input[name*="frame" i], select[name*="frame" i]');
    
    frameInputs.forEach(input => {
      if (input.type === 'radio') {
        // For radio buttons, check if the value matches
        if (input.value.toLowerCase() === frameType.toLowerCase() || 
            (frameType === 'none' && (input.value === 'none' || input.value === 'unframed'))) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else if (input.tagName === 'SELECT') {
        // For select dropdowns
        const options = Array.from(input.options);
        const matchingOption = options.find(option => 
          option.value.toLowerCase() === frameType.toLowerCase() ||
          (frameType === 'none' && (option.value === 'none' || option.value === 'unframed'))
        );
        if (matchingOption) {
          input.value = matchingOption.value;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }
  
  selectSizeVariant(sizePart, form) {
    // Find size-related inputs
    const sizeInputs = form.querySelectorAll('input[name*="size" i], select[name*="size" i]');
    
    // Create mapping for common size patterns
    const sizeMap = {
      '45cm': ['45cm x 30cm', '45 x 30', '45cm', '45'],
      '60cm': ['60cm x 40cm', '60 x 40', '60cm', '60'],
      '90cm': ['90cm x 60cm', '90 x 60', '90cm', '90']
    };
    
    // Get possible matches for this size part
    const possibleMatches = sizeMap[sizePart] || [sizePart];
    
    console.log('Selecting size variant:', sizePart, 'possible matches:', possibleMatches);
    
    let matchFound = false; // Prevent multiple selections
    
    sizeInputs.forEach(input => {
      if (matchFound) return; // Skip if we already found a match
      
      if (input.type === 'radio') {
        // For radio buttons, check against all possible matches
        const inputValue = input.value.toLowerCase();
        console.log('Checking radio button:', input.value, 'against possible matches:', possibleMatches);
        
        const found = possibleMatches.some(match => {
          const matchValue = match.toLowerCase();
          const exactMatch = inputValue === matchValue;
          
          // For precise matching of dimensions, we need to be careful about partial matches
          let preciseMatch = false;
          
          if (exactMatch) {
            preciseMatch = true;
          } else if (matchValue.includes('cm x')) {
            // Full dimension format - must be exact match
            preciseMatch = false;
          } else if (matchValue.endsWith('cm')) {
            // Size format like "60cm" - check if input starts with this dimension
            const sizeNumber = matchValue.replace('cm', '');
            // Input should start with the size number followed by 'cm'
            preciseMatch = inputValue.startsWith(sizeNumber + 'cm');
          } else {
            // For other formats, use word boundary matching
            const regex = new RegExp('\\b' + matchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
            preciseMatch = regex.test(inputValue);
          }
          
          console.log(`  Match "${match}": exact=${exactMatch}, precise=${preciseMatch}`);
          return preciseMatch;
        });
        
        if (found) {
          console.log('✓ Found matching radio button:', input.value);
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          matchFound = true; // Mark that we found a match
        } else {
          console.log('✗ No match for radio button:', input.value);
        }
      } else if (input.tagName === 'SELECT' && !matchFound) {
        // For select dropdowns
        const options = Array.from(input.options);
        const matchingOption = options.find(option => {
          return possibleMatches.some(match => {
            const optionValue = option.value.toLowerCase();
            const matchValue = match.toLowerCase();
            return optionValue === matchValue || optionValue.includes(matchValue);
          });
        });
        
        if (matchingOption) {
          console.log('Found matching select option:', matchingOption.value);
          input.value = matchingOption.value;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }
  
  selectVariantByValue(variantValue, form) {
    // Try to find any input that matches this variant value
    const allInputs = form.querySelectorAll('input[type="radio"], select');
    const lowerValue = variantValue.toLowerCase();
    
    allInputs.forEach(input => {
      if (input.type === 'radio') {
        const inputValue = input.value.toLowerCase();
        const inputLabel = input.nextElementSibling?.textContent?.toLowerCase() || '';
        
        // Check exact match, partial match, or label match
        if (inputValue === lowerValue || 
            inputValue.includes(lowerValue) || 
            lowerValue.includes(inputValue) ||
            inputLabel.includes(lowerValue)) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else if (input.tagName === 'SELECT') {
        const options = Array.from(input.options);
        const matchingOption = options.find(option => {
          const optionValue = option.value.toLowerCase();
          const optionText = option.textContent.toLowerCase();
          
          return optionValue === lowerValue || 
                 optionValue.includes(lowerValue) || 
                 lowerValue.includes(optionValue) ||
                 optionText.includes(lowerValue);
        });
        
        if (matchingOption) {
          input.value = matchingOption.value;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
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
  
  // Check if gallery is currently updating variants (to prevent loops)
  isUpdatingVariantsFromGallery() {
    return this.isUpdatingVariants;
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add a small delay to ensure CSS layout changes have been applied
  setTimeout(() => {
    window.productGallery = new ProductGallery();
  }, 50);
});