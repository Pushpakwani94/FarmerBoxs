/**
 * Comprehensive Product Image Resolver & Fallback System
 * FarmerBox Admin & Joiner Mobile App
 */

export interface PresetImageOption {
  name: string;
  category: string;
  url: string;
}

export const PRESET_PRODUCT_IMAGES: PresetImageOption[] = [
  // Fruits
  { name: 'Fresh Apple (Seb)', category: 'Fruits', url: '/products/apple.jpg' },
  { name: 'Ripe Banana (Kela)', category: 'Fruits', url: '/products/banana.jpg' },
  { name: 'Alphonso Mango (Aam)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
  { name: 'Sweet Orange (Santra)', category: 'Fruits', url: '/products/orange.jpg' },
  { name: 'Fresh Grapes (Angoor)', category: 'Fruits', url: '/products/grapes.jpg' },
  { name: 'Ruby Pomegranate (Anar)', category: 'Fruits', url: '/products/pomegranate.jpg' },
  { name: 'Ripe Papaya (Papita)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400' },
  { name: 'Fresh Guava (Amrood)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1536511135898-751ce39c8789?w=400' },
  { name: 'Juicy Watermelon (Tarbooj)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
  { name: 'Sweet Muskmelon (Kharbuja)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { name: 'Fresh Kiwi', category: 'Fruits', url: '/products/kiwi.jpg' },
  { name: 'Dragon Fruit', category: 'Fruits', url: '/products/dragonfruit.jpg' },
  { name: 'Pineapple (Ananas)', category: 'Fruits', url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400' },
  { name: 'Sweet Strawberries (Mahabaleshwar)', category: 'Fruits', url: '/products/strawberry.jpg' },
  { name: 'Fresh Custard Apple (Sitaphal)', category: 'Fruits', url: '/products/custard_apple.jpg' },
  { name: 'Fresh Sweet Pear (Nashpati)', category: 'Fruits', url: '/products/pear.jpg' },
  { name: 'Red Sweet Cherries', category: 'Fruits', url: '/products/cherry.jpg' },
  { name: 'Fresh Lemon (Nimbu)', category: 'Fruits', url: '/products/lemon.jpg' },

  // Vegetables
  { name: 'Red Tomato (Tamatar)', category: 'Vegetables', url: '/products/tomato.jpg' },
  { name: 'Nashik Red Onion (Kanda)', category: 'Vegetables', url: '/products/onion.jpg' },
  { name: 'Fresh Potato (Aloo)', category: 'Vegetables', url: '/products/potato.jpg' },
  { name: 'Green Capsicum (Shimla Mirch)', category: 'Vegetables', url: '/products/capsicum.jpg' },
  { name: 'Green Cabbage (Patta Gobhi)', category: 'Vegetables', url: '/products/cabbage.jpg' },
  { name: 'Fresh Cauliflower (Phool Gobhi)', category: 'Vegetables', url: '/products/cauliflower.jpg' },
  { name: 'Lady Finger / Bhindi (Okra)', category: 'Vegetables', url: '/products/ladyfinger.jpg' },
  { name: 'Fresh Brinjal (Baingan)', category: 'Vegetables', url: '/products/brinjal.jpg' },
  { name: 'Fresh Carrot (Gajar)', category: 'Vegetables', url: '/products/carrot.jpg' },
  { name: 'Dark Beetroot (Chukandar)', category: 'Vegetables', url: '/products/beetroot.jpg' },
  { name: 'Spicy Green Chilli (Hari Mirch)', category: 'Vegetables', url: '/products/greenchili.jpg' },
  { name: 'Fresh Garlic (Lasun)', category: 'Vegetables', url: '/products/garlic.jpg' },
  { name: 'Fresh Ginger (Adrak)', category: 'Vegetables', url: '/products/ginger.jpg' },
  { name: 'Ridge Gourd / Dodka (Turai)', category: 'Vegetables', url: '/products/ridgegourd.jpg' },
  { name: 'Green Pumpkin (Kaddu)', category: 'Vegetables', url: '/products/pumpkin.jpg' },
  { name: 'Crisp Cucumber (Kheera)', category: 'Vegetables', url: '/products/cucumber.jpg' },
  { name: 'Fresh Bottle Gourd (Lauki)', category: 'Vegetables', url: '/products/bottlegourd.jpg' },
  { name: 'Fresh Bitter Gourd (Karela)', category: 'Vegetables', url: '/products/bittergourd.jpg' },
  { name: 'Fresh Tender Drumsticks (Moringa / Shevga)', category: 'Vegetables', url: '/products/drumstick.jpg' },
  { name: 'Fresh Sweet Corn', category: 'Vegetables', url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400' },
  { name: 'Green Peas (Matar)', category: 'Vegetables', url: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400' },
  { name: 'Fresh Button Mushrooms', category: 'Mushrooms', url: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400' },
  { name: 'Green Broccoli', category: 'Exotic Veggies', url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400' },

  // Leafy Greens & Herbs
  { name: 'Fresh Spinach (Palak)', category: 'Leafy Greens', url: '/products/spinach.jpg' },
  { name: 'Fresh Coriander (Dhaniya)', category: 'Herbs & Seasoning', url: '/products/coriander.jpg' },
  { name: 'Fresh Mint (Pudina)', category: 'Herbs & Seasoning', url: '/products/mint.jpg' },
  { name: 'Fresh Methi (Fenugreek)', category: 'Leafy Greens', url: '/products/fenugreek.jpg' },

  // Dairy & Grocery
  { name: 'Fresh Malai Paneer', category: 'Dairy & Supplies', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
  { name: 'Fresh Cow Milk (Dairy)', category: 'Dairy & Supplies', url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' }
];

/**
 * Returns a high-definition image URL mapped by product name or category.
 * If currentImage is provided and valid, it's checked; otherwise it resolves by keywords.
 */
export const resolveProductImage = (name?: string, category?: string, currentImage?: string): string => {
  const n = (name || '').toLowerCase().trim();
  const c = (category || '').toLowerCase().trim();

  // If user provided a valid base64 data URL or external HTTPS url that is not empty
  if (currentImage && currentImage.trim() !== '') {
    const trimmed = currentImage.trim();
    if (trimmed.startsWith('data:image/') || trimmed.startsWith('blob:')) {
      return trimmed;
    }
    // If it's a known valid local path in /products/
    if (
      trimmed === '/products/apple.jpg' ||
      trimmed === '/products/banana.jpg' ||
      trimmed === '/products/orange.jpg' ||
      trimmed === '/products/grapes.jpg' ||
      trimmed === '/products/pomegranate.jpg' ||
      trimmed === '/products/kiwi.jpg' ||
      trimmed === '/products/dragonfruit.jpg' ||
      trimmed === '/products/lemon.jpg' ||
      trimmed === '/products/tomato.jpg' ||
      trimmed === '/products/onion.jpg' ||
      trimmed === '/products/potato.jpg' ||
      trimmed === '/products/greenchili.jpg' ||
      trimmed === '/products/capsicum.jpg' ||
      trimmed === '/products/cabbage.jpg' ||
      trimmed === '/products/cauliflower.jpg' ||
      trimmed === '/products/ladyfinger.jpg' ||
      trimmed === '/products/brinjal.jpg' ||
      trimmed === '/products/carrot.jpg' ||
      trimmed === '/products/beetroot.jpg' ||
      trimmed === '/products/garlic.jpg' ||
      trimmed === '/products/ginger.jpg' ||
      trimmed === '/products/spinach.jpg' ||
      trimmed === '/products/coriander.jpg' ||
      trimmed === '/products/mint.jpg' ||
      trimmed === '/products/fenugreek.jpg' ||
      trimmed === '/products/pumpkin.jpg' ||
      trimmed === '/products/ridgegourd.jpg'
    ) {
      return trimmed;
    }

    // If it's a valid remote URL
    if (trimmed.startsWith('https://images.unsplash.com/') || trimmed.startsWith('https://firebasestorage.googleapis.com/')) {
      return trimmed;
    }
  }

  // --- 1. FRUITS ---
  if (n.includes('apple') || n.includes('seb') || n.includes('himachal') || n.includes('fuji') || n.includes('kashmiri apple') || n.includes('red delicious')) {
    return '/products/apple.jpg';
  }
  if (n.includes('banana') || n.includes('kela') || n.includes('yelakki') || n.includes('robusta') || n.includes('cavendish')) {
    return '/products/banana.jpg';
  }
  if (n.includes('mango') || n.includes('aam') || n.includes('alphonso') || n.includes('kesar') || n.includes('badami') || n.includes('dasheri') || n.includes('langra')) {
    return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400';
  }
  if (n.includes('orange') || n.includes('santra') || n.includes('nagpur') || n.includes('mandarin') || n.includes('malta')) {
    return '/products/orange.jpg';
  }
  if (n.includes('grapes') || n.includes('angoor') || n.includes('draksh') || n.includes('sonaka') || n.includes('sharad') || n.includes('thompson')) {
    return '/products/grapes.jpg';
  }
  if (n.includes('pomegranate') || n.includes('anaar') || n.includes('anar') || n.includes('bhagwa')) {
    return '/products/pomegranate.jpg';
  }
  if (n.includes('papaya') || n.includes('papita') || n.includes('taiwan 786') || n.includes('red lady')) {
    return 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400';
  }
  if (n.includes('guava') || n.includes('amrood') || n.includes('taiwan guava') || n.includes('lucknow 49') || n.includes('allahabad')) {
    return 'https://images.unsplash.com/photo-1536511135898-751ce39c8789?w=400';
  }
  if (n.includes('watermelon') || n.includes('water melon') || n.includes('tarbooj') || n.includes('kalinga') || n.includes('namdhari')) {
    return 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400';
  }
  if (n.includes('muskmelon') || n.includes('musk melon') || n.includes('kharbuja') || n.includes('cantaloupe') || n.includes('honeydew') || n.includes('madhuras')) {
    return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400';
  }
  if (n.includes('kiwi') || n.includes('zespri')) {
    return '/products/kiwi.jpg';
  }
  if (n.includes('dragon') || n.includes('pitaya')) {
    return '/products/dragonfruit.jpg';
  }
  if (n.includes('pineapple') || n.includes('ananas') || n.includes('queen pineapple')) {
    return 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400';
  }
  if (n.includes('strawberry') || n.includes('strawberries') || n.includes('mahabaleshwar')) {
    return '/products/strawberry.jpg';
  }
  if (n.includes('custard') || n.includes('sitaphal') || n.includes('sharifa')) {
    return '/products/custard_apple.jpg';
  }
  if (n.includes('pear') || n.includes('nashpati') || n.includes('babugosha')) {
    return '/products/pear.jpg';
  }
  if (n.includes('cherry') || n.includes('cherries')) {
    return '/products/cherry.jpg';
  }
  if (n.includes('chikoo') || n.includes('sapota') || n.includes('chiku') || n.includes('dahanu')) {
    return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400';
  }
  if (n.includes('avocado') || n.includes('butter fruit')) {
    return 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400';
  }
  if (n.includes('coconut') || n.includes('nariyal') || n.includes('tender coconut')) {
    return 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400';
  }
  if (n.includes('lemon') || n.includes('nimbu') || n.includes('lime') || n.includes('mosambi') || n.includes('sweet lime')) {
    return '/products/lemon.jpg';
  }

  // --- 2. VEGETABLES ---
  if (n.includes('tomato') || n.includes('tamatar')) {
    return '/products/tomato.jpg';
  }
  if (n.includes('onion') || n.includes('pyaz') || n.includes('kanda') || n.includes('nashik onion')) {
    return '/products/onion.jpg';
  }
  if (n.includes('potato') || n.includes('aloo') || n.includes('batata') || n.includes('agra potato')) {
    return '/products/potato.jpg';
  }
  if (n.includes('chili') || n.includes('chilli') || n.includes('mirch') || n.includes('hari mirch') || n.includes('green chilli')) {
    return '/products/greenchili.jpg';
  }
  if (n.includes('capsicum') || n.includes('shimla') || n.includes('bell pepper') || n.includes('yellow capsicum') || n.includes('red capsicum')) {
    return '/products/capsicum.jpg';
  }
  if (n.includes('cabbage') || n.includes('patta gobhi') || n.includes('bandh gobhi')) {
    return '/products/cabbage.jpg';
  }
  if (n.includes('cauliflower') || n.includes('phool gobhi') || n.includes('gobhi')) {
    return '/products/cauliflower.jpg';
  }
  if (n.includes('lady') || n.includes('bhindi') || n.includes('okra') || n.includes('ladyfinger')) {
    return '/products/ladyfinger.jpg';
  }
  if (n.includes('brinjal') || n.includes('eggplant') || n.includes('baingan') || n.includes('aubergine')) {
    return '/products/brinjal.jpg';
  }
  if (n.includes('carrot') || n.includes('gajar') || n.includes('red carrot') || n.includes('orange carrot')) {
    return '/products/carrot.jpg';
  }
  if (n.includes('beetroot') || n.includes('chukandar') || n.includes('beet')) {
    return '/products/beetroot.jpg';
  }
  if (n.includes('garlic') || n.includes('lasun') || n.includes('lahsun')) {
    return '/products/garlic.jpg';
  }
  if (n.includes('ginger') || n.includes('adrak')) {
    return '/products/ginger.jpg';
  }
  if (n.includes('spinach') || n.includes('palak')) {
    return '/products/spinach.jpg';
  }
  if (n.includes('coriander') || n.includes('dhaniya') || n.includes('kothmir') || n.includes('cilantro')) {
    return '/products/coriander.jpg';
  }
  if (n.includes('mint') || n.includes('pudina')) {
    return '/products/mint.jpg';
  }
  if (n.includes('methi') || n.includes('fenugreek') || n.includes('kasuri')) {
    return '/products/fenugreek.jpg';
  }
  if (n.includes('pumpkin') || n.includes('kaddu') || n.includes('bhopla')) {
    return '/products/pumpkin.jpg';
  }
  if (n.includes('ridge') || n.includes('turai') || n.includes('dodka') || n.includes('tori')) {
    return '/products/ridgegourd.jpg';
  }
  if (n.includes('bottle') || n.includes('lauki') || n.includes('dudhi') || n.includes('ghiya')) {
    return '/products/bottlegourd.jpg';
  }
  if (n.includes('bitter') || n.includes('karela')) {
    return '/products/bittergourd.jpg';
  }
  if (n.includes('drumstick') || n.includes('moringa') || n.includes('shevga') || n.includes('sahjan')) {
    return '/products/drumstick.jpg';
  }
  if (n.includes('cucumber') || n.includes('kheera') || n.includes('kakdi')) {
    return '/products/cucumber.jpg';
  }
  if (n.includes('mushroom') || n.includes('button mushroom') || n.includes('khumb')) {
    return 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400';
  }
  if (n.includes('corn') || n.includes('sweet corn') || n.includes('makka') || n.includes('bhutta')) {
    return 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400';
  }
  if (n.includes('peas') || n.includes('matar') || n.includes('green peas')) {
    return 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400';
  }
  if (n.includes('broccoli')) {
    return 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400';
  }
  if (n.includes('radish') || n.includes('mooli')) {
    return 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400';
  }

  // --- 3. DAIRY & GROCERY ---
  if (n.includes('paneer') || n.includes('cheese') || n.includes('tofu')) {
    return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400';
  }
  if (n.includes('milk') || n.includes('doodh') || n.includes('curd') || n.includes('dahi') || n.includes('butter') || n.includes('ghee')) {
    return 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400';
  }
  if (n.includes('dal') || n.includes('pulse') || n.includes('chana') || n.includes('moong') || n.includes('toor') || n.includes('urad') || n.includes('masoor') || n.includes('rajma') || n.includes('rice') || n.includes('chawal')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400';
  }
  if (n.includes('oil') || n.includes('tel') || n.includes('mustard oil') || n.includes('sunflower')) {
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400';
  }

  // --- Category Fallbacks ---
  if (c.includes('fruit') || c.includes('citrus') || c.includes('melon')) {
    return '/products/apple.jpg';
  }
  if (c.includes('leafy') || c.includes('herb')) {
    return '/products/spinach.jpg';
  }
  if (c.includes('root') || c.includes('gourd')) {
    return '/products/carrot.jpg';
  }
  if (c.includes('dairy') || c.includes('supply')) {
    return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400';
  }

  return '/products/tomato.jpg';
};

/**
 * Robust fallback image handler for <img> onError events
 */
export const getProductImageFallback = (name?: string, category?: string): string => {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();

  if (n.includes('apple')) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300';
  if (n.includes('banana')) return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300';
  if (n.includes('mango')) return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300';
  if (n.includes('orange')) return 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300';
  if (n.includes('grapes')) return 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300';
  if (n.includes('pomegranate')) return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300';
  if (n.includes('papaya')) return 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=300';
  if (n.includes('guava')) return 'https://images.unsplash.com/photo-1536511135898-751ce39c8789?w=300';
  if (n.includes('watermelon')) return 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300';
  if (n.includes('muskmelon')) return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300';
  if (n.includes('kiwi')) return 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=300';
  if (n.includes('dragon')) return 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=300';

  if (c.includes('fruit') || c.includes('citrus') || c.includes('melon')) {
    return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300';
  }
  return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300';
};
