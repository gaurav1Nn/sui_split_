import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { useWallet } from '../../context/WalletContext';
import { useLocation } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { walletAddress, isConnected, disconnectWallet } = useWallet();
  const location = useLocation();

  // Only show header when connected
  const showHeader = isConnected;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <NavBar />
      
      {showHeader && (
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full py-6 backdrop-blur-md bg-gray-900/60 border-b border-gray-800/50 shadow-lg"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gradient-to-br from-cyan-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-cyan-500/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                    <path d="M2 17L12 22L22 17" fill="white" />
                    <path d="M2 12L12 17L22 12" fill="white" />
                  </svg>
                </motion.div>
                
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold animate-gradient-text"
                  >
                    SuiSplit
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-300 text-sm"
                  >
                    Decentralized Bill-Splitting on Sui Blockchain
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isConnected && walletAddress ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm font-medium">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={disconnectWallet}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-md shadow-red-500/20 font-medium transition-all duration-200"
                    >
                      Disconnect
                    </motion.button>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.header>
      )}
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="absolute inset-0 bg-dots opacity-10 z-0 pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Outlet />
        </motion.div>
      </main>
      
      {/* Background gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default AppLayout;