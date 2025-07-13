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
            description: item.variants ? `Variants: ${Object.entries(item.variants).map(([key, variant]) => `${key}: ${variant.value}`).join(', ')}` : undefined,
            metadata: {
              base_product: item.name.split(' (')[0], // Get base product name without variants
              variants: item.variants ? JSON.stringify(item.variants) : '',
              product_id: item.id,
            },
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
      // Collect customer email for receipts
      customer_creation: 'always',
      // Set locale to UK
      locale: 'en-GB',
      // Optional: Add shipping address collection
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU'], // Adjust countries as needed
      },
      // Optional: Add billing address collection
      billing_address_collection: 'required',
      // Add session metadata for order tracking
      metadata: {
        order_from: 'MMINT.UK',
        items_summary: items.map(item => `${item.name} (Qty: ${item.quantity})`).join('; '),
        total_items: items.reduce((sum, item) => sum + item.quantity, 0).toString(),
      },
      // Enable automatic receipt emails
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: 'Purchase from MMINT.UK',
          metadata: {
            order_details: items.map(item => `${item.name} - £${item.price} x ${item.quantity}`).join('; '),
          },
          rendering_options: {
            amount_tax_display: 'include_inclusive_tax',
          },
        },
      },
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