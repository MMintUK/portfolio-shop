// Product Variants Functionality
class ProductVariants {
  constructor() {
    this.form = document.getElementById('product-form');
    this.addToCartBtn = document.getElementById('add-to-cart-btn');
    this.addToCartText = document.getElementById('add-to-cart-text');
    this.currentPrice = document.getElementById('current-price');
    this.basePrice = this.addToCartBtn ? parseFloat(this.addToCartBtn.dataset.productPrice) : 0;
    this.hasVariants = this.addToCartBtn ? this.addToCartBtn.dataset.hasVariants === 'true' : false;
    this.isUpdatingFromGallery = false;
    
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
    this.initializeDefaultSelections();
    
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
        
        // Update images for variant changes that should trigger image updates
        if (!this.isUpdatingFromGallery && this.shouldUpdateImages(e.target)) {
          this.updateProductImages();
        }
      }
    });
  }

  initializeDefaultSelections() {
    // Select the first radio button in each required group if none are selected
    const radioGroups = {};
    
    // Group radio buttons by name
    this.form.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (!radioGroups[radio.name]) {
        radioGroups[radio.name] = [];
      }
      radioGroups[radio.name].push(radio);
    });
    
    // For each group, if no radio is checked, check the first one
    Object.values(radioGroups).forEach(group => {
      const hasChecked = group.some(radio => radio.checked);
      if (!hasChecked && group.length > 0) {
        // Check the first available (non-disabled) radio button
        const firstAvailable = group.find(radio => !radio.disabled);
        if (firstAvailable) {
          firstAvailable.checked = true;
          // Trigger change event to update styling and functionality
          firstAvailable.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }

  // Check if the changed input should trigger image updates
  shouldUpdateImages(input) {
    const name = input.name.toLowerCase();
    console.log('Checking if should update images for input:', name, input.value);
    
    // Update images for any variant that could affect visual appearance
    const shouldUpdate = name.includes('color') || name.includes('colour') || 
           name.includes('frame') || name.includes('style') ||
           name.includes('variant') || name.includes('option') ||
           name.includes('size'); // Add size since it can affect which image to show
    
    console.log('Should update images:', shouldUpdate);
    return shouldUpdate;
  }

  // Method for gallery to signal that it's updating variants
  setUpdatingFromGallery(isUpdating) {
    this.isUpdatingFromGallery = isUpdating;
    if (isUpdating) {
      // Clear the flag after a short delay to prevent permanent blocking
      setTimeout(() => {
        this.isUpdatingFromGallery = false;
      }, 100);
    }
  }

  updatePricing() {
    const variants = this.getSelectedVariants();
    const totalPrice = this.calculateTotalPrice(variants);
    const isAvailable = this.checkAvailability(variants);
    
    // Update price display
    if (this.currentPrice) {
      this.currentPrice.textContent = `£${totalPrice.toFixed(2)}`;
    }
    
    // Update dynamic price differences for priceBySize options
    this.updateDynamicPriceDifferences(variants);
    
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

  updateDynamicPriceDifferences(variants) {
    // Find the current size
    const sizeVariant = Object.values(variants).find(v => 
      v.value && (v.value.includes('cm') || v.value.includes('inch') || v.value.toLowerCase().includes('size'))
    );
    
    if (!sizeVariant) return;
    
    // Update dynamic price differences
    const dynamicPriceDiffs = document.querySelectorAll('.dynamic-price-diff');
    dynamicPriceDiffs.forEach(diffElement => {
      const input = diffElement.closest('.variant-option').querySelector('input');
      if (input && input.dataset.priceBySize) {
        try {
          const priceBySize = JSON.parse(input.dataset.priceBySize);
          const basePrice = parseFloat(diffElement.dataset.basePrice) || this.basePrice;
          const framePrice = priceBySize[sizeVariant.value];
          
          if (framePrice !== undefined) {
            const totalFramedPrice = sizeVariant.price + framePrice;
            const difference = totalFramedPrice - sizeVariant.price;
            
            if (difference > 0) {
              diffElement.textContent = `+£${difference}`;
            } else if (difference < 0) {
              diffElement.textContent = `-£${Math.abs(difference)}`;
            } else {
              diffElement.textContent = '';
            }
          }
        } catch (e) {
          console.warn('Failed to parse priceBySize for dynamic pricing:', e);
        }
      }
    });
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
    // Prevent infinite loops when gallery is updating variants
    if (this.isUpdatingFromGallery) {
      console.log('Skipping image update - currently updating from gallery');
      return;
    }
    
    // Check if gallery is currently updating variants to prevent infinite loops
    if (window.productGallery && typeof window.productGallery.isUpdatingVariantsFromGallery === 'function' && 
        window.productGallery.isUpdatingVariantsFromGallery()) {
      console.log('Skipping image update - gallery is updating variants');
      return;
    }
    
    // Get selected variants
    const variants = this.getSelectedVariants();
    console.log('Updating product images for variants:', variants);
    
    // Find images that match the selected variants
    const matchingImages = this.findMatchingImages(variants);
    console.log('Found matching images:', matchingImages.length, matchingImages);
    
    if (matchingImages.length > 0) {
      // Switch to the first matching image
      console.log('Switching to image:', matchingImages[0]);
      this.switchToImage(matchingImages[0]);
    } else {
      console.log('No matching images found for variants:', variants);
    }
  }

  findMatchingImages(selectedVariants) {
    const allThumbnails = document.querySelectorAll('.thumbnail-item');
    const matchingImages = [];
    
    // Get frame and size selections
    const frameVariant = Object.entries(selectedVariants).find(([name, data]) => 
      name.toLowerCase().includes('frame')
    );
    const sizeVariant = Object.entries(selectedVariants).find(([name, data]) => 
      name.toLowerCase().includes('size') || data.value.includes('cm')
    );
    
    allThumbnails.forEach((thumbnail, index) => {
      const img = thumbnail.querySelector('img');
      if (!img) return;
      
      const imageSrc = img.src || thumbnail.dataset.fullSrc || '';
      const imageAlt = img.alt || thumbnail.dataset.alt || '';
      const imageVariant = thumbnail.dataset.variant;
      
      let bestMatch = null;
      let bestPriority = -1;
      
      // For frame-based image switching, construct the expected variant string
      if (frameVariant && sizeVariant && imageVariant) {
        const frameValue = frameVariant[1].value;
        const sizeValue = sizeVariant[1].value;
        
        // Check for composite variant match (e.g., "black-70cm")
        if (frameValue !== 'none') {
          const expectedVariant = `${frameValue}-${sizeValue.replace(' x ', '').replace('cm x cm', 'cm')}`;
          if (imageVariant.toLowerCase() === expectedVariant.toLowerCase()) {
            bestMatch = {
              index: index,
              thumbnail: thumbnail,
              priority: 15 // Highest priority for exact composite match
            };
          }
        } else {
          // For "none" frame, look for exact "none" variant
          if (imageVariant.toLowerCase() === 'none') {
            bestMatch = {
              index: index,
              thumbnail: thumbnail,
              priority: 10 // High priority for unframed match
            };
          }
        }
      }
      
      // Fallback: check individual variant matches
      if (!bestMatch) {
        for (const [variantName, variantData] of Object.entries(selectedVariants)) {
          const variantValue = variantData.value.toLowerCase();
          let currentPriority = -1;
          
          // Check for exact variant data attribute match
          if (imageVariant && imageVariant.toLowerCase() === variantValue) {
            currentPriority = this.getImagePriority(variantName, variantValue) + 5;
          }
          // Check if image src or alt contains the variant value
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
      let price = 0;
      let priceBySize = null;
      
      // Check if this input has priceBySize data
      if (input.dataset.priceBySize) {
        try {
          priceBySize = JSON.parse(input.dataset.priceBySize);
        } catch (e) {
          console.warn('Failed to parse priceBySize data:', input.dataset.priceBySize);
        }
      } else if (input.dataset.price) {
        price = parseFloat(input.dataset.price);
      }
      
      variants[input.name] = {
        value: input.value,
        price: price,
        priceBySize: priceBySize,
        inStock: input.dataset.inStock === 'true'
      };
    });
    
    // Get select dropdown selections
    const selectInputs = this.form.querySelectorAll('select');
    selectInputs.forEach(select => {
      if (select.value) {
        const selectedOption = select.options[select.selectedIndex];
        let price = 0;
        let priceBySize = null;
        
        if (selectedOption.dataset.priceBySize) {
          try {
            priceBySize = JSON.parse(selectedOption.dataset.priceBySize);
          } catch (e) {
            console.warn('Failed to parse priceBySize data:', selectedOption.dataset.priceBySize);
          }
        } else if (selectedOption.dataset.price) {
          price = parseFloat(selectedOption.dataset.price);
        }
        
        variants[select.name] = {
          value: select.value,
          price: price,
          priceBySize: priceBySize,
          inStock: selectedOption.dataset.inStock === 'true'
        };
      }
    });
    
    return variants;
  }

  calculateTotalPrice(variants) {
    let totalPrice = this.basePrice;
    
    // Find the size variant to use as reference for priceBySize calculations
    const sizeVariant = Object.values(variants).find(v => 
      v.value && (v.value.includes('cm') || v.value.includes('inch') || v.value.toLowerCase().includes('size'))
    );
    
    const sizeValue = sizeVariant ? sizeVariant.value : null;
    
    // Calculate prices for each variant
    const calculatedPrices = [];
    
    Object.values(variants).forEach(variant => {
      if (variant.priceBySize && sizeValue && variant.priceBySize[sizeValue] !== undefined) {
        // Use size-specific pricing
        calculatedPrices.push(parseFloat(variant.priceBySize[sizeValue]));
      } else if (variant.price && !isNaN(variant.price)) {
        // Use regular pricing
        calculatedPrices.push(variant.price);
      }
    });
    
    if (calculatedPrices.length > 0) {
      // Use absolute pricing: take the highest priceBySize value as the total price
      // This allows setting absolute prices for framed vs unframed combinations
      totalPrice = Math.max(...calculatedPrices);
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