export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  inStock: boolean
  features: string[]
  sizes?: string[]
}

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Illuminated Channel Letters',
    category: 'Exterior Signs',
    price: 2499.99,
    description: 'Custom LED-illuminated channel letters for maximum visibility day and night. Perfect for storefronts and building facades.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba2b4600d6fdee19a5.webp',
    inStock: true,
    features: ['LED Lighting', 'Weather Resistant', 'Custom Colors', 'Energy Efficient'],
    sizes: ['12"', '18"', '24"', '36"']
  },
  {
    id: 'prod-002',
    name: 'Monument Sign',
    category: 'Exterior Signs',
    price: 4999.99,
    description: 'Elegant ground-level monument signs that make a lasting impression. Ideal for businesses, shopping centers, and corporate campuses.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436baafed75d5a3d3b7eb.jpeg',
    inStock: true,
    features: ['Stone/Brick Options', 'Illuminated', 'Custom Design', 'Professional Installation'],
    sizes: ['4x6 ft', '6x8 ft', '8x10 ft']
  },
  {
    id: 'prod-003',
    name: 'A-Frame Sidewalk Sign',
    category: 'Portable Signs',
    price: 189.99,
    description: 'Portable A-frame signs perfect for daily specials, promotions, or wayfinding. Easy to move and store.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba2b460050d6ee19a4.jpeg',
    inStock: true,
    features: ['Double-Sided', 'Weather Resistant', 'Lightweight', 'Chalkboard or Printed'],
    sizes: ['24x36"', '30x40"']
  },
  {
    id: 'prod-004',
    name: 'Digital LED Display',
    category: 'Digital Signs',
    price: 8999.99,
    description: 'Programmable LED display for dynamic messaging. Update content remotely and schedule different messages throughout the day.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba8a55618081dacf06.jpeg',
    inStock: true,
    features: ['Full Color Display', 'Remote Control', 'Weatherproof', 'High Resolution'],
    sizes: ['3x6 ft', '4x8 ft', '5x10 ft']
  },
  {
    id: 'prod-005',
    name: 'Vinyl Banner',
    category: 'Banners',
    price: 89.99,
    description: 'High-quality vinyl banners for events, grand openings, or temporary promotions. Vibrant colors and durable materials.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba2b4600256cee19a3.jpeg',
    inStock: true,
    features: ['Full Color Printing', 'Grommets Included', 'UV Resistant', 'Hemmed Edges'],
    sizes: ['3x6 ft', '4x8 ft', '5x10 ft', 'Custom']
  },
  {
    id: 'prod-006',
    name: 'Window Graphics',
    category: 'Window Signs',
    price: 149.99,
    description: 'Custom window decals and graphics. Perfect for hours of operation, logos, or promotional messages.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436baafed750e62d3b7e9.jpeg',
    inStock: true,
    features: ['Easy Application', 'Removable Options', 'UV Protected', 'Custom Cut'],
    sizes: ['Custom to Fit']
  },
  {
    id: 'prod-007',
    name: 'Pylon Sign',
    category: 'Exterior Signs',
    price: 7499.99,
    description: 'Tall freestanding signs visible from highways and major roads. Perfect for gas stations, shopping centers, and hotels.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436baafed753877d3b7ea.jpeg',
    inStock: true,
    features: ['High Visibility', 'Multi-Tenant Options', 'LED Illumination', 'Wind Rated'],
    sizes: ['20 ft', '30 ft', '40 ft', '50 ft']
  },
  {
    id: 'prod-008',
    name: 'Directional Wayfinding Signs',
    category: 'Interior Signs',
    price: 299.99,
    description: 'Professional wayfinding signage system for offices, hospitals, and campuses. ADA compliant options available.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436bafcbcd6044f4070e7.jpeg',
    inStock: true,
    features: ['ADA Compliant', 'Modular System', 'Multiple Finishes', 'Easy Updates'],
    sizes: ['Standard ADA', 'Custom']
  },
  {
    id: 'prod-009',
    name: 'Neon LED Sign',
    category: 'Specialty Signs',
    price: 599.99,
    description: 'Custom neon-style LED signs with the classic neon look but energy-efficient LED technology.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba2b4600727fee19a2.jpeg',
    inStock: true,
    features: ['Custom Shapes', 'Multiple Colors', 'Dimmer Control', 'Long Lasting'],
    sizes: ['Small (12")', 'Medium (24")', 'Large (36")', 'Custom']
  },
  {
    id: 'prod-010',
    name: 'Vehicle Wrap',
    category: 'Vehicle Graphics',
    price: 2999.99,
    description: 'Full or partial vehicle wraps that turn your fleet into mobile billboards. High-impact advertising on the move.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436baafed75a86ad3b7ec.jpeg',
    inStock: true,
    features: ['Full Color Design', 'Protective Laminate', 'Professional Installation', 'Removable'],
    sizes: ['Partial Wrap', 'Full Wrap']
  },
  {
    id: 'prod-011',
    name: 'Trade Show Display',
    category: 'Portable Signs',
    price: 1299.99,
    description: 'Professional pop-up displays for trade shows and events. Easy setup with carrying case included.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436ba5313008d3a7677a2.webp',
    inStock: true,
    features: ['Portable Design', 'LED Spotlights', 'Carrying Case', 'Custom Graphics'],
    sizes: ['8 ft', '10 ft', '20 ft']
  },
  {
    id: 'prod-012',
    name: 'Lobby Sign',
    category: 'Interior Signs',
    price: 899.99,
    description: 'Impressive lobby and reception area signs. Available in acrylic, metal, or dimensional letters.',
    image: 'https://storage.googleapis.com/msgsndr/wBIweU7uvIxsY4D4xvIL/media/68a436baafed7509d8d3b7e8.jpeg',
    inStock: true,
    features: ['3D Letters', 'Backlit Options', 'Multiple Materials', 'Custom Logo'],
    sizes: ['Small', 'Medium', 'Large', 'Custom']
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category)))
}