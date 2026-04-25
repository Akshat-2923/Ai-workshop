const destinations = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    type: "Heritage",
    budget: "Mid-range",
    tagline: "The Pink City of palaces, craft, and royal grandeur",
    heroImage: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80"
    ],
    description:
      "Jaipur blends regal architecture, bustling bazaars, and Rajasthani culture into one of India’s most photogenic urban escapes. Expect sandstone forts, intricate courtyards, textiles, and unforgettable local cuisine.",
    bestTime: "October to March",
    attractions: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar", "Johari Bazaar"],
    budgetEstimate: "INR 18,000 to 35,000 for a 3-day trip",
    travelTips: [
      "Start monument visits early to avoid crowds and afternoon heat.",
      "Shop for block prints, blue pottery, and gemstones in trusted markets.",
      "Reserve one evening for a cultural dining experience with folk performances."
    ],
    mapLabel: "Map placeholder: Jaipur, Rajasthan"
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    type: "Beaches",
    budget: "Mid-range",
    tagline: "Beach days, Portuguese charm, and vibrant nightlife",
    heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1000&q=80"
    ],
    description:
      "Goa is a classic escape where golden beaches, seafood, music, churches, and laid-back coastal energy come together. It works just as well for quick getaways as it does for slow travel.",
    bestTime: "November to February",
    attractions: ["Palolem Beach", "Baga Beach", "Fontainhas", "Basilica of Bom Jesus", "Dudhsagar Falls"],
    budgetEstimate: "INR 20,000 to 45,000 for a 4-day trip",
    travelTips: [
      "Choose North Goa for lively beaches and South Goa for quieter stays.",
      "Rent a scooter for flexible beach hopping and café exploration.",
      "Book peak-season stays early if traveling around Christmas or New Year."
    ],
    mapLabel: "Map placeholder: Goa"
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    type: "Mountains",
    budget: "Budget",
    tagline: "Himalayan valleys, adventure sports, and snowy air",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1000&q=80"
    ],
    description:
      "Manali is one of India’s favorite mountain retreats, known for river valleys, cedar forests, cozy cafés, and year-round adventure. It is ideal for both scenic relaxation and active itineraries.",
    bestTime: "March to June and October to February",
    attractions: ["Solang Valley", "Rohtang Pass", "Old Manali", "Hadimba Temple", "Jogini Falls"],
    budgetEstimate: "INR 12,000 to 28,000 for a 4-day trip",
    travelTips: [
      "Carry layers even during summer because evenings stay cool.",
      "Check road and weather conditions before planning Rohtang or Atal Tunnel trips.",
      "Stay near Old Manali for cafés and a more relaxed atmosphere."
    ],
    mapLabel: "Map placeholder: Manali, Himachal Pradesh"
  },
  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala",
    type: "Nature",
    budget: "Premium",
    tagline: "Backwaters, tea estates, houseboats, and lush calm",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605538883669-825df5880d95?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80"
    ],
    description:
      "Kerala offers a softer rhythm of travel with palm-lined backwaters, hill stations, spice plantations, Ayurvedic wellness, and coastal beauty. It is one of India’s most immersive and cinematic destinations.",
    bestTime: "September to March",
    attractions: ["Alleppey Backwaters", "Munnar", "Fort Kochi", "Wayanad", "Thekkady"],
    budgetEstimate: "INR 28,000 to 60,000 for a 5-day trip",
    travelTips: [
      "Split your trip between the backwaters, hills, and coast for variety.",
      "Houseboat stays are best booked with verified operators and meal inclusions.",
      "Monsoon months are beautiful for wellness trips but can limit some activities."
    ],
    mapLabel: "Map placeholder: Kerala"
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    type: "Spiritual",
    budget: "Budget",
    tagline: "Ancient ghats, rituals, and the timeless soul of the Ganges",
    heroImage: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590075865003-e48b57f0471f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?auto=format&fit=crop&w=1000&q=80"
    ],
    description:
      "Varanasi is among the world’s oldest living cities and one of India’s deepest cultural experiences. Dawn boat rides, evening aartis, temple alleys, and sacred rituals define its unforgettable atmosphere.",
    bestTime: "October to March",
    attractions: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Assi Ghat", "Sarnath", "Sunrise boat ride"],
    budgetEstimate: "INR 10,000 to 24,000 for a 3-day trip",
    travelTips: [
      "Respect local customs and dress modestly around temples and ghats.",
      "Take an early morning boat ride for the most peaceful ghat views.",
      "Keep some cash for small purchases and local transport."
    ],
    mapLabel: "Map placeholder: Varanasi, Uttar Pradesh"
  }
];
