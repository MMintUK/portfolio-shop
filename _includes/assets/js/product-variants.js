// Product Variants Functionality
class ProductVariants {
  constructor() {
    this.form = document.getElementById('product-form');
    this.addToCartBtn = document.getElementById('add-to-cart-btn');
    this.addToCartText = document.getElementById('add-to-cart-text');
    this.currentPrice = document.getElementById('current-price');
    this.basePrice = this.addToCartBtn ? parseFloat(this.addToCartBtn.dataset.productPrice) : 0;
    this.hasVariants = this.addToCartBtn ? this.addToCartBtn.dataset.hasVariants === 'true' : false;
    
    if (this.hasVariants && this.form) {
      this.init();
    }
  }

  init() {
    // Start with disabled add to cart button
    if (this.addToCartBtn) {
      this.addToCartBtn.disabled = true;
      this.addToCartBtn.classList.add('disabled');
    }
    
    this.bindEvents();
    
    // Delay initial validation to allow default selections to be processed
    setTimeout(() => {
      this.updateAvailability();
      this.updatePricing();
      this.updateProductImages();
    }, 50);
  }

  bindEvents() {
    // Listen for changes on all variant inputs
    this.form.addEventListener('change', (e) => {
      if (e.target.matches('input[type="radio"], select')) {
        this.updatePricing();
        this.updateAvailability();
        this.updateProductImages();
      }
    });
  }

  updatePricing() {
    const variants = this.getSelectedVariants();
    const totalPrice = this.calculateTotalPrice(variants);
    const isAvailable = this.checkAvailability(variants);
    
    // Update price display
    if (this.currentPrice) {
      this.currentPrice.textContent = `£${totalPrice.toFixed(2)}`;
    }
    
    // Update add to cart button
    if (this.addToCartBtn && this.addToCartText) {
      this.addToCartText.textContent = `Add to Cart - £${totalPrice.toFixed(2)}`;
      this.addToCartBtn.disabled = !isAvailable;
      
      if (!isAvailable) {
        this.addToCartBtn.classList.add('out-of-stock-btn');
        this.addToCartText.textContent = 'Out of Stock';
      } else {
        this.addToCartBtn.classList.remove('out-of-stock-btn');
      }
      
      // Update data attributes for cart functionality
      this.addToCartBtn.dataset.productPrice = totalPrice.toFixed(2);
      this.addToCartBtn.dataset.productVariants = JSON.stringify(variants);
    }
  }


  updateAvailability() {
    // Check if all required radio button groups have selections
    let allRequiredSelected = true;
    
    // Find all required radio button groups
    const requiredGroups = new Set();
    this.form.querySelectorAll('input[type="radio"][required]').forEach(radio => {
      requiredGroups.add(radio.name);
    });
    
    // Check each required group has a selection
    requiredGroups.forEach(groupName => {
      const selected = this.form.querySelector(`input[name="${groupName}"]:checked`);
      if (!selected) {
        allRequiredSelected = false;
      }
    });
    
    // Also check required select dropdowns
    this.form.querySelectorAll('select[required]').forEach(select => {
      const selectedOption = select.options[select.selectedIndex];
      if (!selectedOption || !selectedOption.value) {
        allRequiredSelected = false;
      }
    });
    
    // Update add to cart button
    if (this.addToCartBtn) {
      this.addToCartBtn.disabled = !allRequiredSelected;
      
      if (!allRequiredSelected) {
        this.addToCartBtn.classList.add('disabled');
        if (this.addToCartText) {
          this.addToCartText.textContent = 'Select Options';
        }
      } else {
        this.addToCartBtn.classList.remove('disabled');
        // Price will be updated by updatePricing()
      }
    }
  }

  updateProductImages() {
    // Get selected variants
    const variants = this.getSelectedVariants();
    
    // Find images that match the selected variants
    const matchingImages = this.findMatchingImages(variants);
    
    if (matchingImages.length > 0) {
      // Switch to the first matching image
      this.switchToImage(matchingImages[0]);
    }
  }

  findMatchingImages(selectedVariants) {
    const allThumbnails = document.querySelectorAll('.thumbnail-item');
    const matchingImages = [];
    
    allThumbnails.forEach((thumbnail, index) => {
      const img = thumbnail.querySelector('img');
      if (!img) return;
      
      // Check if image has variant data attributes or if the src matches variant patterns
      const imageSrc = img.src || thumbnail.dataset.fullSrc || '';
      const imageAlt = img.alt || thumbnail.dataset.alt || '';
      const imageVariant = thumbnail.dataset.variant;
      
      let bestMatch = null;
      let bestPriority = -1;
      
      // Look for variant matches in various ways - check ALL variants to find the best match
      for (const [variantName, variantData] of Object.entries(selectedVariants)) {
        const variantValue = variantData.value.toLowerCase();
        let currentPriority = -1;
        
        // First check for exact variant data attribute match (highest priority)
        if (imageVariant && imageVariant.toLowerCase() === variantValue) {
          currentPriority = this.getImagePriority(variantName, variantValue) + 5; // Higher priority for exact matches
        }
        // Then check if image src or alt contains the variant value
        else if (imageSrc.toLowerCase().includes(variantValue) || 
                 imageAlt.toLowerCase().includes(variantValue)) {
          currentPriority = this.getImagePriority(variantName, variantValue);
        }
        
        // Keep track of the best match for this image
        if (currentPriority > bestPriority) {
          bestPriority = currentPriority;
          bestMatch = {
            index: index,
            thumbnail: thumbnail,
            priority: currentPriority
          };
        }
      }
      
      // Add the best match if we found one
      if (bestMatch) {
        matchingImages.push(bestMatch);
      }
    });
    
    // Sort by priority (higher priority first)
    return matchingImages.sort((a, b) => b.priority - a.priority);
  }

