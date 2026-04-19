export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isPrivateListing?: boolean;
  externalSourceUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Golden Elixir",
    category: "Fragrance",
    price: 240,
    image: "/assets/perfume_gold.png",
    description: "A timeless fragrance with notes of saffron and liquid gold.",
    externalSourceUrl: "https://www.farfetch.com/shopping/women/fragrance-1/items.aspx"
  },
  {
    id: 2,
    name: "Midnight Mist",
    category: "Fragrance",
    price: 180,
    image: "/assets/perfume_midnight.png",
    description: "Mysterious and deep, like a moonlit garden in Paris.",
    externalSourceUrl: "https://www.net-a-porter.com/en-gb/shop/beauty/fragrance"
  },
  {
    id: 3,
    name: "Heritage Chrono",
    category: "Timepiece",
    price: 4500,
    image: "/assets/watch.png",
    description: "Swiss precision meets artisanal leather craftsmanship.",
    externalSourceUrl: "https://www.hodinkee.com/shop"
  },
  {
    id: 4,
    name: "Ethereal Spark",
    category: "Jewelry",
    price: 12500,
    image: "/assets/necklace.png",
    description: "Hand-selected diamonds set in 18k white gold.",
    externalSourceUrl: "https://www.tiffany.com"
  },
  {
    id: 5,
    name: "Aurelian Shade",
    category: "Accessory",
    price: 550,
    image: "/assets/sunglasses.png",
    description: "Limited edition gold-framed sunglasses with polarized lenses.",
    externalSourceUrl: "https://www.matchesfashion.com"
  },
  {
    id: 6,
    name: "Obsidian Fluidity",
    category: "Fine Art",
    price: 45000,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop",
    description: "A large-scale abstract painting exploring the depth of dark matter.",
    externalSourceUrl: "https://www.saatchiart.com"
  },
  {
    id: 7,
    name: "Murano Glass Veil",
    category: "Decor",
    price: 3200,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop",
    description: "Hand-blown glass vase from Venice with 24k gold leaf inclusions.",
    externalSourceUrl: "https://www.artemest.com"
  },
  {
    id: 8,
    name: "Silk Velvet Throne",
    category: "Interior",
    price: 8900,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop",
    description: "An architectural armchair upholstered in Italian silk velvet.",
    externalSourceUrl: "https://www.1stdibs.com"
  },
  {
    id: 9,
    name: "Ethereal Monolith",
    category: "Fine Art",
    price: 120000,
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070&auto=format&fit=crop",
    description: "A monumental marble sculpture hand-carved from Carrara stone.",
    externalSourceUrl: "https://www.artsy.net"
  },
  {
    id: 10,
    name: "Nomad Travel Set",
    category: "Lifestyle",
    price: 6500,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
    description: "Full-grain leather luggage set for the discerning global traveler.",
    externalSourceUrl: "https://www.louisvuitton.com"
  }
];
