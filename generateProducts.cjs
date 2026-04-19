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

// Real, high-quality Unsplash IDs for each category
const categoryImages = {
  'Jewelry': [
    '1515562141207-7a88fb7ce338', '1617038220319-276d3cfab638', '1599643477877-530eb83ad81f', '1535633302743-c923c51c16ca', '1605100804763-247f67b398b3'
  ],
  'Timepiece': [
    '1524592094714-0f0654e20314', '1508685096489-7aacd43bd3b1', '1523170335258-f5ed11844a49', '1533139502658-0198f920d8e8', '1614164185128-e4ec99c436d7'
  ],
  'Fragrance': [
    '1541643600914-78b084683601', '1592945403244-b3fbafd7f539', '1595425970377-c9703cf48b6d', '1585232351009-aa87416fca90', '1563170332-93bc26f6164b'
  ],
  'Fine Art': [
    '1549490349-8643362247b5', '1579783902614-a3fb3927b6a5', '1541963463532-d68292c34b19', '1578301978693-85fa9c0320b9', '1577083552431-6e5fd01aa342'
  ],
  'Decor': [
    '1582555172866-f73bb12a2ab3', '1513519245088-0e12902e5a38', '1534073828943-f801091bb18c', '1565182999561-18d7361a00a9', '1540932239986-30128078f3c5'
  ],
  'Lifestyle': [
    '1544816155-12df9643f363', '1584917865442-de89df76afd3', '1590615365410-d41f4e11ac0b', '1523275335684-37898b6baf30', '1549298916-b41d501d3772'
  ],
  'Interior': [
    '1592078615290-033ee584e267', '1586023492125-27b2c045efd7', '1616489953149-897592482390', '1616137422495-1e902b790c3d', '1616489953149-74d6c44957e8'
  ]
};

const products = [];
const usedNames = new Set();

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

for (let i = 1; i <= 720; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  let name = '';
  
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

  let finalName = name;
  let counter = 1;
  while (usedNames.has(finalName)) {
    finalName = `${name} ${getRandom(palettes.adjectives)}`;
    if (counter > 5) finalName = `${name} #${i}`;
    counter++;
  }
  usedNames.add(finalName);

  const price = Math.floor(Math.random() * 125000) + 800;
  const photoId = getRandom(categoryImages[category]);
  
  products.push({
    id: i,
    name: finalName,
    category: category,
    price: price,
    // Correct Unsplash URL format
    image: `https://images.unsplash.com/photo-${photoId}?q=80&w=800&auto=format&fit=crop`,
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

console.log('Successfully fixed 720 luxury items with valid Unsplash imagery.');