  getImagePriority(variantName, variantValue) {
    // Color variants get highest priority for image switching
    if (variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour')) {
      return 10;
    }
    // Size variants get medium priority
    if (variantName.toLowerCase().includes('size')) {
      return 5;
    }
    // Other variants get lower priority
    return 1;
  }

  switchToImage(imageData) {
    // Use the existing product gallery if available
    if (window.productGallery && typeof window.productGallery.goToImage === 'function') {
      window.productGallery.goToImage(imageData.index);
    } else {
      // Fallback: directly manipulate the main image
      const mainImage = document.getElementById('gallery-main-image');
      if (mainImage && imageData.thumbnail) {
        const fullSrc = imageData.thumbnail.dataset.fullSrc || 
                        imageData.thumbnail.querySelector('img')?.src;
        if (fullSrc) {
          mainImage.src = fullSrc;
          
          // Update active states
          document.querySelectorAll('.thumbnail-item').forEach(thumb => {
            thumb.classList.remove('active');
          });
          imageData.thumbnail.classList.add('active');
        }
      }
    }
  }

  getSelectedVariants() {
    const variants = {};
    
    // Get radio button selections
    const radioInputs = this.form.querySelectorAll('input[type="radio"]:checked');
    radioInputs.forEach(input => {
      variants[input.name] = {
        value: input.value,
        price: parseFloat(input.dataset.price),
        inStock: input.dataset.inStock === 'true'
      };
    });
    
    // Get select dropdown selections
    const selectInputs = this.form.querySelectorAll('select');
    selectInputs.forEach(select => {
      if (select.value) {
        const selectedOption = select.options[select.selectedIndex];
        variants[select.name] = {
          value: select.value,
          price: parseFloat(selectedOption.dataset.price),
          inStock: selectedOption.dataset.inStock === 'true'
        };
      }
    });
    
    return variants;
  }

  calculateTotalPrice(variants) {
    let totalPrice = this.basePrice;
    
    // For products with variants, use the highest priced variant as base
    // or calculate based on the specific variant pricing logic
    const variantPrices = Object.values(variants).map(v => v.price).filter(p => !isNaN(p));
    
    if (variantPrices.length > 0) {
      // For prints and apparel, typically use the selected variant price
      // For add-ons like frames, add to base price
      const maxPrice = Math.max(...variantPrices);
      totalPrice = maxPrice;
      
      // Add any additional options (like frames for prints)
      const additionalOptions = Object.values(variants).filter(v => v.price > 0 && v.price !== maxPrice);
      additionalOptions.forEach(option => {
        totalPrice += option.price;
      });
    }
    
    return totalPrice;
  }

  checkAvailability(variants) {
    // Check if all selected variants are in stock
    return Object.values(variants).every(variant => variant.inStock);
  }

  validateAllRequiredVariants() {
    // Check if all required radio button groups have selections
    const requiredGroups = new Set();
    this.form.querySelectorAll('input[type="radio"][required]').forEach(radio => {
      requiredGroups.add(radio.name);
    });
    
    // Check each required group has a selection
    for (const groupName of requiredGroups) {
      const selected = this.form.querySelector(`input[name="${groupName}"]:checked`);
      if (!selected) {
        return false;
      }
    }
    
    // Also check required select dropdowns
    const requiredSelects = this.form.querySelectorAll('select[required]');
    for (const select of requiredSelects) {
      const selectedOption = select.options[select.selectedIndex];
      if (!selectedOption || !selectedOption.value) {
        return false;
      }
    }
    
    return true;
  }

  getVariantDisplayName(variants) {
    const variantNames = [];
    
    Object.entries(variants).forEach(([key, variant]) => {
      if (variant.value && variant.value !== 'none') {
        variantNames.push(`${key}: ${variant.value}`);
      }
    });
    
    return variantNames.join(', ');
  }

  addToCart(button) {
    // First, validate that all required variants are selected
    if (!this.validateAllRequiredVariants()) {
      alert('Please select all required options before adding to cart.');
      return;
    }
    
    const variants = this.getSelectedVariants();
    const variantDisplay = this.getVariantDisplayName(variants);
    
    const product = {
      id: button.dataset.productId + (variantDisplay ? `-${Object.values(variants).map(v => v.value || v).join('-')}` : ''),
      name: button.dataset.productName + (variantDisplay ? ` (${variantDisplay})` : ''),
      price: this.calculateTotalPrice(variants),
      stripeId: button.dataset.stripeId,
      variants: variants,
      quantity: 1
    };
    
    if (!window.cart) {
      return;
    }
    
    // Check if this exact variant combination already exists in cart
    const existingItemIndex = window.cart.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      window.cart.items[existingItemIndex].quantity += 1;
    } else {
      window.cart.items.push(product);
    }
    
    window.cart.saveCart();
    window.cart.updateCartDisplay();
    window.cart.updateCartCount();
    window.cart.showAddedToCartMessage(product.name);
    
    // Show feedback
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1000);
  }
}

// Initialize product variants when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.productVariants = new ProductVariants();
});