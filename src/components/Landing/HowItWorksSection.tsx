import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, BarChart3, Zap, CheckCircle } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, number, isLast = false }) => {
  return (
    <div className="flex relative">
      {/* Step number and icon */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: number * 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20"
        >
          {icon}
        </motion.div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-800 border-2 border-cyan-500 flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-purple-600 opacity-30"></div>
      )}
      
      {/* Content */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: number * 0.2 + 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
        className="ml-8 pb-16"
      >
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Wallet className="w-8 h-8 text-white" />,
      title: "Connect Your Wallet",
      description: "Click the 'Connect' button in the navigation bar and select your Sui wallet to authorize the connection.",
      number: 1
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "View Balances",
      description: "Access the main dashboard to see all participant balances. Use color-coded indicators to quickly identify pending settlements.",
      number: 2
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Settle Balances",
      description: "Click the settlement button for any outstanding balance, confirm the transaction in your wallet, and watch real-time updates as settlements are processed.",
      number: 3
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Verify on Blockchain",
      description: "All transactions are recorded on the Sui blockchain, providing transparent and immutable records that all participants can verify.",
      number: 4,
      isLast: true
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="how-it-works">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: Title and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">How SuiSplit Works</h2>
            <p className="text-xl text-gray-400 mb-8">
              SuiSplit integrates with Sui blockchain smart contracts to provide a seamless experience for expense sharing and settlement.
            </p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-white">Smart Contract Integration</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span className="text-gray-300">Expense Group Management - Create and manage participant groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span className="text-gray-300">Balance Tracking - Automatic calculation and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span className="text-gray-300">Settlement Transactions - Secure, automated payments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span className="text-gray-300">Transaction History - Immutable record keeping</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Right side: Steps */}
          <div className="pl-4">
            {steps.map((step, index) => (
              <Step
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                number={step.number}
                isLast={step.isLast}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;