export type OrderStatus = 
  | 'order-received'
  | 'in-production' 
  | 'quality-check'
  | 'preparing-shipment'
  | 'shipped'
  | 'delivered'
  | 'on-hold'

export interface StatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
  description: string
}

export const statusConfig: Record<OrderStatus, StatusConfig> = {
  'order-received': {
    label: 'Order Received',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: '📥',
    description: 'Your order has been received and is being processed'
  },
  'in-production': {
    label: 'In Production',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: '🏭',
    description: 'Your custom signs are being manufactured'
  },
  'quality-check': {
    label: 'Quality Check',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: '🔍',
    description: 'Ensuring your products meet our high standards'
  },
  'preparing-shipment': {
    label: 'Preparing Shipment',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: '📦',
    description: 'Your order is being packaged for delivery'
  },
  'shipped': {
    label: 'Shipped',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: '🚚',
    description: 'Your order is on its way'
  },
  'delivered': {
    label: 'Delivered',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: '✅',
    description: 'Your order has been successfully delivered'
  },
  'on-hold': {
    label: 'On Hold',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '⏸️',
    description: 'Your order is temporarily on hold'
  }
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  size?: string
  customization?: string
}

export interface TrackingInfo {
  carrier: string
  trackingNumber: string
  url: string
  lastUpdate: string
  estimatedDelivery: string
}

export interface StatusUpdate {
  status: OrderStatus
  timestamp: string
  note?: string
}

