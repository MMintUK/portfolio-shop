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
    this.bindEvents();
    this.updatePricing();
  }

  bindEvents() {
    // Listen for changes on all variant inputs
    this.form.addEventListener('change', (e) => {
      if (e.target.matches('input[type="radio"], select')) {
        this.updatePricing();
        this.updateAvailability();
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
    // Check if all required variants are selected and available
    const requiredInputs = this.form.querySelectorAll('input[type="radio"][required], select[required]');
    let allRequiredSelected = true;
    
    requiredInputs.forEach(input => {
      if (input.type === 'radio') {
        const radioGroup = this.form.querySelectorAll(`input[name="${input.name}"]`);
        const selectedRadio = Array.from(radioGroup).find(radio => radio.checked);
        if (!selectedRadio || selectedRadio.dataset.inStock !== 'true') {
          allRequiredSelected = false;
        }
      } else if (input.tagName === 'SELECT') {
        const selectedOption = input.options[input.selectedIndex];
        if (!selectedOption || !selectedOption.value || selectedOption.dataset.inStock !== 'true') {
          allRequiredSelected = false;
        }
      }
    });
    
    if (this.addToCartBtn) {
      this.addToCartBtn.disabled = !allRequiredSelected;
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
    const variants = JSON.parse(button.dataset.productVariants || '{}');
    const variantDisplay = this.getVariantDisplayName(variants);
    
    const product = {
      id: button.dataset.productId + (variantDisplay ? `-${Object.values(variants).map(v => v.value || v).join('-')}` : ''),
      name: button.dataset.productName + (variantDisplay ? ` (${variantDisplay})` : ''),
      price: parseFloat(button.dataset.productPrice),
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