import { Product, ProductCategory } from '../types';

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    description: 'Immersive sound engineering, studio drivers, and active noise-cancellation.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    itemCount: 8
  },
  {
    id: 'smart-wearables',
    name: 'Smart Wearables',
    slug: 'smart-wearables',
    description: 'Precision biometrics, sapphire glass displays, and titanium craftsmanship.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    itemCount: 6
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Sub-millisecond latency, ultra-light chassis, and optical switches.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    itemCount: 7
  },
  {
    id: 'mobile-accessories',
    name: 'Mobile Accessories',
    slug: 'mobile-accessories',
    description: 'High-speed GaN charging, magnetic power stations, and braided cables.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80',
    itemCount: 11
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    slug: 'smart-home',
    description: 'Intelligent lighting, environmental sensors, and cinematic projection.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80',
    itemCount: 5
  },
  {
    id: 'work-productivity',
    name: 'Work & Productivity',
    slug: 'work-productivity',
    description: 'Ergonomic input devices, low-profile keyboards, and multi-display hubs.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    itemCount: 9
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'wireless-earbuds-pro',
    name: 'Wireless Earbuds Pro',
    tagline: 'Hybrid ANC with 3D Spatial Audio and 36-Hour Battery Life',
    category: 'Audio',
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.9,
    reviewCount: 248,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Bestseller',
    inStock: true,
    stockCount: 34,
    shortDescription: 'Precision-tuned dual dynamic drivers deliver studio-grade acoustic clarity, active noise cancellation, and seamless wireless switching.',
    fullDescription: 'Experience sound with zero distraction. The Nexora Wireless Earbuds Pro combine military-grade active noise cancellation with custom-engineered beryllium diaphragms. Featuring an ultra-comfortable ergonomic seal, transparency mode for safe commuting, and Qi wireless rapid-charging case delivering up to 36 hours of continuous playback.',
    features: [
      'Adaptive Hybrid Active Noise Cancelling up to 42dB',
      'Custom 11mm beryllium-coated dynamic drivers',
      '6 beamforming MEMS microphones with AI wind reduction',
      'IPX5 sweat and splash resistance rating',
      'Multipoint Bluetooth 5.3 connection for instant device swapping'
    ],
    specs: [
      { name: 'Battery Life', value: '8 hrs per charge (36 hrs with case)' },
      { name: 'Connectivity', value: 'Bluetooth 5.3 LE / AAC / LDAC' },
      { name: 'Charging', value: 'USB-C + Qi Wireless Fast Charge' },
      { name: 'Weight', value: '4.8g per earbud' },
      { name: 'Warranty', value: '2-Year International Nexora Care' }
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#121417' },
      { name: 'Titanium Slate', hex: '#3A3F47' },
      { name: 'Arctic Silver', hex: '#E2E5E9' }
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'smartwatch-ultra',
    name: 'Smartwatch Ultra',
    tagline: 'Titanium Case, Sapphire Glass AMOLED, and Comprehensive Biometrics',
    category: 'Smart Wearables',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 182,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'New',
    inStock: true,
    stockCount: 19,
    shortDescription: 'Crafted from aerospace aerospace titanium with an ultra-bright 2000-nit sapphire crystal display, dual-frequency GPS, and 100m water resistance.',
    fullDescription: 'Engineered for athletes, adventurers, and everyday professionals. The Nexora Smartwatch Ultra integrates medical-grade optical sensors monitoring ECG, SpO2, heart rate variability, and sleep sleep stages in real-time. Wrapped in a lightweight 49mm titanium enclosure with up to 14 days of endurance battery life.',
    features: [
      '1.96" Ultra-Bright AMOLED Display (2000 nits peak)',
      'Aerospace-Grade Grade 5 Titanium case with raised sapphire bezel',
      'Real-time ECG & SpO2 biometric health sensor suite',
      'Dual-frequency L1/L5 GNSS GPS navigation tracking',
      '10 ATM / 100-meter dive and swim resistance'
    ],
    specs: [
      { name: 'Battery Life', value: 'Up to 14 days standard (60 hrs GPS mode)' },
      { name: 'Display', value: '1.96-inch Sapphire Crystal AMOLED (410x502)' },
      { name: 'Sensors', value: 'ECG, Optical HR, SpO2, Skin Temp, Barometer' },
      { name: 'Materials', value: 'Grade 5 Titanium & Fluoroelastomer' },
      { name: 'Water Rating', value: '10 ATM (100 meters)' }
    ],
    colors: [
      { name: 'Stealth Black', hex: '#16191D' },
      { name: 'Natural Titanium', hex: '#686D76' },
      { name: 'Cyber Olive', hex: '#2C3A2E' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'portable-bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    tagline: '360° Omnidirectional Acoustic Sound with IP67 Waterproofing',
    category: 'Audio',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 315,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Sale',
    inStock: true,
    stockCount: 42,
    shortDescription: 'Room-filling 30W stereo power engineered into a rugged, cylindrical waterproof enclosure designed for outdoor expeditions and home listening.',
    fullDescription: 'Don’t compromise on acoustic power. Dual passive radiators and twin high-excursion neodymium drivers deliver deep, distortion-free sub-bass. Features PartyLink technology to sync up to 50 Nexora speakers simultaneously for an acoustic stadium experience.',
    features: [
      '30W RMS dynamic high-output stereo drivers',
      'Dual opposing passive radiators for punchy sub-bass',
      'IP67 dustproof and waterproof (submersible up to 1m)',
      'PartyLink multi-speaker wireless synchronization',
      'Built-in 5200mAh power bank to charge smartphones on the go'
    ],
    specs: [
      { name: 'Playtime', value: '24 hours at 60% volume' },
      { name: 'Frequency Range', value: '45Hz - 20,000Hz' },
      { name: 'Connectivity', value: 'Bluetooth 5.3 + 3.5mm Aux' },
      { name: 'Dimensions', value: '185 x 75 x 75 mm' },
      { name: 'Weight', value: '590g' }
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#1E2328' },
      { name: 'Forest Green', hex: '#1C3B24' },
      { name: 'Deep Navy', hex: '#14213D' }
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'precision-gaming-mouse',
    name: 'Precision Gaming Mouse',
    tagline: '26,000 DPI Optical Sensor, 54g Ultra-Lightweight Shell',
    category: 'Gaming',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    stockCount: 27,
    shortDescription: 'Engineered for competitive esports precision. Featuring 8000Hz polling rate, flawless optical tracking, and zero-rebound Gen-3 optical switches.',
    fullDescription: 'Cut friction to zero. The Nexora Precision Gaming Mouse weighs just 54 grams without honeycomb holes, providing rigid structural integrity. Armed with the proprietary NexSense 26K optical sensor with 650 IPS tracking and 50G acceleration.',
    features: [
      'NexSense 26,000 DPI esports sensor with 99.8% resolution accuracy',
      'True 8,000Hz wireless hyper-polling for near-zero input lag',
      'Optical switch actuators rated for 90 million clicks',
      '100% Virgin PTFE glide skates with rounded bevel edges',
      'Up to 110 hours continuous competitive gaming on 2.4GHz wireless'
    ],
    specs: [
      { name: 'Sensor', value: 'NexSense 26K Optical (50-26,000 DPI)' },
      { name: 'Weight', value: '54g (Ultralight solid shell)' },
      { name: 'Battery', value: '110 hours wireless (USB-C rapid charge)' },
      { name: 'Polling Rate', value: '1000Hz / 2000Hz / 4000Hz / 8000Hz' },
      { name: 'Switches', value: 'Gen-3 Optical Light-Strike' }
    ],
    colors: [
      { name: 'Midnight Matte', hex: '#111316' },
      { name: 'Lunar White', hex: '#F0F2F5' }
    ],
    isFeatured: true
  },
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    tagline: 'Audiophile 40mm Beryllium Drivers, 55-Hour Playtime, Studio Comfort',
    category: 'Audio',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Bestseller',
    inStock: true,
    stockCount: 22,
    shortDescription: 'Over-ear flagship acoustic reference headphones with multi-level active noise cancellation, cloud-soft memory foam, and lossless audio codec support.',
    fullDescription: 'Engineered for uncompromising high-fidelity audio reproduction. Custom 40mm tuned acoustic drivers reveal every subtle frequency nuance from crystalline highs to tactile sub-bass. Plush protein leather and ergonomic acoustic earcups ensure all-day studio comfort.',
    features: [
      'Custom 40mm tuned acoustic drivers with titanium dome',
      'Lossless Hi-Res Audio certified with Sony LDAC and Qualcomm aptX HD',
      'Quad-microphone hybrid active noise cancellation with voice isolation',
      '55 hours of battery life with ANC enabled (70 hours without ANC)',
      '10-minute quick charge yields 6 hours of continuous listening'
    ],
    specs: [
      { name: 'Driver Size', value: '40mm Custom Titanium Beryllium' },
      { name: 'Battery Life', value: '55 Hours (ANC On) / 70 Hours (ANC Off)' },
      { name: 'Audio Codecs', value: 'LDAC, aptX HD, AAC, SBC' },
      { name: 'Weight', value: '250g' },
      { name: 'Pads', value: 'Slow-rebound acoustic memory foam' }
    ],
    colors: [
      { name: 'Carbon Black', hex: '#141619' },
      { name: 'Brushed Silver', hex: '#B8BFC6' },
      { name: 'Deep Sage', hex: '#314436' }
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'fast-charging-hub',
    name: 'Fast Charging Hub',
    tagline: '140W GaN III Multi-Port Fast Charger with Smart Dynamic Power',
    category: 'Mobile Accessories',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewCount: 195,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Sale',
    inStock: true,
    stockCount: 50,
    shortDescription: 'Next-generation Gallium Nitride (GaN III) architecture delivering 140W total output across 3x USB-C and 1x USB-A ports.',
    fullDescription: 'Power your entire workstation from a single compact pocket-sized brick. The Nexora 140W GaN Hub charges a MacBook Pro 16" to 55% in just 30 minutes while simultaneously fast-charging your smartphone and smartwatch without overheating.',
    features: [
      '140W Max USB-C Power Delivery 3.1 high-efficiency charging',
      'GaN III semiconductor reduces heat by 35% and size by 40%',
      'Smart power distribution dynamically balances connected devices',
      'Over-voltage, surge, short-circuit, and thermal protection system',
      'Universal 100-240V international travel compatibility'
    ],
    specs: [
      { name: 'Max Output', value: '140W Total (140W single-port PD 3.1)' },
      { name: 'Ports', value: '3x USB-C + 1x USB-A QC 3.0' },
      { name: 'Technology', value: 'GaN III Semiconductor' },
      { name: 'Dimensions', value: '75 x 75 x 32 mm' },
      { name: 'Certifications', value: 'UL, CE, FCC, RoHS' }
    ],
    colors: [
      { name: 'Matte Graphite', hex: '#1C1F24' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    isFeatured: true
  },
  {
    id: 'mini-portable-projector',
    name: 'Mini Portable Projector',
    tagline: '1080p Native HDR10, 800 ANSI Lumens, Instant Auto-Focus & Keystone',
    category: 'Smart Home',
    price: 389.99,
    originalPrice: 449.99,
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'New',
    inStock: true,
    stockCount: 15,
    shortDescription: 'Cinematic pocket entertainment. Projects up to 150 inches with automatic keystone correction, built-in Harman acoustic speakers, and 3-hour battery.',
    fullDescription: 'Turn any wall or ceiling into an IMAX theater. The Nexora Mini Projector features real 800 ANSI lumens, AI obstacle avoidance, and TOF laser auto-focus in under 1 second. Stream directly via dual-band Wi-Fi 6 or connect via HDMI to consoles and laptops.',
    features: [
      'Native 1080p Full HD with 4K decoding support & HDR10',
      '800 ANSI Lumens brightness for vibrant clarity in any room',
      'Instant TOF laser auto-focus & omnidirectional keystone',
      'Built-in 10W stereo audio with deep acoustic chamber',
      'Integrated battery supports 3 hours of wire-free movie viewing'
    ],
    specs: [
      { name: 'Brightness', value: '800 ANSI Lumens' },
      { name: 'Projection Size', value: '40" - 150" diagonal' },
      { name: 'Resolution', value: 'Native 1920x1080 (Supports 4K input)' },
      { name: 'Battery', value: '15,000mAh (Up to 3 hours playtime)' },
      { name: 'OS', value: 'Nexora Smart Cinema OS with streaming apps' }
    ],
    colors: [
      { name: 'Space Gray', hex: '#2A2E35' },
      { name: 'Matte White', hex: '#F2F4F7' }
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'smart-desk-lamp',
    name: 'Smart Desk Lamp',
    tagline: 'Dual-Zone Ambient & Task Light with CRI 98 True-Color Accuracy',
    category: 'Smart Home',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    stockCount: 31,
    shortDescription: 'Dual-axis architectural desk light with ambient rear glow, continuous stepless dimming, circadian rhythm auto-adjustment, and wireless Qi base.',
    fullDescription: 'Protect your eyesight during demanding work sessions. With a Color Rendering Index (CRI) of 98, colors appear as natural as daylight. The optical beam cuts screen glare by 99% while the weighted aluminum base features an integrated 15W wireless charging pad.',
    features: [
      'Museum-grade CRI 98 light quality eliminating eye strain',
      'Dual-zone illumination: directional task lamp + rear ambient glow',
      'Integrated 15W magnetic wireless phone charger base',
      'Smart ambient light sensor automatically adjusts brightness',
      'Full touch slider control for 2700K - 6500K color temperature'
    ],
    specs: [
      { name: 'Color Temperature', value: '2700K - 6500K stepless' },
      { name: 'CRI Rating', value: 'Ra >= 98' },
      { name: 'Max Illumination', value: '1800 Lux at 45cm' },
      { name: 'Charging Base', value: '15W Fast Qi Wireless' },
      { name: 'Material', value: 'Anodized Aircraft Aluminum' }
    ],
    colors: [
      { name: 'Anodized Black', hex: '#17181B' },
      { name: 'Silver Frost', hex: '#D5D8DC' }
    ],
    isFeatured: true
  },
  {
    id: 'mechanical-slim-keyboard',
    name: 'Mechanical Slim Keyboard',
    tagline: 'Ultra-Thin Aluminum Body with Hot-Swappable Low-Profile Switches',
    category: 'Work & Productivity',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviewCount: 219,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'New',
    inStock: true,
    stockCount: 28,
    shortDescription: 'Precision CNC aluminum chassis measuring just 16mm thin. Tri-mode wireless connectivity, per-key RGB, and custom dampened acoustic switches.',
    fullDescription: 'The ultimate typing instrument for engineers, writers, and creators. Connects up to 3 Bluetooth devices plus 2.4GHz low-latency wireless. Equipped with factory-lubricated low-profile optical-mechanical switches with satisfying tactile actuation.',
    features: [
      'CNC milled unibody aerospace aluminum frame',
      'Hot-swappable low-profile switches for effortless customisation',
      'Tri-mode connectivity: Bluetooth 5.2, 2.4GHz USB, and Type-C',
      'Mac & Windows dual layout with dedicated command switches',
      'Up to 300 hours battery life with backlight disabled'
    ],
    specs: [
      { name: 'Profile', value: '16mm Low Profile 75% Layout' },
      { name: 'Switches', value: 'Hot-Swap Gateron Low-Profile Linear/Tactile' },
      { name: 'Battery', value: '4000mAh Rechargeable' },
      { name: 'Connectivity', value: '2.4GHz + BT 5.2 (3 devices) + USB-C' },
      { name: 'Weight', value: '620g' }
    ],
    colors: [
      { name: 'Deep Space', hex: '#1B1E22' },
      { name: 'Carbon Gray', hex: '#424852' }
    ],
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: 'magclick-power-bank',
    name: 'MagClick Wireless Power Bank',
    tagline: '10,000mAh Magnetic Snap-On Battery with Foldable Kickstand',
    category: 'Mobile Accessories',
    price: 59.99,
    originalPrice: 74.99,
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1622445262464-84b14e074551?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b14e074551?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    stockCount: 45,
    shortDescription: 'Ultra-strong N52 neodymium magnetic snap battery featuring 15W wireless charging, 20W bi-directional PD port, and built-in zinc alloy kickstand.',
    fullDescription: 'Never let your battery dip into the red. Snap securely onto your iPhone or Qi2 smartphone and charge automatically. Features an intuitive digital LED display that shows remaining power percentage with pinpoint 1% accuracy.',
    features: [
      '10,000mAh ultra-dense lithium polymer battery cell',
      'Strong 15N magnetic hold that won’t slip or slide in pocket',
      'Integrated foldable zinc kickstand for hands-free video viewing',
      '20W USB-C input/output fast charge',
      'Pass-through charging technology allows charging phone & bank together'
    ],
    specs: [
      { name: 'Capacity', value: '10,000mAh / 38.5Wh' },
      { name: 'Wireless Output', value: '15W Max (Qi2 / MagSafe compatible)' },
      { name: 'Wired Output', value: '20W USB-C Power Delivery' },
      { name: 'Dimensions', value: '104 x 68 x 16 mm' },
      { name: 'Weight', value: '210g' }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#15171A' },
      { name: 'Emerald Slate', hex: '#1C3125' }
    ],
    isFeatured: false
  },
  {
    id: '4k-ultra-wide-webcam',
    name: '4K Ultra-Wide Studio Webcam',
    tagline: 'Sony STARVIS Sensor with AI Framing and Dual Beamforming Mics',
    category: 'Work & Productivity',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'New',
    inStock: true,
    stockCount: 18,
    shortDescription: 'Broadcast-grade 4K 60FPS video with HDR clarity in any lighting condition. Integrated magnetic privacy shutter and intelligent AI face-tracking.',
    fullDescription: 'Upgrade every presentation, conference, and broadcast. The large Sony STARVIS optical sensor pulls in 2.5x more light than standard webcams, ensuring crisp image definition even in dimly lit rooms. Complete with dual noise-cancelling mics that filter out typing and ambient office noise.',
    features: [
      'True 4K 60FPS uncompressed streaming with Sony STARVIS sensor',
      'AI Auto-Framing keeps you centered dynamically during movement',
      'High-dynamic range (HDR) prevents blown-out window backlighting',
      'Dual noise-filtering MEMS microphones with 3-meter pickup',
      'Physical magnetic privacy shutter for guaranteed security'
    ],
    specs: [
      { name: 'Resolution', value: '4K at 60fps / 1080p at 60fps' },
      { name: 'Field of View', value: '65° / 78° / 90° adjustable' },
      { name: 'Focus Type', value: 'Phase Detection Dual-Pixel AF' },
      { name: 'Connection', value: 'USB-C 3.2 Gen 1 (Plug & Play)' },
      { name: 'Mounting', value: 'Tripod thread + universal monitor clip' }
    ],
    colors: [
      { name: 'Graphite Black', hex: '#1A1C20' }
    ],
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: 'ergonomic-vertical-mouse',
    name: 'Ergonomic Vertical Mouse',
    tagline: '57° Natural Handshake Angle with Silent Clicks and Thumb Rest',
    category: 'Work & Productivity',
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: 153,
    image: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Sale',
    inStock: true,
    stockCount: 36,
    shortDescription: 'Clinically tested to reduce forearm muscle strain by 40%. Features silent acoustic switches, textured rubber thumb grip, and smooth multi-device flow.',
    fullDescription: 'Work for hours with zero wrist fatigue. The 57-degree natural angle mimics the posture of an unforced resting hand. Switch seamlessly between three paired computers with the tap of a button and enjoy whisper-quiet clicks.',
    features: [
      '57° scientific vertical angle promotes neutral wrist posture',
      'Whisper-quiet acoustic switches reduce click noise by 90%',
      'Connects up to 3 computers with easy toggle switch',
      'Rechargeable 500mAh battery lasts up to 4 months per charge',
      'Customizable 4-speed DPI switch (800 / 1200 / 1600 / 2400)'
    ],
    specs: [
      { name: 'Posture Angle', value: '57° Bio-Ergonomic' },
      { name: 'DPI Levels', value: '800 / 1200 / 1600 / 2400' },
      { name: 'Battery', value: 'Rechargeable USB-C (4 months life)' },
      { name: 'Connectivity', value: '2.4GHz Wireless + Bluetooth 5.0' },
      { name: 'Weight', value: '115g' }
    ],
    colors: [
      { name: 'Charcoal Matte', hex: '#1D2024' },
      { name: 'Light Platinum', hex: '#E5E8EC' }
    ],
    isFeatured: false
  }
];

export const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    rating: 5,
    date: '3 days ago',
    title: 'Absolute game changer for audio fidelity',
    comment: 'The acoustic tuning and noise isolation are on another level compared to standard consumer brands. The brushed dark finish feels premium in the hand and the battery easily lasts through multiple transcontinental flights.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    rating: 5,
    date: '1 week ago',
    title: 'Best hardware build quality I have seen',
    comment: 'Everything from the packaging to the solid tactile feel of the buttons screams precision engineering. Shipping was remarkably fast and setup took under 30 seconds.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'David K.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Worth every penny for my home desk setup',
    comment: 'Matches my dark minimalist desk setup perfectly. The green accents are tasteful and subtle, exactly what I look for in modern tech accessories.',
    verified: true
  }
];
