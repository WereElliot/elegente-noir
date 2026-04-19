const fs = require('fs');
const path = require('path');

const categories = ['Jewelry', 'Timepiece', 'Fragrance', 'Fine Art', 'Decor', 'Lifestyle', 'Interior'];
const adjectives = ['Ethereal', 'Midnight', 'Golden', 'Obsidian', 'Aurelian', 'Heritage', 'Velvet', 'Celestial', 'Imperial', 'Nomad', 'Infinite', 'Primal', 'Sublime', 'Royal', 'Ancient'];
const nouns = ['Elixir', 'Spark', 'Chrono', 'Mist', 'Throne', 'Veil', 'Monolith', 'Pendant', 'Shade', 'Essence', 'Legacy', 'Fragment', 'Horizon', 'Symmetry', 'Aura'];

const images = {
  'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
  'Timepiece': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
  'Fragrance': 'https://images.unsplash.com/photo-1541643600914-78b084683601',
  'Fine Art': 'https://images.unsplash.com/photo-1549490349-8643362247b5',
  'Decor': 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
  'Lifestyle': 'https://images.unsplash.com/photo-1544816155-12df9643f363',
  'Interior': 'https://images.unsplash.com/photo-1592078615290-033ee584e267'
};

const products = [];

for (let i = 1; i <= 720; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const name = `${adj} ${noun} ${i}`;
  const price = Math.floor(Math.random() * 50000) + 200;
  
  products.push({
    id: i,
    name: name,
    category: category,
    price: price,
    image: `${images[category]}?q=80&w=800&auto=format&fit=crop&sig=${i}`,
    description: `A masterfully crafted ${category.toLowerCase()} that embodies the essence of ${adj.toLowerCase()} luxury. Part of our limited edition series ${i}.`,
    externalSourceUrl: `https://www.google.com/search?q=${encodeURIComponent(name)}`
  });
}

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'products.json'),
  JSON.stringify(products, null, 2)
);

console.log('Successfully generated 720 luxury items in src/data/products.json');
