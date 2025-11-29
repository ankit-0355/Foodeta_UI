
import { TiffinProvider } from './models';

export const PROVIDERS: TiffinProvider[] = [
  {
    // id: 'gujarat-bhavan-kitchen',
    name: 'Gujarat Bhavan Kitchen',
    description:
      'Authentic Gujarati thali with traditional recipes from Gujarat. Fresh rotli, variety of sabzi, farsan, and sweet dishes daily.',
    imageUrl: 'image_1.jpg',
    rating: 4.9,
    reviewCount: 187,
    pricePerDay: 14,
    location: 'Brampton, ON',
    tags: ['Gujarati', 'Vegetarian'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Undhiyu', description: 'Mixed vegetable curry – Gujarati specialty' },
        { name: 'Dal Dhokli', description: 'Wheat dumplings in spiced lentil soup' },
        { name: 'Roti (4 pcs)' },
        { name: 'Kadhi', description: 'Yogurt-based curry with pakoras' },
        { name: 'Kachumber Salad' },
        { name: 'Shrikhand' }
      ]
    },
    deliveryAreas: ['Brampton', 'Mississauga', 'Malton']
  },

  {
    // id: 'punjab-home-kitchen',
    name: 'Punjab Home Kitchen',
    description:
      'Traditional Punjabi tiffin made fresh daily with homestyle flavors. Includes paratha, sabzi, dal, and dessert on rotation.',
    imageUrl: 'image_2.jpg',
    rating: 4.7,
    reviewCount: 254,
    pricePerDay: 15,
    location: 'Mississauga, ON',
    tags: ['Punjabi', 'North Indian'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Aloo Paratha', description: 'Served with butter & pickle' },
        { name: 'Chole', description: 'Spiced chickpea curry' },
        { name: 'Jeera Rice' },
        { name: 'Boondi Raita' },
        { name: 'Gajar Halwa' }
      ]
    },
    deliveryAreas: ['Mississauga', 'Etobicoke', 'Brampton']
  },

  {
    // id: 'maharashtra-tiffin-house',
    name: 'Maharashtra Tiffin House',
    description:
      'Nutritious Maharashtrian-style ghar ka khana delivered fresh. Includes bhakri, varan, sabzi, and seasonal sweets.',
    imageUrl: 'image_3.jpeg',
    rating: 4.8,
    reviewCount: 143,
    pricePerDay: 13,
    location: 'Scarborough, ON',
    tags: ['Maharashtrian'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Pithla', description: 'Gram flour curry' },
        { name: 'Bajra Bhakri' },
        { name: 'Tomato Saar' },
        { name: 'Batata Bhaji' },
        { name: 'Kanda Kachumber' },
        { name: 'Sheera' }
      ]
    },
    deliveryAreas: ['Scarborough', 'North York', 'Toronto']
  },

  {
    // id: 'south-indian-anna-tiffin',
    name: 'Anna South Indian Kitchen',
    description:
      'Healthy South Indian meals with idli, dosa variations, sambhar, rasam, and rice dishes. Light, fresh, and flavorful.',
    imageUrl: 'assets/images/south-indian.jpg',
    rating: 4.6,
    reviewCount: 198,
    pricePerDay: 12,
    location: 'Toronto, ON',
    tags: ['South Indian'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Lemon Rice' },
        { name: 'Sambhar' },
        { name: 'Cabbage Poriyal' },
        { name: 'Medu Vada (2 pcs)' },
        { name: 'Curd Rice' }
      ]
    },
    deliveryAreas: ['Toronto', 'North York']
  },

  {
    // id: 'kolkata-maa-canteen',
    name: 'Kolkata Maa Canteen',
    description:
      'Comforting Bengali ghar-er ranna with rice, dal, fish curry/veg option, and sweets like mishti doi & rasgulla.',
    imageUrl: 'assets/images/bengali-tiffin.jpg',
    rating: 4.5,
    reviewCount: 112,
    pricePerDay: 16,
    location: 'Oakville, ON',
    tags: ['Bengali', 'Non-Veg Available'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Bengali Dal' },
        { name: 'Aloo Posto' },
        { name: 'Begun Bhaja' },
        { name: 'Steamed Rice' },
        { name: 'Rasgulla' }
      ]
    },
    deliveryAreas: ['Oakville', 'Burlington', 'Milton']
  },

  {
    // id: 'hyderabad-spice-tiffin',
    name: 'Hyderabad Spice Tiffin',
    description:
      'Spicy and flavorful Hyderabadi meals with biryani rotation, curries, bagara rice, and mirchi ka salan.',
    imageUrl: 'assets/images/hyderabad-tiffin.jpg',
    rating: 4.8,
    reviewCount: 321,
    pricePerDay: 17,
    location: 'Milton, ON',
    tags: ['Hyderabadi', 'Spicy'],
    todaysMenu: {
      date: '2025-10-28',
      items: [
        { name: 'Veg Biryani', description: 'Authentic Hyderabadi style' },
        { name: 'Mirchi Ka Salan' },
        { name: 'Onion Raita' },
        { name: 'Double Ka Meetha' }
      ]
    },
    deliveryAreas: ['Milton', 'Brampton', 'Toronto']
  }
];
