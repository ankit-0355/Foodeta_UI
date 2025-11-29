export interface TiffinProvider {
  // id: string;

  // Provider Info
  name: string;
  description: string;
  imageUrl: string;

  // Ratings & Pricing
  rating: number;
  reviewCount: number;
  pricePerDay: number;

  // Location
  location: string;           // e.g. "Brampton, ON"

  // Tags
  tags: string[];             // ["Gujarati", "Vegetarian"]

  // Today's Menu (Flat structure)
  todaysMenu: {
    date: string;             // "2025-10-28"
    items: {
      name: string;
      description?: string;
    }[];
  };

  // Delivery Areas
  deliveryAreas: string[];    // ["Brampton", "Mississauga", "Malton"]
}
