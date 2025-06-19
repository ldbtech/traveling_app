import React, { useState } from 'react';
import { MapPin, Plane, Hotel, Camera, Calendar, Users, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';

interface Flight {
  departure: string;
  arrival: string;
  time: string;
  duration: string;
  airline: string;
}

interface Hotel {
  name: string;
  rating: number;
  location: string;
  pricePerNight: number;
  nights: number;
}

interface Experience {
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface TravelSuggestion {
  id: string;
  country: string;
  destination: string;
  image: string;
  duration: string;
  totalPrice: number;
  flightPrice: number;
  hotelPrice: number;
  experiencePrice: number;
  outboundFlight: Flight;
  returnFlight: Flight;
  hotel: Hotel;
  experiences: Experience[];
  citiesToVisit: string[];
  bestTimeToVisit: string;
  travelers: number;
}

interface TravelCardProps {
  suggestion: TravelSuggestion;
}

export const TravelCard: React.FC<TravelCardProps> = ({ suggestion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    alert(`Booking confirmed for ${suggestion.destination}! 🎉`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{suggestion.destination}</h3>
          <p className="text-blue-100 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {suggestion.country}
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-sm font-medium">{suggestion.duration}</span>
        </div>
      </div>

      {/* Price Summary */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600 text-sm">Total for {suggestion.travelers} travelers</p>
            <p className="text-3xl font-bold text-gray-900">${suggestion.totalPrice.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-green-600 text-sm font-medium">Best Value</p>
            <p className="text-gray-500 text-sm">{suggestion.bestTimeToVisit}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Plane className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Flights</p>
            <p className="font-semibold text-blue-600">${suggestion.flightPrice.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Hotel className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Hotels</p>
            <p className="font-semibold text-green-600">${suggestion.hotelPrice.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Camera className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Experiences</p>
            <p className="font-semibold text-purple-600">${suggestion.experiencePrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Cities to Visit Preview */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Cities to explore:</p>
          <div className="flex flex-wrap gap-2">
            {suggestion.citiesToVisit.slice(0, 3).map((city, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {city}
              </span>
            ))}
            {suggestion.citiesToVisit.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                +{suggestion.citiesToVisit.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <span>View Details</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isBooking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Booking...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Book Trip</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-6 space-y-6">
            {/* Flight Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Plane className="w-5 h-5 mr-2 text-blue-600" />
                Flight Details
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Outbound Flight</p>
                  <p className="font-semibold">{suggestion.outboundFlight.departure} → {suggestion.outboundFlight.arrival}</p>
                  <p className="text-sm text-gray-600">{suggestion.outboundFlight.time} • {suggestion.outboundFlight.duration}</p>
                  <p className="text-sm text-blue-600">{suggestion.outboundFlight.airline}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Return Flight</p>
                  <p className="font-semibold">{suggestion.returnFlight.departure} → {suggestion.returnFlight.arrival}</p>
                  <p className="text-sm text-gray-600">{suggestion.returnFlight.time} • {suggestion.returnFlight.duration}</p>
                  <p className="text-sm text-blue-600">{suggestion.returnFlight.airline}</p>
                </div>
              </div>
            </div>

            {/* Hotel Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Hotel className="w-5 h-5 mr-2 text-green-600" />
                Accommodation
              </h4>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{suggestion.hotel.name}</h5>
                  <div className="flex items-center">
                    {[...Array(suggestion.hotel.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{suggestion.hotel.location}</p>
                <p className="text-sm">
                  ${suggestion.hotel.pricePerNight}/night • {suggestion.hotel.nights} nights
                </p>
              </div>
            </div>

            {/* Experiences */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-purple-600" />
                Experiences & Activities
              </h4>
              <div className="space-y-3">
                {suggestion.experiences.map((experience, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">{experience.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                        <p className="text-sm text-purple-600">{experience.duration}</p>
                      </div>
                      <p className="font-semibold text-purple-600 ml-4">${experience.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Cities */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                Cities to Visit
              </h4>
              <div className="flex flex-wrap gap-2">
                {suggestion.citiesToVisit.map((city, index) => (
                  <span key={index} className="px-4 py-2 bg-white border rounded-lg text-gray-700">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};