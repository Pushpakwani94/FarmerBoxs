import type { Product } from '../types';

export const initialProductsList: Product[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200',
    name: 'Tomato',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 25,
    salePrice: 40,
    stock: 500,
    minimumStock: 50,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Fresh Red Tomato sourced from Narayangaon farms. Firm, juicy, and rich in lycopene.',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
      'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400'
    ],
    stockHistory: [
      { date: '11 Sep 2026', type: 'Stock In', qty: '+200 KG', ref: 'PO-001', user: 'Admin' },
      { date: '09 Sep 2026', type: 'Stock Out', qty: '-50 KG', ref: 'ORD-1001', user: 'System' },
      { date: '05 Sep 2026', type: 'Stock In', qty: '+300 KG', ref: 'PO-002', user: 'Admin' },
      { date: '02 Sep 2026', type: 'Stock Out', qty: '-100 KG', ref: 'ORD-0987', user: 'System' }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200',
    name: 'Onion',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 20,
    salePrice: 30,
    stock: 300,
    minimumStock: 40,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Lasalgaon Grade-A Nashik Red Onions with dry papery skin and strong pungent flavor.',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?w=400',
      'https://images.unsplash.com/photo-1508747703725-719777637510?w=400'
    ],
    stockHistory: [
      { date: '10 Sep 2026', type: 'Stock In', qty: '+500 KG', ref: 'PO-003', user: 'Admin' },
      { date: '08 Sep 2026', type: 'Stock Out', qty: '-200 KG', ref: 'ORD-1005', user: 'System' }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200',
    name: 'Potato',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 18,
    salePrice: 25,
    stock: 800,
    minimumStock: 100,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Fresh Agra medium potato, ideal for hotel curries, fries, and daily kitchen use.',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'
    ],
    stockHistory: [
      { date: '11 Sep 2026', type: 'Stock In', qty: '+1000 KG', ref: 'PO-004', user: 'Admin' },
      { date: '09 Sep 2026', type: 'Stock Out', qty: '-200 KG', ref: 'ORD-1002', user: 'System' }
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200',
    name: 'Green Chilli',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 35,
    salePrice: 50,
    stock: 50,
    minimumStock: 60,
    status: 'Low Stock',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Spicy and crisp dark green chillies from Kolhapur farms.',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400'
    ],
    stockHistory: [
      { date: '08 Sep 2026', type: 'Stock Out', qty: '-40 KG', ref: 'ORD-1011', user: 'System' }
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200',
    name: 'Capsicum',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 40,
    salePrice: 60,
    stock: 0,
    minimumStock: 20,
    status: 'Out of Stock',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Crisp green bell peppers suitable for Indo-Chinese and continental hotel dishes.',
    images: [
      'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400'
    ],
    stockHistory: [
      { date: '10 Sep 2026', type: 'Stock Out', qty: '-60 KG', ref: 'ORD-1009', user: 'System' }
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200',
    name: 'Carrot',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 30,
    salePrice: 45,
    stock: 200,
    minimumStock: 30,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Tender, sweet orange carrots rich in beta-carotene from Ooty farms.',
    images: [
      'https://images.unsplash.com/photo-1447175008436-0841709069c0?w=400'
    ],
    stockHistory: [
      { date: '10 Sep 2026', type: 'Stock In', qty: '+150 KG', ref: 'PO-005', user: 'Admin' }
    ]
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=200',
    name: 'Cabbage',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 22,
    salePrice: 35,
    stock: 150,
    minimumStock: 25,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Fresh tightly-packed green cabbage heads, ideal for salads and rolls.',
    images: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400'
    ],
    stockHistory: [
      { date: '09 Sep 2026', type: 'Stock In', qty: '+200 KG', ref: 'PO-006', user: 'Admin' }
    ]
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200',
    name: 'Cauliflower',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 28,
    salePrice: 42,
    stock: 25,
    minimumStock: 30,
    status: 'Low Stock',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Pristine white florets with vibrant green outer leaves.',
    images: [
      'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400'
    ],
    stockHistory: [
      { date: '09 Sep 2026', type: 'Stock Out', qty: '-45 KG', ref: 'ORD-1014', user: 'System' }
    ]
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=200',
    name: 'Lady Finger',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 40,
    salePrice: 60,
    stock: 100,
    minimumStock: 25,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Fresh tender Bhindi / Okra, hand-sorted for quality.',
    images: [
      'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400'
    ],
    stockHistory: [
      { date: '11 Sep 2026', type: 'Stock In', qty: '+120 KG', ref: 'PO-007', user: 'Admin' }
    ]
  },
  {
    id: 10,
    image: '/products/brinjal.jpg',
    name: 'Eggplant / Brinjal (Baingan)',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 28,
    salePrice: 42,
    stock: 120,
    minimumStock: 20,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    description: 'Fresh glossy purple eggplants with tender texture, perfect for hotel curries & stuffed preparations.',
    images: [
      '/products/brinjal.jpg'
    ],
    stockHistory: [
      { date: '08 Sep 2026', type: 'Stock In', qty: '+80 KG', ref: 'PO-008', user: 'Admin' }
    ]
  },
  {
    id: 101,
    image: '/products/fenugreek.jpg',
    name: 'Fresh Fenugreek (Methi)',
    category: 'Leafy',
    unit: 'Bunch',
    purchasePrice: 15,
    salePrice: 25,
    stock: 250,
    minimumStock: 40,
    status: 'Active',
    addedOn: '12 Sep 2026, 08:00 AM',
    description: 'Freshly harvested tender green methi leaves, rich in iron, natural aroma and crisp texture.',
    images: [
      '/products/fenugreek.jpg'
    ],
    stockHistory: [
      { date: '12 Sep 2026', type: 'Stock In', qty: '+250 Bunch', ref: 'PO-009', user: 'Admin' }
    ]
  },
  {
    id: 102,
    image: '/products/pumpkin.jpg',
    name: 'Green Pumpkin (Kaddu)',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 22,
    salePrice: 35,
    stock: 180,
    minimumStock: 30,
    status: 'Active',
    addedOn: '12 Sep 2026, 08:00 AM',
    description: 'Sweet and dense green pumpkin with golden-orange flesh, ideal for commercial kitchens and sambar.',
    images: [
      '/products/pumpkin.jpg'
    ],
    stockHistory: [
      { date: '12 Sep 2026', type: 'Stock In', qty: '+180 KG', ref: 'PO-010', user: 'Admin' }
    ]
  },
  {
    id: 104,
    image: '/products/mint.jpg',
    name: 'Fresh Mint (Pudina)',
    category: 'Leafy',
    unit: 'Bunch',
    purchasePrice: 10,
    salePrice: 18,
    stock: 300,
    minimumStock: 50,
    status: 'Active',
    addedOn: '12 Sep 2026, 08:00 AM',
    description: 'Farm-fresh fragrant mint bunches, ideal for hotel chutneys, beverages, and biryani garnishes.',
    images: [
      '/products/mint.jpg'
    ],
    stockHistory: [
      { date: '12 Sep 2026', type: 'Stock In', qty: '+300 Bunch', ref: 'PO-011', user: 'Admin' }
    ]
  },
  {
    id: 105,
    image: '/products/ginger.jpg',
    name: 'Fresh Ginger (Adrak)',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 65,
    salePrice: 90,
    stock: 90,
    minimumStock: 25,
    status: 'Active',
    addedOn: '12 Sep 2026, 08:00 AM',
    description: 'Spicy, fibrous and juicy ginger rhizomes sourced directly from mountain farms.',
    images: [
      '/products/ginger.jpg'
    ],
    stockHistory: [
      { date: '12 Sep 2026', type: 'Stock In', qty: '+90 KG', ref: 'PO-012', user: 'Admin' }
    ]
  }
];

