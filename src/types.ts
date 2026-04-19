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
    description: "Swiss precision meets artisanal leather craftsmanship."
  },
  {
    id: 4,
    name: "Ethereal Spark",
    category: "Jewelry",
    price: 12500,
    image: "/assets/necklace.png",
    description: "Hand-selected diamonds set in 18k white gold."
  },
  {
    id: 5,
    name: "Aurelian Shade",
    category: "Accessory",
    price: 550,
    image: "/assets/sunglasses.png",
    description: "Limited edition gold-framed sunglasses with polarized lenses."
  }
];
