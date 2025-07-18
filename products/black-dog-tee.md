---
draft: false
title: "Black Dog White Dog Tee"
description: |
  Step into the enchanting fusion of art and fashion with our paper-cut black and white illustration collection. Embrace the irresistible allure of paper-cut aesthetics and get ready ready to turn heads!
price: 25
basePrice: 25
sku: "BDWD-TEE"
stripeProductId: "prod_tee123"
inStock: true
featured: true
category: "apparel"
images:
  - src: /assets/uploads/70ac9df1-cdb6-425b-a145-6d2a8b02808e.png
    caption: Black Dog White Dog Tee - Black
    variant: "black"
  - src: /assets/uploads/a2a77328-6f9c-4783-ac96-024e59a863fa.png
    caption: Black Dog White Dog Tee - Grey
    variant: "grey"
  - src: /assets/uploads/a718598e-407f-4f47-8174-7c07edaf7408.png
    caption: Black Dog White Dog Tee - White
    variant: "white"
  - src: /assets/uploads/MMINT_APPAREL_ART_PRINTS_Portrait.jpg
    caption: Black Dog White Dog Tee - Lifestyle
  - src: /assets/uploads/64b71abe-fc4b-45b0-bf3d-b5b2994b5b28.png
    caption: Black Dog White Dog Tee - Detail
  - src: /assets/uploads/537b0fc3-1f7b-4bca-9875-087ae627c203.png
    caption: Black Dog White Dog Tee - Detail 
  - src: /assets/uploads/0f63ed0f-f395-430b-958a-611a50d1b12a.png
    caption: Black Dog White Dog Tee - Detail
  - src: /assets/uploads/d7b3b591-4209-4d64-b90a-8d60c2793eed.png
    caption: Black Dog White Dog Tee - Detail
  - src: /assets/uploads/5f94fbe2-2421-40d7-8c18-57fe94576af5.png
    caption: Black Dog White Dog Tee - Detail
  - src: /assets/uploads/cfbc83ac-af7e-4265-ad5f-3bc732af28f6.png
    caption: Black Dog White Dog Tee - Detail    
dimensions:
  care: "Machine wash cold, tumble dry low"
  material: "100% Cotton"
  weight: "180gsm"
date: 2025-01-20T10:00:00.000Z
position: 2
layout: layouts/product.njk
permalink: /shop/{{ title | slug }}/    
variants:
  - name: "Tee Type"
    type: "option"
    required: true
    options:
      - value: "short"
        label: "Short Tee (Gildan 64000)"
        price: 25
        inStock: true
      - value: "long"
        label: "Long Tee (Bella 3001)"
        price: 28
        inStock: true
  - name: "Size"
    type: "size"
    required: true
    conditional: true
    options:
      # Short Tee Sizes
      - value: "S-short"
        label: "Small (46cm x 69cm)"
        price: 25
        inStock: true
        dependsOn: { "tee-type": "short" }
      - value: "M-short"
        label: "Medium (51cm x 71cm)"
        price: 25
        inStock: true
        dependsOn: { "tee-type": "short" }
      - value: "L-short"
        label: "Large (56cm x 74cm)"
        price: 25
        inStock: true
        dependsOn: { "tee-type": "short" }
      - value: "XL-short"
        label: "X-Large (61cm x 76cm)"
        price: 25
        inStock: true
        dependsOn: { "tee-type": "short" }
      - value: "XXL-short"
        label: "XX-Large (66cm x 79cm)"
        price: 28
        inStock: true
        dependsOn: { "tee-type": "short" }
      # Long Tee Sizes
      - value: "S-long"
        label: "Small (46cm x 71cm)"
        price: 28
        inStock: true
        dependsOn: { "tee-type": "long" }
      - value: "M-long"
        label: "Medium (51cm x 74cm)"
        price: 28
        inStock: true
        dependsOn: { "tee-type": "long" }
      - value: "L-long"
        label: "Large (56cm x 76cm)"
        price: 28
        inStock: true
        dependsOn: { "tee-type": "long" }
      - value: "XL-long"
        label: "X-Large (61cm x 79cm)"
        price: 28
        inStock: true
        dependsOn: { "tee-type": "long" }
      - value: "XXL-long"
        label: "XX-Large (66cm x 81cm)"
        price: 30
        inStock: true
        dependsOn: { "tee-type": "long" }
  - name: "Color"
    type: "option"
    required: true
    options:
      - value: "black"
        label: "Black"
        price: 0
        inStock: true
      - value: "grey"
        label: "Grey"
        price: 0
        inStock: true
      - value: "white"
        label: "White"
        price: 0
        inStock: true
---

## Size Chart

{% generateImage {
  src: "/assets/uploads/T-shirt_Chart-01.png",
  alt: "T-shirt Size Chart",
  classes: "size-chart-image",
  outputWidths: ["600", "800", "1200"],
  viewportSizes: "(max-width: 768px) 100vw, 600px"
} %}

*Width is from underarm seam to underarm seam. Height is from the highest point of the collar to the bottom of the t-shirt.