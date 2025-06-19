import React, { useState, useEffect } from 'react';
import { MapPin, Plane, Hotel, Camera, TrendingDown, Zap, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TravelSuggestion {
  id: string;
  destination: string;
  country: string;
  price: number;
  originalPrice: number;
  savings: number;
  confidence: number;
  dealExpiry: string;
  flightPrice: number;
  hotelPrice: number;
  experiencePrice: number;
  duration: string;
  rating: number;
  image: string;
  autoBookEligible: boolean;
}

interface TravelSuggestionsProps {
  userFinancials: {
    monthlyIncome: number;
    monthlyExpenses: number;
    availableBalance: number;
    creditScore: number;
    connected: boolean;
  };
  budgetSettings: {
    maxTripBudget: number;
    autoBookingEnabled: boolean;
    priceAlertThreshold: number;
  };
}

export const TravelSuggestions: React.FC<TravelSuggestionsProps> = ({ 
  userFinancials, 
  budgetSettings 
}) => {
  const [suggestions, setSuggestions] = useState<TravelSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'budget' | 'deals' | 'auto'>('all');

  useEffect(() => {
    // Simulate API call to get travel suggestions
    const fetchSuggestions = async () => {
      setLoading(true);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSuggestions: TravelSuggestion[] = [
        {
          id: '1',
          destination: 'Tokyo',
          country: 'Japan',
          price: 3240,
          originalPrice: 4890,
          savings: 1650,
          confidence: 94,
          dealExpiry: '2 days',
          flightPrice: 1200,
          hotelPrice: 1440,
          experiencePrice: 600,
          duration: '10 days',
          rating: 4.8,
          image: 'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg',
          autoBookEligible: true
        },
        {
          id: '2',
          destination: 'Rome',
          country: 'Italy',
          price: 2890,
          originalPrice: 3650,
          savings: 760,
          confidence: 87,
          dealExpiry: '5 hours',
          flightPrice: 980,
          hotelPrice: 1200,
          experiencePrice: 710,
          duration: '8 days',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg',
          autoBookEligible: true
        },
        {
          id: '3',
          destination: 'Bangkok',
          country: 'Thailand',
          price: 2340,
          originalPrice: 2890,
          savings: 550,
          confidence: 91,
          dealExpiry: '1 day',
          flightPrice: 850,
          hotelPrice: 800,
          experiencePrice: 690,
          duration: '12 days',
          rating: 4.6,
          image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
          autoBookEligible: false
        },
        {
          id: '4',
          destination: 'Paris',
          country: 'France',
          price: 4200,
          originalPrice: 5100,
          savings: 900,
          confidence: 89,
          dealExpiry: '3 days',
          flightPrice: 750,
          hotelPrice: 2100,
          experiencePrice: 1350,
          duration: '9 days',
          rating: 4.9,
          image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg',
          autoBookEligible: true
        }
      ];

      // Filter suggestions based on budget
      const filteredSuggestions = mockSuggestions.filter(
        suggestion => suggestion.price <= budgetSettings.maxTripBudget
      );

      setSuggestions(filteredSuggestions);
      setLoading(false);
    };

    fetchSuggestions();
  }, [budgetSettings.maxTripBudget]);

  const filteredSuggestions = suggestions.filter(suggestion => {
    switch (filter) {
      case 'budget':
        return suggestion.price <= budgetSettings.maxTripBudget * 0.8;
      case 'deals':
        return suggestion.savings > 500;
      case 'auto':
        return suggestion.autoBookEligible && budgetSettings.autoBookingEnabled;
      default:
        return true;
    }
  });

  const handleAutoBook = (suggestion: TravelSuggestion) => {
    // Simulate auto-booking
    alert(`Auto-booking initiated for ${suggestion.destination}! You'll receive confirmation shortly.`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-white mb-4">Finding Your Perfect Trips</h3>
          <p className="text-gray-300">
            Scanning 500+ travel APIs for the best deals within your ${budgetSettings.maxTripBudget.toLocaleString()} budget...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Travel Suggestions</h2>
        <p className="text-gray-300">
          {userFinancials.connected 
            ? `Personalized recommendations within your $${budgetSettings.maxTripBudget.toLocaleString()} budget`
            : 'Connect your bank for personalized budget recommendations'
          }
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-2 border border-white border-opacity-20">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Trips', count: suggestions.length },
              { key: 'budget', label: 'Budget Friendly', count: suggestions.filter(s => s.price <= budgetSettings.maxTripBudget * 0.8).length },
              { key: 'deals', label: 'Hot Deals', count: suggestions.filter(s => s.savings > 500).length },
              { key: 'auto', label: 'Auto-Book Ready', count: suggestions.filter(s => s.autoBookEligible).length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      <AnimatePresence>
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredSuggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white border-opacity-20 hover:border-opacity-40 transition-all duration-300"
            >
              {/* Header */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg px-3 py-1">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-white text-sm">Deal expires in {suggestion.dealExpiry}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-bold">Save ${suggestion.savings.toLocaleString()}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{suggestion.destination}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{suggestion.country}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{suggestion.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-300 text-sm">Total for 2 travelers</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-white">${suggestion.price.toLocaleString()}</p>
                      <p className="text-gray-400 line-through">${suggestion.originalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <TrendingDown className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">{suggestion.confidence}% confidence</span>
                    </div>
                    <p className="text-gray-400 text-sm">{suggestion.duration}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-blue-500 bg-opacity-20 rounded-lg">
                    <Plane className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-300">Flights</p>
                    <p className="font-semibold text-blue-400">${suggestion.flightPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-green-500 bg-opacity-20 rounded-lg">
                    <Hotel className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-300">Hotels</p>
                    <p className="font-semibold text-green-400">${suggestion.hotelPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                    <Camera className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-300">Experiences</p>
                    <p className="font-semibold text-purple-400">${suggestion.experiencePrice.toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-xl transition-all duration-200 border border-white border-opacity-20">
                    View Details
                  </button>
                  
                  {suggestion.autoBookEligible && budgetSettings.autoBookingEnabled ? (
                    <button
                      onClick={() => handleAutoBook(suggestion)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl transition-all duration-200"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Auto-Book</span>
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200">
                      Book Now
                    </button>
                  )}
                </div>

                {suggestion.autoBookEligible && (
                  <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-yellow-400">
                    <Zap className="w-3 h-3" />
                    <span>Eligible for auto-booking</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No trips found</h3>
          <p className="text-gray-300 mb-6">
            Try adjusting your budget or filter settings to see more options.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-200"
          >
            Show All Trips
          </button>
        </div>
      )}
    </div>
  );
};