import React from 'react';
import { useWallet } from '../context/WalletContext';
import Dashboard from '../components/Dashboard/Dashboard';
import LandingPage from '../components/Landing/LandingPage';

const HomePage: React.FC = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <LandingPage />;
  }

  return <Dashboard />;
};

export default HomePage;
