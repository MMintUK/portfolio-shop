// Shop Category Filter Functionality
class ShopFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.productItems = document.querySelectorAll('.product-item');
    this.currentFilter = 'prints';
    
    this.init();
  }

  init() {
    if (this.filterButtons.length === 0) return;
    
    this.bindEvents();
    this.filterProducts('prints'); // Show prints by default
  }

  bindEvents() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.dataset.category;
        this.filterProducts(category);
        this.updateActiveButton(button);
      });
    });
  }

  filterProducts(category) {
    this.currentFilter = category;
    
    this.productItems.forEach(item => {
      const itemCategory = item.dataset.category;
      
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  updateActiveButton(activeButton) {
    // Remove active class from all buttons
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
  }

  showAllProducts() {
    this.productItems.forEach(item => {
      item.classList.remove('hidden');
    });
  }

  // Get current filter (useful for debugging)
  getCurrentFilter() {
    return this.currentFilter;
  }

  // Get visible product count (useful for debugging)
  getVisibleProductCount() {
    return this.productItems.length - document.querySelectorAll('.product-item.hidden').length;
  }
}

// Initialize shop filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.shopFilter = new ShopFilter();
});