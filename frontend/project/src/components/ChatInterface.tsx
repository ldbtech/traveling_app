import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingDown, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: TravelSuggestion[];
}

interface TravelSuggestion {
  destination: string;
  price: number;
  savings: number;
  confidence: number;
}

interface ChatInterfaceProps {
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

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userFinancials, budgetSettings }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: userFinancials.connected 
        ? `Hi! I've analyzed your financial profile. With your monthly income of $${userFinancials.monthlyIncome.toLocaleString()} and available balance of $${userFinancials.availableBalance.toLocaleString()}, I can help you find amazing travel deals within your $${budgetSettings.maxTripBudget.toLocaleString()} budget. Where would you like to go?`
        : "Hello! I'm your AI travel assistant. To provide personalized travel suggestions within your budget, I'll need to connect to your financial data first. This helps me find the best deals you can actually afford. What kind of trip are you dreaming about?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('japan') || lowerMessage.includes('tokyo')) {
      return `Great choice! I'm scanning live prices for Japan trips... Based on your budget of $${budgetSettings.maxTripBudget.toLocaleString()}, I found some excellent options. Current flight prices to Tokyo are down 23% from last month. I'm monitoring 847 hotels and 156 experience packages. Would you like me to set up automatic booking when prices drop to your target range?`;
    }
    
    if (lowerMessage.includes('europe') || lowerMessage.includes('italy') || lowerMessage.includes('france')) {
      return `Europe is fantastic! I'm analyzing real-time data from 12 airlines and 2,340 hotels across Europe. With your financial profile, I can secure trips to Italy starting at $2,890 or France at $3,240. I'm tracking price drops and can auto-book when deals hit your sweet spot. Shall I set up price alerts?`;
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
      return `I'm optimizing for your budget! Currently scanning 50+ travel APIs for the best deals. Based on your spending patterns, I recommend keeping trips under ${Math.floor(budgetSettings.maxTripBudget * 0.8)}% of your budget for comfort. I found 23 destinations within range. Want me to show the top 5?`;
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('automatic')) {
      return `Auto-booking is ${budgetSettings.autoBookingEnabled ? 'active' : 'available'}! I can monitor prices 24/7 and automatically book when deals meet your criteria. I'll send you instant notifications and can even handle payment processing. Your current threshold is set to ${budgetSettings.priceAlertThreshold}% of market price. Ready to activate?`;
    }
    
    return `I'm analyzing your request and scanning live travel data... With your available budget, I'm finding personalized options that match your financial comfort zone. I'm checking flight prices, hotel availability, and experience packages across 200+ destinations. What specific type of experience interests you most?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? [
          { destination: 'Tokyo, Japan', price: 3240, savings: 890, confidence: 94 },
          { destination: 'Rome, Italy', price: 2890, savings: 650, confidence: 87 },
          { destination: 'Bangkok, Thailand', price: 2340, savings: 1200, confidence: 91 }
        ] : undefined
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Travel Assistant</h2>
            <p className="text-gray-300">
              {userFinancials.connected 
                ? `Budget-aware recommendations • Monitoring ${Math.floor(Math.random() * 1000 + 500)} deals`
                : 'Connect your bank for personalized budget recommendations'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">AI Active</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl border border-white border-opacity-10 h-96 overflow-y-auto mb-6">
        <div className="p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                      : 'bg-gradient-to-r from-purple-400 to-pink-500'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                      : 'bg-white bg-opacity-10 text-white border border-white border-opacity-20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.suggestions && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs opacity-75 mb-3">Live Deal Alerts:</p>
                        {message.suggestions.map((suggestion, index) => (
                          <div key={index} className="bg-black bg-opacity-20 rounded-lg p-3 border border-white border-opacity-10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-cyan-400" />
                                <span className="font-medium">{suggestion.destination}</span>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-400">${suggestion.price.toLocaleString()}</p>
                                <p className="text-xs text-green-300">Save ${suggestion.savings}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-1">
                                <TrendingDown className="w-3 h-3 text-green-400" />
                                <span className="text-xs text-green-400">{suggestion.confidence}% confidence</span>
                              </div>
                              <button className="text-xs bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded transition-colors">
                                Set Alert
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white bg-opacity-10 rounded-2xl p-4 border border-white border-opacity-20">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                    <span className="text-white text-sm">AI is analyzing travel data...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-4 border border-white border-opacity-20">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about travel destinations, budgets, or let me find deals for you..."
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send</span>
            {userFinancials.connected && (
              <span className="text-green-400">• Budget-aware responses active</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 h-3" />
            <span>Real-time pricing</span>
          </div>
        </div>
      </div>
    </div>
  );
};