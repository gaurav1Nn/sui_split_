import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ComparisonItemProps {
  traditional: string;
  suisplit: string;
  index: number;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ traditional, suisplit, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-2 gap-4 mb-6 relative"
    >
      <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex items-center">
        <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
          <X className="w-4 h-4 text-red-500" />
        </div>
        <p className="text-gray-300">{traditional}</p>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg border border-cyan-700/30 flex items-center">
        <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-cyan-500" />
        </div>
        <p className="text-cyan-100">{suisplit}</p>
      </div>
      
      {/* Connecting line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-red-500/50 to-cyan-500/50"></div>
    </motion.div>
  );
};

const ComparisonSection: React.FC = () => {
  const comparisonItems = [
    {
      traditional: "Manual cash settlements",
      suisplit: "Instant crypto settlements"
    },
    {
      traditional: "Centralized databases",
      suisplit: "Immutable blockchain records"
    },
    {
      traditional: "Trust-based system",
      suisplit: "Cryptographically secure"
    },
    {
      traditional: "Limited to local currencies",
      suisplit: "Global accessibility"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="comparison">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-cyan-400">🌟 What Makes SuiSplit Special</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Traditional bill-splitting apps rely on centralized databases and require manual settlements. 
            SuiSplit transforms this experience by leveraging blockchain technology.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-8 text-center font-bold">
            <div className="p-3 rounded-t-lg bg-gray-800/80 text-gray-300">Traditional Apps</div>
            <div className="p-3 rounded-t-lg bg-gradient-to-r from-cyan-800/50 to-purple-800/50 text-cyan-100">SuiSplit</div>
          </div>
          
          {comparisonItems.map((item, index) => (
            <ComparisonItem
              key={index}
              traditional={item.traditional}
              suisplit={item.suisplit}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;