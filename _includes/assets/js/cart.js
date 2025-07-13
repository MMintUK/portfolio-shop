// Shopping Cart Functionality
class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartDisplay();
    this.updateCartCount();
  }

  bindEvents() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      // Check if the clicked element or its parent is an add-to-cart button
      let button = e.target;
      if (e.target.tagName === 'SPAN' && e.target.closest('.add-to-cart-btn')) {
        button = e.target.closest('.add-to-cart-btn');
      }
      
      if (button.classList && button.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        this.addToCart(button);
      }
      
      if (e.target.classList.contains('remove-item-btn')) {
        e.preventDefault();
        this.removeFromCart(e.target.dataset.productId);
      }
      
      if (e.target.id === 'checkout-btn') {
        e.preventDefault();
        this.proceedToCheckout();
      }
    });

    // Quantity changes
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('quantity-input')) {
        const productId = e.target.dataset.productId;
        const quantity = parseInt(e.target.value);
        this.updateQuantity(productId, quantity);
      }
    });
  }

  addToCart(button) {
    const hasVariants = button.dataset.hasVariants === 'true';
    
    if (hasVariants && window.productVariants && typeof window.productVariants.addToCart === 'function') {
      // Use enhanced variant handling from product-variants.js
      window.productVariants.addToCart(button);
      return;
    }
    
    const product = {
      id: button.dataset.productId,
      name: button.dataset.productName,
      price: parseFloat(button.dataset.productPrice),
      stripeId: button.dataset.stripeId,
      quantity: 1
    };

    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push(product);
    }

    this.saveCart();
    this.updateCartDisplay();
    this.updateCartCount();
    this.showAddedToCartMessage(product.name);
  }

  removeFromCart(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
    this.updateCartCount();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
      }
    }
  }

  updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return; // Not on cart page

    if (this.items.length === 0) {
      cartContainer.style.display = 'none';
      cartSummary.style.display = 'none';
      cartEmpty.style.display = 'block';
      return;
    }

    cartEmpty.style.display = 'none';
    cartContainer.style.display = 'block';
    cartSummary.style.display = 'block';

    // Render cart items
    cartContainer.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="cart-item-price">£${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <label for="qty-${item.id}">Quantity:</label>
          <input type="number" 
                 id="qty-${item.id}"
                 class="quantity-input" 
                 data-product-id="${item.id}"
                 value="${item.quantity}" 
                 min="1" 
                 max="10">
          <button class="remove-item-btn" data-product-id="${item.id}">
            Remove
          </button>
        </div>
        <div class="cart-item-total">
          £${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');

    // Update total
    const total = this.getTotal();
    const totalElement = document.getElementById('cart-total-amount');
    if (totalElement) {
      totalElement.textContent = total.toFixed(2);
    }
  }

  updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'inline' : 'none';
    });
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  async proceedToCheckout() {
    if (this.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Show loading state
    const checkoutBtn = document.getElementById('checkout-btn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Processing...';
    checkoutBtn.disabled = true;

    try {
      // Use Stripe Checkout if available
      if (window.stripeCheckout && window.stripeCheckout.stripe) {
        await window.stripeCheckout.createCheckoutSession(this.items);
      } else {
        // Fallback for development - show order summary
        this.showCheckoutInstructions();
      }
    } catch (error) {
      console.error('Checkout error:', error);
      this.showCheckoutError(error.message);
    } finally {
      // Restore button state
      checkoutBtn.textContent = originalText;
      checkoutBtn.disabled = false;
    }
  }

  showCheckoutInstructions() {
    const total = this.getTotal();
    const itemsList = this.items.map(item => 
      `• ${item.name} (Qty: ${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `Order Summary:
${itemsList}

Total: £${total.toFixed(2)}

To complete Stripe integration:
1. Add your Stripe publishable key
2. Set up a backend API for checkout sessions
3. Configure webhook handling for order processing

Your order details are ready for Stripe checkout!`;

    alert(message);
  }

  showCheckoutError(errorMessage) {
    alert(`Checkout Error:\n\n${errorMessage}`);
  }

  showAddedToCartMessage(productName) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  saveCart() {
    localStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }

  loadCart() {
    const saved = localStorage.getItem('shopping-cart');
    return saved ? JSON.parse(saved) : [];
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
    this.updateCartCount();
  }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new ShoppingCart();
});

// Add some basic CSS for cart notifications
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.cart-notification {
  font-family: inherit;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
`;
document.head.appendChild(style);