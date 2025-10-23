---
draft: false
title: "NEON NIGHT | Print"
description: |
  A juxtaposition of fashion and Japanese poster typography. 
price: 70
basePrice: 70
sku: "NEON-NIGHT-PRINT"
stripeProductId: "prod_print_neon_night"
inStock: true
inventory: -1
featured: true
category: "prints"
variants:
  - name: "Size"
    type: "size"
    required: true
    options:
        - value: "75cm x 75cm"
          label: "75cm x 75cm"
          price: 100
          inStock: true
        - value: "50cm x 50cm"
          label: "50cm x 50cm"
          price: 70
          inStock: true
  - name: "Frame"
    type: "option"
    required: true
    options:
      - value: "none"
        label: "Unframed"
        priceBySize:
          "50cm x 50cm": 70
          "75cm x 75cm": 100
        inStock: true
      - value: "framed"
        label: "Framed"
        priceBySize:
          "50cm x 50cm": 200
          "75cm x 75cm": 300
        images:
          - src: /assets/uploads/Neon_Night_50_50.webp
            caption: 50cm x 50cm Framed
            variant: "framed-50cm"
          - src: /assets/uploads/Neon_Night_75_75.webp
            caption: 75cm x 75cm Framed
            variant: "framed-75cm"
        inStock: true
images:
  - src: /assets/uploads/Neon_Night_75_75.webp
    caption: 75cm x 75cm Framed
    variant: "framed-75cm"
  - src: /assets/uploads/Neon_Night_50_50.webp
    caption: 50cm x 50cm Framed
    variant: "framed-50cm"
  - src: /assets/uploads/Neon_Night_Print_1660.jpg
    caption: Unframed Print
    variant: "none"
#additionalImages:
#  - src: /assets/uploads/Neon_Night_Mockup.webp
#    caption: MockUp            
date: 2024-01-13T10:00:00.000Z
position: 6
layout: layouts/product.njk
permalink: /shop/{{ title | slug }}/
---
*Includes VAT & Shipping

**Print Details:**
- Premium 250gsm Paper Stock
- Professional Printing
- Pine Wood Frame*
- Shatterproof Plexiglass*
