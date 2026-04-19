const fs = require('fs');
const path = require('path');

const categories = ['Jewelry', 'Timepiece', 'Fragrance', 'Fine Art', 'Decor', 'Lifestyle', 'Interior'];

const palettes = {
  stones: ['Sapphire', 'Emerald', 'Ruby', 'Diamond', 'Opal', 'Topaz', 'Jade', 'Obsidian', 'Quartz', 'Amethyst', 'Aquamarine', 'Morganite', 'Tanzanite', 'Peridot', 'Tourmaline', 'Citrine', 'Garnet', 'Onyx', 'Moonstone', 'Lapis Lazuli'],
  styles: ['Deco', 'Victorian', 'Minimalist', 'Avant-Garde', 'Baroque', 'Modernist', 'Celestial', 'Imperial', 'Art Nouveau', 'Renaissance', 'Gothic', 'Industrial', 'Futuristic', 'Zen', 'Bohemian', 'Classical', 'Regency', 'Edwardian'],
  types: ['Pendant', 'Ring', 'Bracelet', 'Necklace', 'Earrings', 'Choker', 'Brooch', 'Cuff', 'Anklet', 'Tiara', 'Locket', 'Signet Ring', 'Tennis Bracelet', 'Studs'],
  
  watchMaterials: ['Platinum', 'Rose Gold', 'Titanium', 'Carbon', 'Ceramic', 'Steel', 'Bronze', 'White Gold', 'Yellow Gold', 'Tantalum', 'Damascus Steel', 'Forged Carbon'],
  complications: ['Tourbillon', 'Moonphase', 'Chrono', 'Perpetual', 'GMT', 'Skeleton', 'Automatic', 'Minute Repeater', 'Rattrapante', 'Dual Time', 'Power Reserve', 'Regulator'],
  
  artMediums: ['Oil on Canvas', 'Sculpted Marble', 'Bronze Cast', 'Mixed Media', 'Charcoal Sketch', 'Acrylic Fluid', 'Watercolor', 'Gouache', 'Digital Painting', 'Engraving', 'Limestone', 'Terracotta'],
  artThemes: ['Nocturne', 'Genesis', 'Infinity', 'Solitude', 'Elysium', 'Primal', 'Ethereal', 'Void', 'Rebirth', 'Synthesis', 'Aether', 'Chronos', 'Gaia', 'Stardust', 'Echoes'],
  
  decorOrigins: ['Murano', 'Florentine', 'Kyoto', 'Parisian', 'Viennese', 'Milanese', 'Persian', 'Moroccan', 'Scandinavian', 'Swiss', 'Belgian', 'Tuscan'],
  decorObjects: ['Vase', 'Candelabra', 'Mirror', 'Sculpture', 'Relief', 'Tapestry', 'Clock', 'Screen', 'Urn', 'Lamp', 'Bowl', 'Statue'],
  
  adjectives: ['Ethereal', 'Midnight', 'Golden', 'Obsidian', 'Aurelian', 'Heritage', 'Velvet', 'Celestial', 'Imperial', 'Nomad', 'Infinite', 'Primal', 'Sublime', 'Royal', 'Ancient', 'Majestic', 'Divine', 'Radiant', 'Stellar', 'Timeless']
};

const images = {
  'Jewelry': ['jewelry', 'diamond', 'necklace', 'gold-ring', 'emerald'],
  'Timepiece': ['luxury-watch', 'watch-movement', 'rolex', 'horology', 'mechanical-watch'],
  'Fragrance': ['perfume-bottle', 'fragrance', 'scent', 'cologne', 'luxury-perfume'],
  'Fine Art': ['abstract-art', 'sculpture', 'painting-gallery', 'marble-statue', 'oil-painting'],
  'Decor': ['interior-decor', 'luxury-vase', 'candelabra', 'home-accessories', 'crystal-decor'],
  'Lifestyle': ['luxury-travel', 'leather-bag', 'champagne', 'private-jet-interior', 'luxury-car-detail'],
  'Interior': ['luxury-living-room', 'modern-chair', 'architectural-furniture', 'minimalist-interior', 'luxury-bedroom']
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
    name = `${getRandom(palettes.artThemes)} ${getRandom(palettes.artMediums)}`;
  } else if (category === 'Decor') {
    name = `${getRandom(palettes.decorOrigins)} ${getRandom(palettes.decorObjects)}`;
  } else {
    name = `${getRandom(palettes.adjectives)} ${getRandom(palettes.styles)} ${category}`;
  }

  // Ensure uniqueness
  let finalName = name;
  let counter = 1;
  while (usedNames.has(finalName)) {
    finalName = `${name} ${getRandom(palettes.adjectives)}`; // Add an adjective to make it unique if collision
    if (counter > 5) finalName = `${name} #${i}`; // Fallback to number if still colliding
    counter++;
  }
  usedNames.add(finalName);

  const price = Math.floor(Math.random() * 125000) + 800;
  const searchTerm = getRandom(images[category]);
  
  products.push({
    id: i,
    name: finalName,
    category: category,
    price: price,
    image: `https://images.unsplash.com/photo-1?q=80&w=800&auto=format&fit=crop&sig=${i}&key=${searchTerm}`, // Using sig and searchTerm for variety
    description: `A unique ${category.toLowerCase()} that defines the ${finalName} series. Exclusively curated for the Elegente House.`,
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

console.log('Successfully generated 720 truly unique luxury items with expanded vocabulary and varied imagery.');
