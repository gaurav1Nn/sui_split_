import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Home, Plane, PartyPopper, Gem } from 'lucide-react';

interface UseCaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  color: string;
}

const UseCaseCard: React.FC<UseCaseProps & { isActive: boolean }> = ({ 
  icon, 
  title, 
  description, 
  examples, 
  color, 
  isActive 
}) => {
  return (
    <motion.div 
      className={`bg-gray-800/60 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 transition-all duration-500 h-full flex flex-col ${isActive ? 'scale-100 opacity-100 shadow-lg' : 'scale-95 opacity-50'}`}
      animate={{ 
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.5
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`mb-6 p-4 rounded-lg ${color} w-16 h-16 flex items-center justify-center`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      
      <div className="space-y-2">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Perfect For:</h4>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <span className="mr-2 text-cyan-500">•</span>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const UseCasesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const useCases: UseCaseProps[] = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Friend Groups",
      description: "Split expenses easily when hanging out with friends, whether it's dining out, entertainment, or social activities.",
      examples: ["Restaurant bills", "Entertainment costs", "Social activities"],
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400"
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: "Roommates",
      description: "Manage shared household expenses with your roommates transparently and fairly.",
      examples: ["Rent payments", "Utility bills", "Groceries", "Household items"],
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400"
    },
    {
      icon: <Plane className="w-8 h-8 text-white" />,
      title: "Travel Companions",
      description: "Keep track of shared expenses during trips without the hassle of manual calculations.",
      examples: ["Accommodation costs", "Transportation", "Activities", "Meals"],
      color: "bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400"
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-white" />,
      title: "Event Organizers",
      description: "Manage expenses for group events and ensure everyone contributes their fair share.",
      examples: ["Group purchases", "Venue costs", "Supplies", "Entertainment"],
      color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400"
    },
    {
      icon: <Gem className="w-8 h-8 text-white" />,
      title: "Crypto Enthusiasts",
      description: "Experience practical DeFi applications with a user-friendly interface for everyday use.",
      examples: ["Instant settlements", "Blockchain verification", "Crypto payments"],
      color: "bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-400"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % useCases.length);
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [useCases.length]);

  // Reset timer when manually changing slides
  const handleNavigation = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setActiveIndex(index);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % useCases.length);
    }, 5000);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="use-cases">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">🎯 Use Cases</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">SuiSplit is versatile and perfect for various scenarios where expense sharing is needed.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {useCases.map((useCase, index) => {
                // Calculate relative position
                const relativeIndex = (index - activeIndex + useCases.length) % useCases.length;
                const isVisible = relativeIndex >= 0 && relativeIndex <= 2;
                
                return isVisible ? (
                  <UseCaseCard
                    key={index}
                    {...useCase}
                    isActive={index === activeIndex}
                  />
                ) : null;
              })}
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => handleNavigation((activeIndex - 1 + useCases.length) % useCases.length)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Previous use case"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex gap-2">
                {useCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === activeIndex ? 'bg-cyan-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                    aria-label={`Go to use case ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => handleNavigation((activeIndex + 1) % useCases.length)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Next use case"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;