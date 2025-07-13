exports.handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Check if Stripe secret key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error: Missing Stripe secret key' 
        })
      };
    }

    // Initialize Stripe with the secret key
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    console.log('Request body:', event.body);
    const { items } = JSON.parse(event.body);
    console.log('Parsed items:', items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No items provided' })
      };
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            // You can add more product data here like images
            // images: ['https://yoursite.com/product-image.jpg'],
          },
          unit_amount: Math.round(item.price * 100), // Convert pounds to pence
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL || 'https://localhost:8080'}/checkout-success/`,
      cancel_url: `${process.env.URL || 'https://localhost:8080'}/checkout-cancelled/`,
      // Optional: Add customer email collection
      customer_email: null, // You can enable this: customer_email: 'required'
      // Optional: Add shipping address collection
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU'], // Adjust countries as needed
      },
      // Optional: Add billing address collection
      billing_address_collection: 'required',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id })
    };

  } catch (error) {
    console.error('Stripe error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        message: error.message,
        type: error.type || 'unknown',
        details: error.code || 'No error code'
      })
    };
  }
};