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
  };

  // Delivery Areas
  delivery_areas: string[];    // ["Brampton", "Mississauga", "Malton"]
}

export interface CartItem {
  item: TiffinProvider;
  quantity: number;
}
