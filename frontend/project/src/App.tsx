import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { FinancialConnect } from './components/FinancialConnect';
import { BudgetSettings } from './components/BudgetSettings';
import { TravelSuggestions } from './components/TravelSuggestions';
import { AutoBookingSettings } from './components/AutoBookingSettings';
import { Bot, Sparkles, Shield, Zap } from 'lucide-react';

interface UserFinancials {
  monthlyIncome: number;
  monthlyExpenses: number;
  availableBalance: number;
  creditScore: number;
  connected: boolean;
}

interface BudgetSettings {
  maxTripBudget: number;
  autoBookingEnabled: boolean;
  priceAlertThreshold: number;
}

function App() {
  const [currentView, setCurrentView] = useState<'chat' | 'connect' | 'budget' | 'suggestions'>('chat');
  const [userFinancials, setUserFinancials] = useState<UserFinancials>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    availableBalance: 0,
    creditScore: 0,
    connected: false
  });
  const [budgetSettings, setBudgetSettings] = useState<BudgetSettings>({
    maxTripBudget: 5000,
    autoBookingEnabled: false,
    priceAlertThreshold: 80
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-xl border-b border-white border-opacity-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  TravelAI
                </h1>
                <p className="text-sm text-gray-300">Smart Budget Travel Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>AI-Powered</span>
              </div>
              
              <nav className="hidden md:flex space-x-1">
                <button
                  onClick={() => setCurrentView('chat')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'chat' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setCurrentView('connect')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'connect' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Connect Bank
                </button>
                <button
                  onClick={() => setCurrentView('budget')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'budget' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Budget
                </button>
                <button
                  onClick={() => setCurrentView('suggestions')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'suggestions' 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Suggestions
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-white text-sm py-2">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${userFinancials.connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span>{userFinancials.connected ? 'Bank Connected' : 'Bank Not Connected'}</span>
              </div>
              {userFinancials.connected && (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Budget: ${budgetSettings.maxTripBudget.toLocaleString()}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {budgetSettings.autoBookingEnabled && (
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Auto-Booking Active</span>
                </div>
              )}
              <div className="text-xs opacity-75">
                Secure • Encrypted • FDIC Protected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'chat' && (
          <ChatInterface 
            userFinancials={userFinancials}
            budgetSettings={budgetSettings}
          />
        )}
        
        {currentView === 'connect' && (
          <FinancialConnect 
            userFinancials={userFinancials}
            setUserFinancials={setUserFinancials}
          />
        )}
        
        {currentView === 'budget' && (
          <BudgetSettings 
            budgetSettings={budgetSettings}
            setBudgetSettings={setBudgetSettings}
            userFinancials={userFinancials}
          />
        )}
        
        {currentView === 'suggestions' && (
          <TravelSuggestions 
            userFinancials={userFinancials}
            budgetSettings={budgetSettings}
          />
        )}
      </main>

      {/* Auto-Booking Settings Overlay */}
      {budgetSettings.autoBookingEnabled && (
        <AutoBookingSettings 
          budgetSettings={budgetSettings}
          setBudgetSettings={setBudgetSettings}
        />
      )}
    </div>
  );
}

export default App;