export interface ShippingAddress {
  name: string
  company?: string
  street: string
  city: string
  state: string
  zip: string
  phone: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  placedDate: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  estimatedDelivery: string
  tracking?: TrackingInfo[]
  shippingAddress: ShippingAddress
  statusHistory: StatusUpdate[]
  notes?: string
}

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    orderNumber: 'Mtn-2024-1001',
    customerName: 'John Anderson',
    customerEmail: 'john.anderson@company.com',
    placedDate: '2024-01-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        productId: 'prod-001',
        productName: 'Illuminated Channel Letters',
        quantity: 1,
        price: 2499.99,
        size: '24"',
        customization: 'Company name "ANDERSON & CO" in blue'
      },
      {
        productId: 'prod-006',
        productName: 'Window Graphics',
        quantity: 4,
        price: 149.99,
        customization: 'Hours of operation and logo'
      }
    ],
    subtotal: 3099.95,
    tax: 248.00,
    shipping: 150.00,
    total: 3497.95,
    estimatedDelivery: '2024-01-22T17:00:00Z',
    tracking: [
      {
        carrier: 'FedEx',
        trackingNumber: '786433890125',
        url: 'https://www.fedex.com/track?trackingnumber=786433890125',
        lastUpdate: 'Delivered - Left at front door',
        estimatedDelivery: '2024-01-22T17:00:00Z'
      }
    ],
    shippingAddress: {
      name: 'John Anderson',
      company: 'Anderson & Co',
      street: '123 Business Park Dr',
      city: 'Denver',
      state: 'CO',
      zip: '80202',
      phone: '(303) 555-0100'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-15T10:30:00Z' },
      { status: 'in-production', timestamp: '2024-01-16T09:00:00Z' },
      { status: 'quality-check', timestamp: '2024-01-18T14:30:00Z' },
      { status: 'preparing-shipment', timestamp: '2024-01-19T11:00:00Z' },
      { status: 'shipped', timestamp: '2024-01-20T08:15:00Z' },
      { status: 'delivered', timestamp: '2024-01-22T17:00:00Z' }
    ]
  },
  {
    id: 'order-002',
    orderNumber: 'Mtn-2024-1002',
    customerName: 'Sarah Mitchell',
    customerEmail: 'sarah@restaurant.com',
    placedDate: '2024-01-18T14:45:00Z',
    status: 'shipped',
    items: [
      {
        productId: 'prod-009',
        productName: 'Neon LED Sign',
        quantity: 1,
        price: 599.99,
        size: 'Large (36")',
        customization: '"Open Late" in warm white'
      },
      {
        productId: 'prod-003',
        productName: 'A-Frame Sidewalk Sign',
        quantity: 2,
        price: 189.99,
        size: '30x40"',
        customization: 'Chalkboard style'
      }
    ],
    subtotal: 979.97,
    tax: 78.40,
    shipping: 75.00,
    total: 1133.37,
    estimatedDelivery: '2024-01-25T17:00:00Z',
    tracking: [
      {
        carrier: 'UPS',
        trackingNumber: '1Z999AA10123456784',
        url: 'https://www.ups.com/track?tracknum=1Z999AA10123456784',
        lastUpdate: 'Out for delivery',
        estimatedDelivery: '2024-01-25T17:00:00Z'
      }
    ],
    shippingAddress: {
      name: 'Sarah Mitchell',
      company: 'The Corner Bistro',
      street: '456 Main Street',
      city: 'Boulder',
      state: 'CO',
      zip: '80301',
      phone: '(303) 555-0200'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-18T14:45:00Z' },
      { status: 'in-production', timestamp: '2024-01-19T10:00:00Z' },
      { status: 'quality-check', timestamp: '2024-01-22T15:30:00Z' },
      { status: 'preparing-shipment', timestamp: '2024-01-23T09:00:00Z' },
      { status: 'shipped', timestamp: '2024-01-24T07:30:00Z' }
    ]
  },
  {
    id: 'order-003',
    orderNumber: 'Mtn-2024-1003',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@techstartup.io',
    placedDate: '2024-01-20T09:15:00Z',
    status: 'in-production',
    items: [
      {
        productId: 'prod-004',
        productName: 'Digital LED Display',
        quantity: 1,
        price: 8999.99,
        size: '4x8 ft',
        customization: 'High brightness for outdoor use'
      },
      {
        productId: 'prod-012',
        productName: 'Lobby Sign',
        quantity: 1,
        price: 899.99,
        size: 'Large',
        customization: 'Brushed aluminum with backlit logo'
      }
    ],
    subtotal: 9899.98,
    tax: 791.99,
    shipping: 250.00,
    total: 10941.97,
    estimatedDelivery: '2024-02-05T17:00:00Z',
    shippingAddress: {
      name: 'Michael Chen',
      company: 'TechVentures Inc',
      street: '789 Innovation Way',
      city: 'Fort Collins',
      state: 'CO',
      zip: '80521',
      phone: '(970) 555-0300'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-20T09:15:00Z' },
      { status: 'in-production', timestamp: '2024-01-21T08:00:00Z', note: 'Custom LED configuration in progress' }
    ],
    notes: 'Customer requested rush delivery if possible'
  },
  {
    id: 'order-004',
    orderNumber: 'Mtn-2024-1004',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily@retailstore.com',
    placedDate: '2024-01-22T16:20:00Z',
    status: 'quality-check',
    items: [
      {
        productId: 'prod-005',
        productName: 'Vinyl Banner',
        quantity: 3,
        price: 89.99,
        size: '4x8 ft',
        customization: 'Grand Opening Sale - 30% Off'
      },
      {
        productId: 'prod-011',
        productName: 'Trade Show Display',
        quantity: 1,
        price: 1299.99,
        size: '10 ft',
        customization: 'Company branding package'
      }
    ],
    subtotal: 1569.96,
    tax: 125.60,
    shipping: 95.00,
    total: 1790.56,
    estimatedDelivery: '2024-01-30T17:00:00Z',
    shippingAddress: {
      name: 'Emily Rodriguez',
      company: 'Fashion Forward',
      street: '321 Shopping Center Blvd',
      city: 'Littleton',
      state: 'CO',
      zip: '80120',
      phone: '(303) 555-0400'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-22T16:20:00Z' },
      { status: 'in-production', timestamp: '2024-01-23T09:00:00Z' },
      { status: 'quality-check', timestamp: '2024-01-24T16:00:00Z', note: 'Final inspection in progress' }
    ]
  },
  {
    id: 'order-005',
    orderNumber: 'Mtn-2024-1005',
    customerName: 'David Thompson',
    customerEmail: 'david@autorepair.com',
    placedDate: '2024-01-23T11:30:00Z',
    status: 'preparing-shipment',
    items: [
      {
        productId: 'prod-007',
        productName: 'Pylon Sign',
        quantity: 1,
        price: 7499.99,
        size: '30 ft',
        customization: 'Thompson Auto Repair - 24/7 Service'
      }
    ],
    subtotal: 7499.99,
    tax: 599.99,
    shipping: 500.00,
    total: 8599.98,
    estimatedDelivery: '2024-02-10T17:00:00Z',
    shippingAddress: {
      name: 'David Thompson',
      company: 'Thompson Auto Repair',
      street: '555 Highway 287',
      city: 'Loveland',
      state: 'CO',
      zip: '80537',
      phone: '(970) 555-0500'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-23T11:30:00Z' },
      { status: 'in-production', timestamp: '2024-01-24T08:00:00Z' },
      { status: 'quality-check', timestamp: '2024-01-28T14:00:00Z' },
      { status: 'preparing-shipment', timestamp: '2024-01-29T10:00:00Z', note: 'Special freight arrangements being made' }
    ],
    notes: 'Installation service included'
  },
  {
    id: 'order-006',
    orderNumber: 'Mtn-2024-1006',
    customerName: 'Lisa Wong',
    customerEmail: 'lisa@medicalclinic.com',
    placedDate: '2024-01-24T13:45:00Z',
    status: 'order-received',
    items: [
      {
        productId: 'prod-008',
        productName: 'Directional Wayfinding Signs',
        quantity: 12,
        price: 299.99,
        customization: 'ADA compliant with braille'
      },
      {
        productId: 'prod-002',
        productName: 'Monument Sign',
        quantity: 1,
        price: 4999.99,
        size: '6x8 ft',
        customization: 'Westside Medical Center - stone base with LED'
      }
    ],
    subtotal: 8599.87,
    tax: 687.99,
    shipping: 350.00,
    total: 9637.86,
    estimatedDelivery: '2024-02-15T17:00:00Z',
    shippingAddress: {
      name: 'Lisa Wong',
      company: 'Westside Medical Center',
      street: '888 Healthcare Drive',
      city: 'Westminster',
      state: 'CO',
      zip: '80031',
      phone: '(303) 555-0600'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-24T13:45:00Z', note: 'Order confirmation sent' }
    ]
  },
  {
    id: 'order-007',
    orderNumber: 'Mtn-2024-1007',
    customerName: 'Robert Martinez',
    customerEmail: 'robert@carwash.com',
    placedDate: '2024-01-19T10:00:00Z',
    status: 'on-hold',
    items: [
      {
        productId: 'prod-010',
        productName: 'Vehicle Wrap',
        quantity: 3,
        price: 2999.99,
        customization: 'Fleet branding for service vans'
      }
    ],
    subtotal: 8999.97,
    tax: 719.99,
    shipping: 0,
    total: 9719.96,
    estimatedDelivery: 'TBD',
    shippingAddress: {
      name: 'Robert Martinez',
      company: 'Sparkle Car Wash',
      street: '222 Clean Street',
      city: 'Aurora',
      state: 'CO',
      zip: '80012',
      phone: '(303) 555-0700'
    },
    statusHistory: [
      { status: 'order-received', timestamp: '2024-01-19T10:00:00Z' },
      { status: 'on-hold', timestamp: '2024-01-20T14:00:00Z', note: 'Awaiting final vehicle measurements from customer' }
    ],
    notes: 'Customer needs to provide vehicle VIN numbers'
  }
]

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id)
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter(order => order.status === status)
}

export function getRecentOrders(limit: number = 5): Order[] {
  return [...mockOrders]
    .sort((a, b) => new Date(b.placedDate).getTime() - new Date(a.placedDate).getTime())
    .slice(0, limit)
}

export function getOrderStats() {
  const total = mockOrders.length
  const pending = mockOrders.filter(o => 
    ['order-received', 'in-production', 'quality-check', 'preparing-shipment'].includes(o.status)
  ).length
  const delivered = mockOrders.filter(o => o.status === 'delivered').length
  const onHold = mockOrders.filter(o => o.status === 'on-hold').length
  
  return { total, pending, delivered, onHold }
}