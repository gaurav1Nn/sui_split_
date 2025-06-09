import React from 'react';
import { motion } from 'framer-motion';

interface TechStackItemProps {
  icon: string;
  name: string;
  description: string;
  delay: number;
}

const TechStackItem: React.FC<TechStackItemProps> = ({ icon, name, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className="flex flex-col items-center p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">{name}</h3>
      <p className="text-gray-400 text-center text-sm group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </motion.div>
  );
};

const TechStackSection: React.FC = () => {
  const frontendTech = [
    {
      icon: "⚛️",
      name: "React.js",
      description: "With TypeScript for type-safe development"
    },
    {
      icon: "🎨",
      name: "Tailwind CSS",
      description: "For modern, utility-first styling"
    },
    {
      icon: "🔄",
      name: "Framer Motion",
      description: "For smooth animations and transitions"
    },
    {
      icon: "🔄",
      name: "React Context",
      description: "For efficient state management"
    },
    {
      icon: "⚡",
      name: "Vite",
      description: "For fast development and building"
    }
  ];

  const backendTech = [
    {
      icon: "🟢",
      name: "Node.js",
      description: "With Express.js for RESTful API"
    },
    {
      icon: "📝",
      name: "TypeScript",
      description: "For type-safe backend development"
    },
    {
      icon: "🔄",
      name: "CORS",
      description: "For cross-origin resource sharing"
    },
    {
      icon: "🔧",
      name: "Custom Middleware",
      description: "For request handling"
    }
  ];

  const blockchainTech = [
    {
      icon: "🔗",
      name: "Sui Network",
      description: "For high-performance, low-cost transactions"
    },
    {
      icon: "👛",
      name: "@mysten/wallet-kit",
      description: "For seamless wallet integration"
    },
    {
      icon: "📄",
      name: "Custom Smart Contracts",
      description: "Move language for expense logic"
    },
    {
      icon: "🔌",
      name: "Sui TypeScript SDK",
      description: "For blockchain interactions"
    }
  ];

  const devTools = [
    {
      icon: "🧹",
      name: "ESLint & Prettier",
      description: "For code quality"
    },
    {
      icon: "🎨",
      name: "PostCSS",
      description: "For CSS processing"
    },
    {
      icon: "📝",
      name: "TypeScript",
      description: "For enhanced developer experience"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="tech-stack">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">🏗 Architecture & Technology Stack</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">SuiSplit is built with modern technologies to provide a seamless and secure experience.</p>
        </motion.div>

        <div className="space-y-16">
          {/* Frontend */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-2xl font-bold mb-6 text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white">F</span>
              Frontend
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {frontendTech.map((tech, index) => (
                <TechStackItem
                  key={index}
                  icon={tech.icon}
                  name={tech.name}
                  description={tech.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
          
          {/* Backend */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-2xl font-bold mb-6 text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white">B</span>
              Backend
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {backendTech.map((tech, index) => (
                <TechStackItem
                  key={index}
                  icon={tech.icon}
                  name={tech.name}
                  description={tech.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
          
          {/* Blockchain Integration */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-2xl font-bold mb-6 text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white">🔗</span>
              Blockchain Integration
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {blockchainTech.map((tech, index) => (
                <TechStackItem
                  key={index}
                  icon={tech.icon}
                  name={tech.name}
                  description={tech.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
          
          {/* Development Tools */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-2xl font-bold mb-6 text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white">🔧</span>
              Development Tools
            </motion.h3>
            
            <div className="grid grid-cols-3 gap-4">
              {devTools.map((tech, index) => (
                <TechStackItem
                  key={index}
                  icon={tech.icon}
                  name={tech.name}
                  description={tech.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;