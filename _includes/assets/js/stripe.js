// Stripe Integration for Shopping Cart
class StripeCheckout {
  constructor() {
    this.stripe = null;
    this.init();
  }

  async init() {
    // Load Stripe.js
    if (!window.Stripe) {
      await this.loadStripeScript();
    }
    
    // Initialize Stripe with publishable key
    // Note: In production, this should come from environment variables
    const publishableKey = this.getStripePublishableKey();
    if (publishableKey) {
      this.stripe = Stripe(publishableKey);
    } else {
      console.warn('Stripe publishable key not found. Checkout will not work.');
    }
  }

  loadStripeScript() {
    return new Promise((resolve, reject) => {
      if (window.Stripe) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  getStripePublishableKey() {
    // Try to get from meta tag first
    const metaTag = document.querySelector('meta[name="stripe-publishable-key"]');
    if (metaTag && metaTag.content && metaTag.content !== 'pk_test_add_your_key_here') {
      return metaTag.content;
    }
    
    // Fallback to environment key for development
    const key = 'pk_test_socmrTD9DyM9vaVSNV7gfxdk';
    console.warn('Using fallback Stripe publishable key');
    return key;
  }

  async createCheckoutSession(cartItems) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    try {
      // In a real application, you would send cart items to your backend
      // Your backend would create a Stripe Checkout Session and return the session ID
      const response = await this.createCheckoutSessionOnBackend(cartItems);
      
      if (response.sessionId) {
        // Redirect to Stripe Checkout
        const { error } = await this.stripe.redirectToCheckout({
          sessionId: response.sessionId
        });

        if (error) {
          console.error('Stripe checkout error:', error);
          throw error;
        }
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }

  async createCheckoutSessionOnBackend(cartItems) {
    console.log('Creating checkout session for:', JSON.stringify(cartItems, null, 2));
    
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        console.error('Response status:', response.status);
        
        // Try to parse as JSON, fallback to text
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          console.error('Parsed error data:', errorData);
          errorMessage = `${errorData.error || 'Unknown error'}`;
          if (errorData.message) errorMessage += ` - ${errorData.message}`;
          if (errorData.details) errorMessage += ` (${errorData.details})`;
          if (errorData.type) errorMessage += ` [${errorData.type}]`;
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          errorMessage = `Server error (${response.status}): ${errorText || response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      console.log('Success response text:', responseText);
      
      // Try to parse the response as JSON
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
        return data;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Raw response text was:', responseText);
        throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 200)}...`);
      }
    } catch (error) {
      console.error('Backend API error:', error);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
  }

  async simulateCheckoutSession(cartItems) {
    // For development - simulate what the Netlify function would do
    console.log('Simulating checkout session creation...');
    
    // Validate items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error('No items provided');
    }

    // For now, redirect to a test Stripe checkout URL
    // In production, this would be replaced with the actual Netlify function
    const testSessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
    
    // Simulate successful response
    return {
      sessionId: testSessionId
    };
  }

  async createCheckoutSessionOnBackendProduction(cartItems) {
    console.log('Creating checkout session for:', cartItems);
    
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        console.error('Response status:', response.status);
        
        // Try to parse as JSON, fallback to text
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          console.error('Parsed error data:', errorData);
          errorMessage = `${errorData.error || 'Unknown error'}`;
          if (errorData.message) errorMessage += ` - ${errorData.message}`;
          if (errorData.details) errorMessage += ` (${errorData.details})`;
          if (errorData.type) errorMessage += ` [${errorData.type}]`;
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          errorMessage = `Server error (${response.status}): ${errorText || response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      console.log('Success response text:', responseText);
      
      // Try to parse the response as JSON
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
        return data;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Raw response text was:', responseText);
        throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 200)}...`);
      }
    } catch (error) {
      console.error('Backend API error:', error);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
  }

  // Alternative: Create payment directly (requires more setup)
  async createPaymentIntent(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // This would call your backend to create a PaymentIntent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        amount: Math.round(total * 100) // Stripe uses cents
      })
    });

    return response.json();
  }

  // Handle successful payment
  handlePaymentSuccess(cartItems) {
    // Clear the cart
    if (window.cart) {
      window.cart.clearCart();
    }
    
    // Redirect to success page or show success message
    window.location.href = '/checkout-success/';
  }

  // Handle payment cancellation
  handlePaymentCancel() {
    // User cancelled payment, return them to cart
    console.log('Payment cancelled by user');
  }
}

// Initialize Stripe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.stripeCheckout = new StripeCheckout();
});