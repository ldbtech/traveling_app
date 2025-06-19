import React from 'react';
import { Zap, Bell, Shield, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AutoBookingSettingsProps {
  budgetSettings: {
    maxTripBudget: number;
    autoBookingEnabled: boolean;
    priceAlertThreshold: number;
  };
  setBudgetSettings: (settings: any) => void;
}

export const AutoBookingSettings: React.FC<AutoBookingSettingsProps> = ({ 
  budgetSettings, 
  setBudgetSettings 
}) => {
  const toggleAutoBooking = () => {
    setBudgetSettings({
      ...budgetSettings,
      autoBookingEnabled: false
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white border-opacity-20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Auto-Booking Active</h3>
              <p className="text-gray-300 text-sm">Monitoring deals 24/7</p>
            </div>
          </div>
          <button
            onClick={toggleAutoBooking}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-4 border border-yellow-400 border-opacity-30">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">Active Monitoring</span>
            </div>
            <p className="text-yellow-200 text-sm">
              I'm scanning travel deals and will automatically book when prices drop to {budgetSettings.priceAlertThreshold}% or below market price.
            </p>
          </div>

          <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400 border-opacity-30">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-medium">Budget Protection</span>
            </div>
            <p className="text-green-200 text-sm">
              Maximum trip budget: ${budgetSettings.maxTripBudget.toLocaleString()}
            </p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20">
            <h4 className="text-white font-medium mb-2">What happens next:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Instant notifications when deals are found</li>
              <li>• Automatic booking with your saved payment method</li>
              <li>• Email confirmation with trip details</li>
              <li>• 24-hour cancellation window</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={toggleAutoBooking}
            className="flex-1 px-4 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-xl transition-all duration-200 border border-white border-opacity-20"
          >
            Disable Auto-Booking
          </button>
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200">
            View Settings
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};