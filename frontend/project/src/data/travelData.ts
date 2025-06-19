export const travelSuggestions = [
  {
    id: '1',
    country: 'Japan',
    destination: 'Tokyo & Kyoto',
    image: 'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg',
    duration: '10 days',
    totalPrice: 4850,
    flightPrice: 1200,
    hotelPrice: 2100,
    experiencePrice: 1550,
    outboundFlight: {
      departure: 'LAX',
      arrival: 'NRT',
      time: '11:30 AM - 3:15 PM (+1)',
      duration: '11h 45m',
      airline: 'Japan Airlines'
    },
    returnFlight: {
      departure: 'NRT',
      arrival: 'LAX',
      time: '5:20 PM - 10:45 AM',
      duration: '9h 25m',
      airline: 'Japan Airlines'
    },
    hotel: {
      name: 'Grand Hyatt Tokyo',
      rating: 5,
      location: 'Roppongi Hills',
      pricePerNight: 210,
      nights: 10
    },
    experiences: [
      {
        name: 'Private Sushi Making Class',
        description: 'Learn from a master sushi chef in an intimate setting',
        price: 180,
        duration: '3 hours'
      },
      {
        name: 'Kyoto Temple & Garden Tour',
        description: 'Visit iconic temples and traditional Japanese gardens',
        price: 95,
        duration: 'Full day'
      },
      {
        name: 'Mount Fuji Day Trip',
        description: 'Scenic views and cultural experiences at Japan\'s most famous mountain',
        price: 145,
        duration: '10 hours'
      },
      {
        name: 'Tokyo Food Tour',
        description: 'Explore hidden gems and local street food favorites',
        price: 85,
        duration: '4 hours'
      }
    ],
    citiesToVisit: ['Tokyo', 'Kyoto', 'Osaka', 'Hakone', 'Nara'],
    bestTimeToVisit: 'Spring & Fall',
    travelers: 2
  },
  {
    id: '2',
    country: 'Italy',
    destination: 'Rome & Tuscany',
    image: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg',
    duration: '12 days',
    totalPrice: 5200,
    flightPrice: 980,
    hotelPrice: 2400,
    experiencePrice: 1820,
    outboundFlight: {
      departure: 'JFK',
      arrival: 'FCO',
      time: '9:15 PM - 1:45 PM (+1)',
      duration: '8h 30m',
      airline: 'Alitalia'
    },
    returnFlight: {
      departure: 'FCO',
      arrival: 'JFK',
      time: '4:10 PM - 8:35 PM',
      duration: '9h 25m',
      airline: 'Alitalia'
    },
    hotel: {
      name: 'Hotel de Russie',
      rating: 5,
      location: 'Via del Babuino, Rome',
      pricePerNight: 200,
      nights: 12
    },
    experiences: [
      {
        name: 'Vatican Museums Private Tour',
        description: 'Skip-the-line access with expert art historian guide',
        price: 220,
        duration: '4 hours'
      },
      {
        name: 'Tuscany Wine Tasting',
        description: 'Visit family-owned vineyards in Chianti region',
        price: 160,
        duration: 'Full day'
      },
      {
        name: 'Cooking Class in Florence',
        description: 'Learn traditional Italian cuisine with local chef',
        price: 140,
        duration: '3 hours'
      },
      {
        name: 'Colosseum Gladiator Experience',
        description: 'Walk in the footsteps of ancient gladiators',
        price: 89,
        duration: '2 hours'
      }
    ],
    citiesToVisit: ['Rome', 'Florence', 'Siena', 'San Gimignano', 'Pisa'],
    bestTimeToVisit: 'April-June, Sept-Oct',
    travelers: 2
  },
  {
    id: '3',
    country: 'Thailand',
    destination: 'Bangkok & Islands',
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
    duration: '14 days',
    totalPrice: 3750,
    flightPrice: 850,
    hotelPrice: 1600,
    experiencePrice: 1300,
    outboundFlight: {
      departure: 'SEA',
      arrival: 'BKK',
      time: '1:25 AM - 5:45 AM (+2)',
      duration: '16h 20m',
      airline: 'Thai Airways'
    },
    returnFlight: {
      departure: 'BKK',
      arrival: 'SEA',
      time: '11:30 PM - 7:15 PM',
      duration: '12h 45m',
      airline: 'Thai Airways'
    },
    hotel: {
      name: 'Mandarin Oriental Bangkok',
      rating: 5,
      location: 'Chao Phraya River',
      pricePerNight: 180,
      nights: 8
    },
    experiences: [
      {
        name: 'Thai Cooking Class',
        description: 'Learn authentic Thai recipes in a traditional setting',
        price: 75,
        duration: '4 hours'
      },
      {
        name: 'Island Hopping Tour',
        description: 'Explore pristine beaches and crystal clear waters',
        price: 195,
        duration: '3 days'
      },
      {
        name: 'Elephant Sanctuary Visit',
        description: 'Ethical elephant interaction and conservation experience',
        price: 120,
        duration: 'Full day'
      },
      {
        name: 'Bangkok Temple Tour',
        description: 'Visit iconic temples including Wat Pho and Grand Palace',
        price: 65,
        duration: '6 hours'
      }
    ],
    citiesToVisit: ['Bangkok', 'Phuket', 'Krabi', 'Koh Phi Phi', 'Chiang Mai'],
    bestTimeToVisit: 'Nov-March',
    travelers: 2
  },
  {
    id: '4',
    country: 'France',
    destination: 'Paris & Provence',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg',
    duration: '10 days',
    totalPrice: 4950,
    flightPrice: 750,
    hotelPrice: 2800,
    experiencePrice: 1400,
    outboundFlight: {
      departure: 'JFK',
      arrival: 'CDG',
      time: '10:20 PM - 11:45 AM (+1)',
      duration: '7h 25m',
      airline: 'Air France'
    },
    returnFlight: {
      departure: 'CDG',
      arrival: 'JFK',
      time: '1:15 PM - 4:50 PM',
      duration: '8h 35m',
      airline: 'Air France'
    },
    hotel: {
      name: 'Le Meurice',
      rating: 5,
      location: 'Tuileries Garden, Paris',
      pricePerNight: 280,
      nights: 10
    },
    experiences: [
      {
        name: 'Louvre Private Tour',
        description: 'Expert-guided tour of world\'s most famous museum',
        price: 180,
        duration: '3 hours'
      },
      {
        name: 'Provence Lavender Fields',
        description: 'Visit stunning lavender fields and local markets',
        price: 165,
        duration: 'Full day'
      },
      {
        name: 'French Pastry Workshop',
        description: 'Learn from a master patissier in Paris',
        price: 135,
        duration: '4 hours'
      },
      {
        name: 'Seine River Cruise',
        description: 'Romantic evening cruise with dinner',
        price: 95,
        duration: '2.5 hours'
      }
    ],
    citiesToVisit: ['Paris', 'Avignon', 'Aix-en-Provence', 'Nice', 'Cannes'],
    bestTimeToVisit: 'May-Sept',
    travelers: 2
  }
];