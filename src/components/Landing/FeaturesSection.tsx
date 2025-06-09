import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Zap, LayoutDashboard, Search, Palette, Globe, Lock } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
    >
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-14 h-14 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-purple-600 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seamless Wallet Integration",
      description: "Connect with Sui wallets effortlessly for a smooth user experience.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Balance Tracking",
      description: "Always know who owes what with instant balance updates.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Settlement System",
      description: "One-click expense settlement via blockchain for instant transfers.",
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Interactive Dashboard",
      description: "Visual representation of all balances and expenses in one place.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Filtering",
      description: "Organize expenses and balances efficiently with powerful filters.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Modern UI/UX",
      description: "Beautiful, responsive interface with smooth animations.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description: "Works anywhere with internet connectivity, no geographical limits.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Transparent Records",
      description: "All participants can verify transaction history on the blockchain.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">✨ Features</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">SuiSplit combines blockchain technology with intuitive design to revolutionize how you split expenses.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;