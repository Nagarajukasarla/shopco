export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  image: string;
  images: string[];
  category: string;
  style: 'Casual' | 'Formal' | 'Party' | 'Gym';
  colors: string[];
  sizes: string[];
  description: string;
  reviewsCount: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirt with Tape Details',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'T-Shirts',
    style: 'Casual',
    colors: ['#3C444C', '#302E2B', '#E5D5C5'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'This graphic t-shirt which is perfect for any casual occasion. Crafted from a premium cotton blend, it offers exceptional comfort and breathable wear all day long.',
    reviewsCount: 150
  },
  {
    id: '2',
    name: 'Skinny Fit Jeans',
    price: 240,
    originalPrice: 260,
    discountPercent: 10,
    rating: 3.5,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Jeans',
    style: 'Casual',
    colors: ['#0C2340', '#4B9CD3', '#1D1D1D'],
    sizes: ['Small', 'Medium', 'Large'],
    description: 'Elevate your everyday denim style with our premium Skinny Fit Jeans. Made with flexible stretch denim that retains its shape, offering comfort and style in equal measures.',
    reviewsCount: 120
  },
  {
    id: '3',
    name: 'Classic Checkered Shirt',
    price: 180,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Shirts',
    style: 'Casual',
    colors: ['#FF3333', '#1D1D1D', '#3F6212'],
    sizes: ['Medium', 'Large', 'X-Large'],
    description: 'A versatile checkered pattern long-sleeved shirt. Made from soft brushed cotton, perfect for layering over tees or wearing on its own.',
    reviewsCount: 95
  },
  {
    id: '4',
    name: 'Sleek Double-Breasted Blazer',
    price: 320,
    originalPrice: 400,
    discountPercent: 20,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Formal Wear',
    style: 'Formal',
    colors: ['#0A1172', '#1B1B1B', '#E5E4E2'],
    sizes: ['Medium', 'Large', 'X-Large', 'XX-Large'],
    description: 'Command the room in this meticulously tailored double-breasted blazer. Crafted from high-grade wool blend, featuring structured shoulders and a modern peak lapel.',
    reviewsCount: 210
  },
  {
    id: '5',
    name: 'Premium Wool Dress Pants',
    price: 190,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Pants',
    style: 'Formal',
    colors: ['#1B1B1B', '#3B3B3B', '#708090'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Expertly designed flat-front formal trousers. Perfect drape and lightweight warmth, detailed with side pockets and button-through rear pockets.',
    reviewsCount: 88
  },
  {
    id: '6',
    name: 'Silk Party Cocktails Dress',
    price: 280,
    originalPrice: 350,
    discountPercent: 20,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539008885128-fcbb55b6998b?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Dresses',
    style: 'Party',
    colors: ['#800020', '#111111', '#FFD700'],
    sizes: ['Small', 'Medium', 'Large'],
    description: 'Turn heads at your next social gathering in this premium mulberry silk cocktail dress. It features a graceful cowl neckline, elegant silhouette, and delicate adjustable straps.',
    reviewsCount: 145
  },
  {
    id: '7',
    name: 'Velvet Evening Blazer',
    price: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Jackets',
    style: 'Party',
    colors: ['#0A1172', '#2A0845', '#111111'],
    sizes: ['Medium', 'Large', 'X-Large'],
    description: 'A luxurious velvet blazer designed for high-profile evening events. Features satin peak lapels, a single button closure, and a premium inner silk lining.',
    reviewsCount: 64
  },
  {
    id: '8',
    name: 'Active Comfort Gym Hoodie',
    price: 110,
    originalPrice: 150,
    discountPercent: 26,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Hoodies',
    style: 'Gym',
    colors: ['#4A4A4A', '#0F172A', '#D1D5DB'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Train hard, stay warm. This active gym hoodie is made from moisture-wicking stretch fabric, engineered to support full range of motion while regulating temperature.',
    reviewsCount: 180
  },
  {
    id: '9',
    name: 'Dry-Fit Performance Shorts',
    price: 75,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Shorts',
    style: 'Gym',
    colors: ['#0A0A0A', '#1D4ED8', '#6B7280'],
    sizes: ['Small', 'Medium', 'Large'],
    description: 'Ultralight workout shorts featuring an elastic drawstring waistband, mesh vents, and zippered side pockets. Keeps you cool during high-intensity training.',
    reviewsCount: 112
  },
  {
    id: '10',
    name: 'Loose Fit Bermuda Shorts',
    price: 90,
    originalPrice: 120,
    discountPercent: 25,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Shorts',
    style: 'Casual',
    colors: ['#D2B48C', '#556B2F', '#000000'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'Casual, relaxed cargo style shorts. Crafted with heavyweight cotton twill, multiple utility pockets, and a comfortable relaxed seat and thigh.',
    reviewsCount: 78
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'r1',
    name: 'Sarah M.',
    rating: 5,
    verified: true,
    content: '"I\'m blown away by the quality and fit of these clothes. The materials are premium and the styles are exactly what I was looking for. Definitely buying again!"',
    date: 'August 14, 2025'
  },
  {
    id: 'r2',
    name: 'Alex K.',
    rating: 4.5,
    verified: true,
    content: '"Finding clothes that fit my tall frame has always been a challenge, but SHOP.CO fits perfectly. The tailoring is superb and customer service is outstanding."',
    date: 'September 2, 2025'
  },
  {
    id: 'r3',
    name: 'James L.',
    rating: 5,
    verified: true,
    content: '"The customer service was amazing! They helped me exchange a size and the shipping was incredibly fast. The quality of the products is top notch."',
    date: 'October 18, 2025'
  },
  {
    id: 'r4',
    name: 'Emma R.',
    rating: 5,
    verified: true,
    content: '"Absolutely in love with the silk cocktail dress. It flows beautifully and feels so luxurious. Got compliments all evening!"',
    date: 'November 5, 2025'
  },
  {
    id: 'r5',
    name: 'Michael B.',
    rating: 4,
    verified: true,
    content: '"Excellent gym apparel. The dry-fit fabric is top tier, keeps me cool and dries extremely fast during workouts. Fits true to size."',
    date: 'December 20, 2025'
  }
];