// Helper to generate products 11 to 128 to match exact stats:
// Total = 128
// In Stock = 96
// Low Stock = 18 (2 in first 10 + 16 more)
// Out of Stock = 8 (1 in first 10 + 7 more)
// Categories = 12
const categoryNames = [
  'Vegetables',
  'Leafy Greens',
  'Fruits',
  'Exotic Veggies',
  'Herbs & Seasoning',
  'Root Veggies',
  'Gourds & Squashes',
  'Beans & Peas',
  'Mushrooms',
  'Chillies & Peppers',
  'Citrus & Melons',
  'Dairy & Supplies'
];

const catalogItems = [
  { name: 'Palak (Spinach)', cat: 'Leafy Greens', unit: 'Bundle', p: 15, s: 25, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' },
  { name: 'Methi (Fenugreek)', cat: 'Leafy Greens', unit: 'Bundle', p: 12, s: 20, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200' },
  { name: 'Coriander (Kothmir)', cat: 'Herbs & Seasoning', unit: 'Bundle', p: 10, s: 18, img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200' },
  { name: 'Mint (Pudina)', cat: 'Herbs & Seasoning', unit: 'Bundle', p: 8, s: 15, img: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200' },
  { name: 'Ginger (Adrak)', cat: 'Herbs & Seasoning', unit: 'KG', p: 80, s: 110, img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200' },
  { name: 'Garlic (Lasun)', cat: 'Herbs & Seasoning', unit: 'KG', p: 120, s: 160, img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200' },
  { name: 'Bottle Gourd (Lauki)', cat: 'Gourds & Squashes', unit: 'KG', p: 25, s: 35, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200' },
  { name: 'Bitter Gourd (Karela)', cat: 'Gourds & Squashes', unit: 'KG', p: 35, s: 50, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200' },
  { name: 'Ridge Gourd (Turai)', cat: 'Gourds & Squashes', unit: 'KG', p: 30, s: 45, img: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=200' },
  { name: 'Cucumber (Kakdi)', cat: 'Vegetables', unit: 'KG', p: 20, s: 32, img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?w=200' },
  { name: 'Beetroot', cat: 'Root Veggies', unit: 'KG', p: 28, s: 40, img: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=200' },
  { name: 'Radish (Mooli)', cat: 'Root Veggies', unit: 'KG', p: 18, s: 28, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200' },
  { name: 'Sweet Corn', cat: 'Vegetables', unit: 'Pcs', p: 12, s: 20, img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200' },
  { name: 'Button Mushroom', cat: 'Mushrooms', unit: 'Pkt', p: 35, s: 50, img: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=200' },
  { name: 'Broccoli', cat: 'Exotic Veggies', unit: 'KG', p: 85, s: 130, img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200' },
  { name: 'Zucchini Green', cat: 'Exotic Veggies', unit: 'KG', p: 70, s: 110, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200' },
  { name: 'Green Peas (Matar)', cat: 'Beans & Peas', unit: 'KG', p: 55, s: 80, img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=200' },
  { name: 'French Beans', cat: 'Beans & Peas', unit: 'KG', p: 45, s: 65, img: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=200' },
  { name: 'Shimla Mirch Red', cat: 'Chillies & Peppers', unit: 'KG', p: 90, s: 140, img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
  { name: 'Shimla Mirch Yellow', cat: 'Chillies & Peppers', unit: 'KG', p: 95, s: 145, img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
  { name: 'Lemon (Nimbu)', cat: 'Citrus & Melons', unit: 'KG', p: 60, s: 90, img: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200' },
  { name: 'Watermelon', cat: 'Citrus & Melons', unit: 'KG', p: 18, s: 28, img: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=200' },
  { name: 'Paneer Fresh Block', cat: 'Dairy & Supplies', unit: 'KG', p: 260, s: 320, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200' },
  { name: 'Curd Dahi Bucket', cat: 'Dairy & Supplies', unit: 'KG', p: 50, s: 70, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200' }
];

let lowStockCounter = 2; // already have 2 (Green Chilli, Cauliflower)
let outOfStockCounter = 1; // already have 1 (Capsicum)

for (let i = 11; i <= 128; i++) {
  const template = catalogItems[(i - 11) % catalogItems.length];
  let status: 'Active' | 'Low Stock' | 'Out of Stock' = 'Active';
  let stock = 80 + ((i * 17) % 350);

  // We need exactly 18 Low Stock items (so 16 more)
  if (lowStockCounter < 18 && (i % 7 === 0 || i === 12 || i === 25)) {
    status = 'Low Stock';
    stock = 15 + (i % 15);
    lowStockCounter++;
  }
  // We need exactly 8 Out of Stock items (so 7 more)
  else if (outOfStockCounter < 8 && (i % 17 === 0 || i === 45 || i === 99)) {
    status = 'Out of Stock';
    stock = 0;
    outOfStockCounter++;
  }

  initialProductsList.push({
    id: i,
    image: template.img,
    name: `${template.name} ${i > 34 ? `(#${i})` : ''}`.trim(),
    category: template.cat,
    unit: template.unit,
    purchasePrice: template.p,
    salePrice: template.s,
    stock,
    minimumStock: Math.max(20, Math.floor(stock * 0.3)),
    status,
    addedOn: `0${(i % 9) + 1} Sep 2026, 11:00 AM`,
    description: `High quality fresh ${template.name} sourced directly from certified Maharashtra growers.`,
    images: [template.img],
    stockHistory: [
      { date: '11 Sep 2026', type: 'Stock In', qty: `+${50 + (i % 50)} ${template.unit}`, ref: `PO-${100 + i}`, user: 'Admin' },
      { date: '08 Sep 2026', type: 'Stock Out', qty: `-${10 + (i % 20)} ${template.unit}`, ref: `ORD-${1000 + i}`, user: 'System' }
    ]
  });
}
