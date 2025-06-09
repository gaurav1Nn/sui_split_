import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Wallet, Plus, Users } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected } = useWallet();
  
  // Check if we're on the landing page (home route and not connected)
  const isLandingPage = location.pathname === '/' && !isConnected;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { to: '/wallet', label: 'Wallet', icon: <Wallet className="h-5 w-5" /> },
    { to: '/create-expense', label: 'Create Expense', icon: <Plus className="h-5 w-5" /> },
    { to: '/participants', label: 'Participants', icon: <Users className="h-5 w-5" /> },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  // Don't render the navbar at all on the landing page
  if (isLandingPage) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 shadow-lg transition-all duration-300">
      {/* Desktop Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo for mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden text-xl font-bold animate-gradient-text"
          >
            SuiSplit
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? "text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-md shadow-cyan-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/70 hover:shadow-sm"
                    }`
                  }
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                  >
                    {link.icon}
                  </motion.div>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Hamburger menu for mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden backdrop-blur-lg bg-gray-900/90 border-b border-gray-700/50 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link, index) => (
                <motion.div 
                  key={link.to} 
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="my-2"
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${isActive 
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-l-4 border-cyan-500" 
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      animate={{ rotate: [0, 0, 0, 0, 0, 5, 0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className={({ isActive }: { isActive: boolean }) => isActive ? "text-cyan-400" : ""}
                    >
                      {link.icon}
                    </motion.div>
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;