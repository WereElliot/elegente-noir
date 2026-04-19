const fs = require('fs');
const path = require('path');

const categories = ['Jewelry', 'Timepiece', 'Fragrance', 'Fine Art', 'Decor', 'Lifestyle', 'Interior'];

const palettes = {
  stones: ['Sapphire', 'Emerald', 'Ruby', 'Diamond', 'Opal', 'Topaz', 'Jade', 'Obsidian', 'Quartz', 'Amethyst'],
  styles: ['Deco', 'Victorian', 'Minimalist', 'Avant-Garde', 'Baroque', 'Modernist', 'Celestial', 'Imperial'],
  types: ['Pendant', 'Ring', 'Bracelet', 'Necklace', 'Earrings', 'Choker', 'Brooch'],
  
  watchMaterials: ['Platinum', 'Rose Gold', 'Titanium', 'Carbon', 'Ceramic', 'Steel', 'Bronze', 'White Gold'],
  complications: ['Tourbillon', 'Moonphase', 'Chrono', 'Perpetual', 'GMT', 'Skeleton', 'Automatic'],
  
  artMediums: ['Oil on Canvas', 'Sculpted Marble', 'Bronze Cast', 'Mixed Media', 'Charcoal Sketch', 'Acrylic Fluid'],
  artThemes: ['Nocturne', 'Genesis', 'Infinity', 'Solitude', 'Elysium', 'Primal', 'Ethereal', 'Void'],
  
  decorOrigins: ['Murano', 'Florentine', 'Kyoto', 'Parisian', 'Viennese', 'Milanese', 'Persian'],
  decorObjects: ['Vase', 'Candelabra', 'Mirror', 'Sculpture', 'Relief', 'Tapestry', 'Clock'],
  
  adjectives: ['Ethereal', 'Midnight', 'Golden', 'Aurelian', 'Heritage', 'Velvet', 'Celestial', 'Imperial', 'Nomad', 'Infinite', 'Primal', 'Sublime', 'Royal', 'Ancient']
};

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
const usedNames = new Set();

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

for (let i = 1; i <= 720; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  let name = '';
  
  // Custom naming logic per category to avoid repetitions
  if (category === 'Jewelry') {
    name = `${getRandom(palettes.stones)} ${getRandom(palettes.styles)} ${getRandom(palettes.types)}`;
  } else if (category === 'Timepiece') {
    name = `${getRandom(palettes.watchMaterials)} ${getRandom(palettes.complications)} Edition`;
  } else if (category === 'Fine Art') {
    name = `${getRandom(palettes.artThemes)}: ${getRandom(palettes.artMediums)}`;
  } else if (category === 'Decor') {
    name = `${getRandom(palettes.decorOrigins)} ${getRandom(palettes.decorObjects)}`;
  } else {
    name = `${getRandom(palettes.adjectives)} ${getRandom(palettes.styles)} ${category}`;
  }

  // Ensure uniqueness
  let finalName = name;
  let counter = 1;
  while (usedNames.has(finalName)) {
    finalName = `${name} ${String.fromCharCode(64 + counter)}`; // A, B, C...
    counter++;
  }
  usedNames.add(finalName);

  const price = Math.floor(Math.random() * 85000) + 400;
  
  products.push({
    id: i,
    name: finalName,
    category: category,
    price: price,
    image: `${images[category]}?q=80&w=800&auto=format&fit=crop&sig=${i}`,
    description: `An exceptional ${category.toLowerCase()} that defines the ${finalName} collection. Crafted with uncompromising attention to detail and material purity.`,
    externalSourceUrl: `https://www.google.com/search?q=${encodeURIComponent(finalName)}`
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

console.log('Successfully generated 720 unique luxury items with advanced naming logic.');
