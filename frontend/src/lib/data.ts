
// Define the structure for a shoe product
export interface Shoe {
  id: number;
  name: string;
  type: 'Security' | 'Casual' | 'Formal' | 'Sports';
  price: number;
  size: number[];
  imageUrl: string;
  description: string;
  longDescription?: string; // Added for detail page
}

// Dummy Data for shoes (will be served by the API)
// Updated with more diverse and relevant working image URLs from Unsplash
export const dummyShoes: Shoe[] = [
  {
    id: 1,
    name: 'Guardian Pro',
    type: 'Security',
    price: 75.99,
    size: [8, 9, 10, 11, 12],
    imageUrl: 'https://images.unsplash.com/photo-1576034159727-707c33f1bbe5?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Black work boot
    description: 'Top-tier security boot.',
    longDescription: 'The Guardian Pro offers unparalleled protection and comfort for long shifts. Featuring a reinforced toe, slip-resistant outsole, and cushioned insole, it meets rigorous safety standards while ensuring all-day wearability. Ideal for security personnel and demanding work environments.'
  },
  {
    id: 2,
    name: 'Urban Walker',
    type: 'Casual',
    price: 55.50,
    size: [7, 8, 9, 10],
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Brown casual leather shoes
    description: 'Comfortable everyday shoe.',
    longDescription: 'Experience casual comfort with the Urban Walker. Its lightweight design, breathable mesh upper, and flexible sole make it perfect for daily commutes, weekend strolls, or relaxed outings. Stylishly versatile and built for comfort.'
  },
  {
    id: 3,
    name: 'Executive Step',
    type: 'Formal',
    price: 120.00,
    size: [9, 10, 11],
    imageUrl: 'https://images.unsplash.com/photo-1585497839138-eb51370881a3?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Black formal dress shoes
    description: 'Elegant formal footwear.',
    longDescription: 'Make a statement with the Executive Step. Crafted from premium leather with a classic design, these shoes offer sophistication and style for business meetings or formal events. Polished finish and durable construction ensure a lasting impression.'
  },
  {
    id: 4,
    name: 'Trail Runner X',
    type: 'Sports',
    price: 89.95,
    size: [8, 9, 10, 11, 12, 13],
    imageUrl: 'https://images.unsplash.com/photo-1595852601723-969e31c9bf44?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Rugged trail running shoe
    description: 'Performance sports shoe.',
    longDescription: 'Conquer any terrain with the Trail Runner X. Designed for stability and grip, these shoes feature a rugged outsole, supportive midsole, and weather-resistant upper. Perfect for hiking, trail running, or outdoor adventures.'
  },
  {
    id: 5,
    name: 'Sentry Duty',
    type: 'Security',
    price: 65.00,
    size: [9, 10, 11, 12, 13, 14],
    imageUrl: 'https://images.unsplash.com/photo-1608256249251-c0f6d3600716?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Another black work boot
    description: 'Reliable duty boot.',
    longDescription: 'The Sentry Duty boot is built for reliability and endurance. With a durable leather upper, oil-resistant sole, and comfortable padding, it provides essential support and safety for long hours on duty. A dependable choice for security professionals.'
  },
  {
    id: 6,
    name: 'City Roamer',
    type: 'Casual',
    price: 49.99,
    size: [6, 7, 8, 9, 10, 11],
    imageUrl: 'https://images.unsplash.com/photo-1596755617006-d00137d5a8b2?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Simple white canvas shoe
    description: 'Lightweight casual wear.',
    longDescription: 'Effortlessly stylish and incredibly light, the City Roamer is your go-to for casual comfort. Featuring a soft fabric upper and a cushioned footbed, it\'s perfect for navigating the city streets in ease and style.'
  },
  {
    id: 7,
    name: 'Stealth Guard',
    type: 'Security',
    price: 82.50,
    size: [10, 11, 12],
    imageUrl: 'https://images.unsplash.com/photo-1627213141720-c4d5c721eb01?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Black tactical boot low cut
    description: 'Discreet security shoe.',
    longDescription: 'Blend in without compromising on safety with the Stealth Guard. This shoe offers a low-profile design with essential security features like a reinforced toe and slip-resistant sole. Ideal for situations requiring discretion and protection.'
  },
  {
    id: 8,
    name: 'Sprint Master',
    type: 'Sports',
    price: 99.00,
    size: [7, 8, 9, 10, 11],
    imageUrl: 'https://images.unsplash.com/photo-1595856412387-91721311f178?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Colorful running shoe
    description: 'Agile sports footwear.',
    longDescription: 'Maximize your performance with the Sprint Master. Engineered for speed and agility, these sports shoes feature a lightweight construction, responsive cushioning, and excellent traction. Ideal for running, training, or athletic activities.'
  },
   {
    id: 9,
    name: 'Boardroom Classic',
    type: 'Formal',
    price: 135.00,
    size: [8, 9, 10, 11, 12],
    imageUrl: 'https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Brown formal loafers
    description: 'Timeless formal loafer.',
    longDescription: 'The Boardroom Classic loafer combines timeless design with modern comfort. Made from supple full-grain leather, it features a cushioned insole and a durable sole, perfect for long days at the office or formal gatherings.'
  },
   {
    id: 10,
    name: 'Weekend Wanderer',
    type: 'Casual',
    price: 62.00,
    size: [7, 8, 9, 10, 11, 12],
    imageUrl: 'https://images.unsplash.com/photo-1612183218263-1c543c2a9efe?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Blue canvas sneakers
    description: 'Relaxed weekend sneaker.',
    longDescription: 'Unwind in style with the Weekend Wanderer. These comfortable canvas sneakers feature a flexible rubber sole and a padded collar, making them ideal for laid-back weekends and casual outings.'
  },
   {
    id: 11,
    name: 'Gym Flex',
    type: 'Sports',
    price: 79.99,
    size: [8, 9, 10, 11],
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Yellow sports shoe
    description: 'Versatile training shoe.',
    longDescription: 'The Gym Flex is designed for versatility in your training routine. With a stable base for lifting and flexible forefoot for agility drills, this shoe provides support and comfort for various workouts.'
  },
   {
    id: 12,
    name: 'Patrol Officer',
    type: 'Security',
    price: 72.00,
    size: [9, 10, 11, 12, 13],
    imageUrl: 'https://images.unsplash.com/photo-1605733160314-4fc7dac47190?q=80&w=600&h=600&fit=crop&ixlib=rb-4.0.3', // Black polished security shoe
    description: 'Polished security oxford.',
    longDescription: 'Maintain a professional appearance with the Patrol Officer oxford. Featuring a polishable leather upper, slip-resistant outsole, and cushioned support, this shoe meets uniform requirements while ensuring comfort during patrols.'
  }
];

export const shoeTypes: Shoe['type'][] = ['Security', 'Casual', 'Formal', 'Sports'];
export const shoeSizes = Array.from({ length: 9 }, (_, i) => i + 6); // Sizes 6 to 14
