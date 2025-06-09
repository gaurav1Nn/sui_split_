import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, BarChart, DonutChart } from '@tremor/react';
import { Activity, TrendingUp, Users } from 'lucide-react';
import AnimatedLineChart from './AnimatedLineChart';
import { getBalance } from '../../sui/queries';
import StatCard from './StatCard';
import { useWallet } from '../../context/WalletContext';
import SuiLogo from '../../assets/sui-logo.svg';
import { expenseService } from '../../services/expenseService';
import { Expense } from '../../types';

// Add logger utility
const log = (component: string, action: string, data?: any) => {
  console.log(`[${component}] ${action}`, data ? data : '');
};

interface ExpenseData {
  date: string;
  expenses: number;
  income: number;
}

interface ParticipantDebt {
  name: string;
  amount: number;
}

// Hardcoded data for charts and graphs
const HARDCODED_MONTHLY_DATA: ExpenseData[] = [
  { date: 'Jan', expenses: 85.00, income: 120.00 },
  { date: 'Feb', expenses: 92.50, income: 150.00 },
  { date: 'Mar', expenses: 78.25, income: 95.00 },
  { date: 'Apr', expenses: 115.75, income: 180.00 },
  { date: 'May', expenses: 67.80, income: 135.00 },
  { date: 'Jun', expenses: 94.30, income: 160.00 }
];

const HARDCODED_DEBTS: ParticipantDebt[] = [
  { name: '0x123...abc', amount: 57.50 },
  { name: '0x456...def', amount: 35.25 },
  { name: '0x789...ghi', amount: 22.75 }
];

// Add color constants at the top with the other constants
const CHART_COLORS = {
  primary: {
    base: '#00D2D3',
    gradient: ['#00D2D3', '#00A3A4'],
    light: '#4FD1D9'
  },
  secondary: {
    base: '#6C5CE7',
    gradient: ['#6C5CE7', '#5541D7'],
    light: '#8F85FF'
  },
  accent: {
    base: '#FD79A8',
    gradient: ['#FD79A8', '#E84393'],
    light: '#FDA7C6'
  },
  success: {
    base: '#00B894',
    gradient: ['#00B894', '#00896F'],
    light: '#2ED1B5'
  }
};

const coinIllustration = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="40" rx="16" ry="4" fill="#00D2D3" fillOpacity="0.18" />
    <circle cx="24" cy="24" r="14" fill="#00D2D3" />
    <circle cx="24" cy="24" r="10" fill="#fff" fillOpacity="0.9" />
    <text x="24" y="29" textAnchor="middle" fontSize="16" fill="#00D2D3" fontWeight="bold">$</text>
  </svg>
);

const Dashboard: React.FC = () => {
  log('Dashboard', 'Component Mounted');
  
  const { walletAddress } = useWallet();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyData, setMonthlyData] = useState<ExpenseData[]>(HARDCODED_MONTHLY_DATA);
  const [participantDebts, setParticipantDebts] = useState<ParticipantDebt[]>(HARDCODED_DEBTS);
  const [totalTransactions, setTotalTransactions] = useState(10);
  const [activeParticipants, setActiveParticipants] = useState<Set<string>>(new Set(['0x123...abc', '0x456...def', '0x789...ghi']));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suiBalance, setSuiBalance] = useState<string | null>('57.5');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  useEffect(() => {
    // Skip the data fetching for now since we're using hardcoded data
    setIsLoading(false);
  }, [walletAddress]);

  const totalOwed = 57.5; // Hardcoded total balance
  
  if (!walletAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-center"
      >
        <h2 className="text-xl text-white mb-4">Welcome to SuiSplit Dashboard</h2>
        <p className="text-gray-400">Please connect your wallet to view your expenses and balances.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8 relative"
    >
      {/* Sui Balance Card */}
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="mb-6"
      >
        <Card className="glass-card bg-gradient-to-r from-cyan-700/20 to-cyan-900/20 border-cyan-500/30 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl shadow-lg shadow-cyan-500/20"
            >
              <img src={SuiLogo} alt="Sui" className="h-8 w-8" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-cyan-300">
                Sui Balance ({walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Loading...'})
              </div>
              <div className="text-3xl font-mono text-white animate-gradient-text">57.5 SUI</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stat Cards */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="transform-gpu"
        >
          <StatCard
            title="Total Balance"
            value={totalOwed}
            prefix="$"
            icon={<TrendingUp className="h-7 w-7 text-white" />}
            gradientFrom="from-[#00D2D3]"
            gradientTo="to-[#192a56]"
            sparklineData={HARDCODED_MONTHLY_DATA.map(d => d.expenses)}
            illustration={coinIllustration}
          />
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="transform-gpu"
        >
          <StatCard
            title="Monthly Transactions"
            value={totalTransactions}
            suffix=" txns"
            icon={<Activity className="h-7 w-7 text-white" />}
            gradientFrom="from-[#6C5CE7]"
            gradientTo="to-[#341f97]"
            percentChange={0}
            percentColor="text-emerald-400"
            sparklineData={HARDCODED_MONTHLY_DATA.map(d => d.expenses + d.income)}
          />
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="transform-gpu"
        >
          <StatCard
            title="Active Participants"
            value={3}
            icon={<Users className="h-7 w-7 text-white" />}
            gradientFrom="from-[#00B894]"
            gradientTo="to-[#222f3e]"
            avatars={Array.from(activeParticipants).slice(0, 3).map(addr => addr.slice(0, 1))}
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="max-w-5xl mx-auto">
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="transform-gpu"
        >
          <Card className="glass-card shadow-xl border border-gray-700/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -left-20 top-10 w-60 h-60 rounded-full bg-purple-600/5 blur-3xl"></div>
              <div className="absolute -right-20 bottom-10 w-60 h-60 rounded-full bg-cyan-500/5 blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Title className="text-cyan-300 font-bold">Monthly Expense Trends</Title>
                <div className="flex items-center space-x-2">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H21M3 12H21M3 18H21" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              <div className="h-[400px] mt-6">
                <AnimatedLineChart
                  data={HARDCODED_MONTHLY_DATA.map(d => ({ x: d.date, y: d.expenses }))}
                  color={CHART_COLORS.secondary.base}
                  gradientFrom={CHART_COLORS.secondary.base}
                  gradientTo={CHART_COLORS.primary.base}
                  width={800}
                  height={350}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
