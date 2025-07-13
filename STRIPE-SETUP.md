# Stripe Integration Setup Guide

Your shop now has Stripe integration ready! Here's how to complete the setup:

## 1. Add Your Stripe Keys

Update your `.env` file with your actual Stripe keys:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
```

For production, use your live keys:
```env
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
```

## 2. Backend API Setup

You'll need a backend API to handle checkout sessions. Here's sample code for different platforms:

### Node.js/Express Example:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to pence
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'https://yoursite.com/checkout-success/',
      cancel_url: 'https://yoursite.com/checkout-cancelled/',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### Netlify Functions Example:

Create `netlify/functions/create-checkout-session.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL}/checkout-success/`,
      cancel_url: `${process.env.URL}/checkout-cancelled/`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

## 3. Update Frontend Code

Update the Stripe integration in `_includes/assets/js/stripe.js`:

```javascript
// Replace the mock function with your actual API endpoint
async createCheckoutSessionOnBackend(cartItems) {
  const response = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: cartItems
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}
```

## 4. Product Setup in Stripe Dashboard

1. Log into your Stripe Dashboard
2. Go to Products > Create Product
3. Add your art prints and other items
4. Note the Price IDs and add them to your products

## 5. Webhook Setup (Optional but Recommended)

Set up webhooks to handle order fulfillment:

1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://yoursite.com/.netlify/functions/stripe-webhook`
3. Listen for events: `checkout.session.completed`

## 6. Testing

1. Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
2. Use any future expiry date and any 3-digit CVC

## 7. Go Live

1. Replace test keys with live keys
2. Test with small amounts first
3. Enable webhook endpoints for production

## Current Setup Status

✅ Frontend cart functionality  
✅ Stripe.js integration  
✅ Checkout UI  
✅ Success/Cancel pages  
⏳ Backend API endpoint  
⏳ Stripe product configuration  
⏳ Webhook handling  

Your shop is ready for Stripe integration! Just add your keys and backend API.