export interface TiffinProvider {
  service_id: string;
  created_at: string;    // ISO Date string

  // Provider Info
  service_name: string;
  description: string;
  image_url: string;

  // Ratings & Pricing
  rating: number;
  review_count: number;
  price: number;

  // Location
  location: string;           // e.g. "Brampton, ON"

  // Tags
  tags: string[];             // ["Gujarati", "Vegetarian"]

  // Today's Menu (Flat structure)
  items: {
    // date: string;             // "2025-10-28"
    items: {
      name: string;
      description?: string;
    }[];
    extras?: {
      item: string;
      price: number;
    }[];
  };

  // Delivery Areas
  delivery_areas: string[];    // ["Brampton", "Mississauga", "Malton"]
}

export interface CartExtra {
  item: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  cartItemId: Number;
  item: TiffinProvider;
  extras?: CartExtra[];
}
