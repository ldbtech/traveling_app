import React, { useState } from 'react';
import { Shield, CreditCard, TrendingUp, Lock, CheckCircle, AlertCircle, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinancialConnectProps {
  userFinancials: {
    monthlyIncome: number;
    monthlyExpenses: number;
    availableBalance: number;
    creditScore: number;
    connected: boolean;
  };
  setUserFinancials: (financials: any) => void;
}

export const FinancialConnect: React.FC<FinancialConnectProps> = ({ userFinancials, setUserFinancials }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [step, setStep] = useState<'select' | 'connect' | 'verify' | 'complete'>('select');

  const banks = [
    { name: 'Chase Bank', logo: '🏦', users: '50M+' },
    { name: 'Bank of America', logo: '🏛️', users: '45M+' },
    { name: 'Wells Fargo', logo: '🏪', users: '40M+' },
    { name: 'Citi Bank', logo: '🏢', users: '35M+' },
    { name: 'Capital One', logo: '💳', users: '30M+' },
    { name: 'Other Bank', logo: '🏦', users: '100M+' }
  ];

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setStep('connect');
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setStep('verify');
    
    // Simulate Plaid connection process
    setTimeout(() => {
      setStep('complete');
      // Simulate financial data retrieval
      setUserFinancials({
        monthlyIncome: 8500,
        monthlyExpenses: 4200,
        availableBalance: 12750,
        creditScore: 742,
        connected: true
      });
      setIsConnecting(false);
    }, 3000);
  };

  if (userFinancials.connected) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <CheckCircle className="w-12 h-12 text-green-200" />
            <div>
              <h2 className="text-3xl font-bold">Bank Account Connected!</h2>
              <p className="text-green-100">Your financial data is secure and encrypted</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
              Financial Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Monthly Income</span>
                <span className="text-white font-semibold">${userFinancials.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Monthly Expenses</span>
                <span className="text-white font-semibold">${userFinancials.monthlyExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Available Balance</span>
                <span className="text-green-400 font-semibold">${userFinancials.availableBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Credit Score</span>
                <span className="text-blue-400 font-semibold">{userFinancials.creditScore}</span>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Banknote className="w-6 h-6 mr-2 text-purple-400" />
              Travel Budget Recommendations
            </h3>
            <div className="space-y-4">
              <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 border border-green-400 border-opacity-30">
                <p className="text-green-300 text-sm mb-1">Conservative (10% of income)</p>
                <p className="text-white font-bold text-lg">${Math.floor(userFinancials.monthlyIncome * 0.1).toLocaleString()}</p>
              </div>
              <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-4 border border-yellow-400 border-opacity-30">
                <p className="text-yellow-300 text-sm mb-1">Moderate (15% of income)</p>
                <p className="text-white font-bold text-lg">${Math.floor(userFinancials.monthlyIncome * 0.15).toLocaleString()}</p>
              </div>
              <div className="bg-purple-500 bg-opacity-20 rounded-lg p-4 border border-purple-400 border-opacity-30">
                <p className="text-purple-300 text-sm mb-1">Adventurous (20% of income)</p>
                <p className="text-white font-bold text-lg">${Math.floor(userFinancials.monthlyIncome * 0.2).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-10">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Security & Privacy</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>256-bit encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>FDIC protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>SOC 2 compliant</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Connect Your Bank Account</h2>
        <p className="text-gray-300 text-lg">
          Securely connect your bank to get personalized travel recommendations within your budget
        </p>
      </div>

      {step === 'select' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-semibold text-white mb-4">Select Your Bank</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {banks.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => handleBankSelect(bank.name)}
                  className="flex items-center space-x-4 p-4 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-xl border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-200"
                >
                  <span className="text-3xl">{bank.logo}</span>
                  <div className="text-left">
                    <p className="text-white font-medium">{bank.name}</p>
                    <p className="text-gray-400 text-sm">{bank.users} users</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-500 bg-opacity-20 rounded-2xl p-6 border border-blue-400 border-opacity-30">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Bank-Level Security</h4>
                <p className="text-blue-100 text-sm">
                  We use Plaid, the same technology trusted by Venmo, Robinhood, and other major financial apps. 
                  Your login credentials are never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 'connect' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 text-center"
        >
          <div className="text-4xl mb-4">🏦</div>
          <h3 className="text-2xl font-bold text-white mb-4">Connect to {selectedBank}</h3>
          <p className="text-gray-300 mb-8">
            You'll be redirected to your bank's secure login page. We'll never see your credentials.
          </p>
          <button
            onClick={handleConnect}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
          >
            Continue to {selectedBank}
          </button>
        </motion.div>
      )}

      {step === 'verify' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-white mb-4">Connecting Your Account</h3>
          <p className="text-gray-300 mb-4">
            Securely retrieving your financial data...
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Encrypted connection</span>
          </div>
        </motion.div>
      )}

      {step === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center"
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-200" />
          <h3 className="text-3xl font-bold mb-4">Successfully Connected!</h3>
          <p className="text-green-100 mb-6">
            Your financial data has been securely imported. I can now provide personalized travel recommendations.
          </p>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 inline-block">
            <p className="text-sm">Ready to find your perfect trip within budget!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};