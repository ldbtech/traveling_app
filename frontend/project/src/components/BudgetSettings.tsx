import React, { useState } from 'react';
import { DollarSign, Zap, Bell, TrendingUp, AlertTriangle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface BudgetSettingsProps {
  budgetSettings: {
    maxTripBudget: number;
    autoBookingEnabled: boolean;
    priceAlertThreshold: number;
  };
  setBudgetSettings: (settings: any) => void;
  userFinancials: {
    monthlyIncome: number;
    monthlyExpenses: number;
    availableBalance: number;
    creditScore: number;
    connected: boolean;
  };
}

export const BudgetSettings: React.FC<BudgetSettingsProps> = ({ 
  budgetSettings, 
  setBudgetSettings, 
  userFinancials 
}) => {
  const [tempBudget, setTempBudget] = useState(budgetSettings.maxTripBudget);
  const [tempThreshold, setTempThreshold] = useState(budgetSettings.priceAlertThreshold);

  const handleSaveSettings = () => {
    setBudgetSettings({
      ...budgetSettings,
      maxTripBudget: tempBudget,
      priceAlertThreshold: tempThreshold
    });
  };

  const toggleAutoBooking = () => {
    setBudgetSettings({
      ...budgetSettings,
      autoBookingEnabled: !budgetSettings.autoBookingEnabled
    });
  };

  const budgetPercentage = userFinancials.connected 
    ? (tempBudget / userFinancials.monthlyIncome) * 100 
    : 0;

  const getBudgetColor = () => {
    if (budgetPercentage <= 10) return 'text-green-400';
    if (budgetPercentage <= 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBudgetAdvice = () => {
    if (budgetPercentage <= 10) return 'Conservative - Great for building savings';
    if (budgetPercentage <= 20) return 'Moderate - Balanced approach';
    return 'Adventurous - Consider your other financial goals';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Budget & Auto-Booking Settings</h2>
        <p className="text-gray-300">
          Set your travel budget and configure automatic booking preferences
        </p>
      </div>

      {/* Budget Settings */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20">
        <div className="flex items-center space-x-3 mb-6">
          <DollarSign className="w-8 h-8 text-green-400" />
          <h3 className="text-2xl font-bold text-white">Travel Budget</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-white text-sm font-medium mb-4">
              Maximum Trip Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</span>
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                min="500"
                max="50000"
                step="100"
              />
            </div>
            
            <div className="mt-4">
              <input
                type="range"
                min="500"
                max="20000"
                value={tempBudget}
                onChange={(e) => setTempBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$500</span>
                <span>$20,000</span>
              </div>
            </div>

            {userFinancials.connected && (
              <div className="mt-6 p-4 bg-black bg-opacity-20 rounded-lg border border-white border-opacity-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Budget as % of income:</span>
                  <span className={`font-bold ${getBudgetColor()}`}>
                    {budgetPercentage.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-gray-400">{getBudgetAdvice()}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Budget Presets</h4>
            {userFinancials.connected && (
              <div className="space-y-3">
                <button
                  onClick={() => setTempBudget(Math.floor(userFinancials.monthlyIncome * 0.1))}
                  className="w-full p-3 bg-green-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg border border-green-400 border-opacity-30 text-left transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-green-300">Conservative</span>
                    <span className="text-white font-semibold">
                      ${Math.floor(userFinancials.monthlyIncome * 0.1).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-green-200 mt-1">10% of monthly income</p>
                </button>

                <button
                  onClick={() => setTempBudget(Math.floor(userFinancials.monthlyIncome * 0.15))}
                  className="w-full p-3 bg-yellow-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg border border-yellow-400 border-opacity-30 text-left transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-300">Moderate</span>
                    <span className="text-white font-semibold">
                      ${Math.floor(userFinancials.monthlyIncome * 0.15).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-yellow-200 mt-1">15% of monthly income</p>
                </button>

                <button
                  onClick={() => setTempBudget(Math.floor(userFinancials.monthlyIncome * 0.2))}
                  className="w-full p-3 bg-purple-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg border border-purple-400 border-opacity-30 text-left transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Adventurous</span>
                    <span className="text-white font-semibold">
                      ${Math.floor(userFinancials.monthlyIncome * 0.2).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-purple-200 mt-1">20% of monthly income</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-Booking Settings */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">Auto-Booking</h3>
              <p className="text-gray-300">Automatically book trips when great deals are found</p>
            </div>
          </div>
          <button
            onClick={toggleAutoBooking}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
              budgetSettings.autoBookingEnabled ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                budgetSettings.autoBookingEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {budgetSettings.autoBookingEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6"
          >
            <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-4 border border-yellow-400 border-opacity-30">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-300 font-medium">Auto-Booking Active</p>
                  <p className="text-yellow-200 text-sm mt-1">
                    I'll automatically book trips when deals meet your criteria. You'll receive instant notifications.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-4">
                Price Alert Threshold ({tempThreshold}% of market price)
              </label>
              <input
                type="range"
                min="50"
                max="95"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>50% (Best deals only)</span>
                <span>95% (Most opportunities)</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                I'll auto-book when trip prices drop to {tempThreshold}% or below the average market price
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-20 rounded-lg p-4 border border-white border-opacity-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">Notifications</span>
                </div>
                <p className="text-sm text-gray-300">
                  Instant alerts via email and SMS when bookings are made
                </p>
              </div>

              <div className="bg-black bg-opacity-20 rounded-lg p-4 border border-white border-opacity-10">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Smart Timing</span>
                </div>
                <p className="text-sm text-gray-300">
                  AI analyzes price trends to book at optimal moments
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <Settings className="w-5 h-5" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};