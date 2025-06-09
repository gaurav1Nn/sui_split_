import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

// Add logger utility
const log = (component: string, action: string, data?: any) => {
  console.log(`[${component}] ${action}`, data ? data : '');
};

interface StatCardProps {
  title: string;
  value: number | null;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  sparklineData?: number[];
  percentChange?: number;
  percentColor?: string;
  avatars?: string[]; // URLs or initials
  accent?: string;
  illustration?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon,
  gradientFrom,
  gradientTo,
  sparklineData,
  percentChange,
  percentColor = 'text-emerald-400',
  avatars,
  accent,
  illustration,
}) => {
  log('StatCard', 'Rendering', { title, value, hasSparkline: !!sparklineData });
  
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    log('StatCard', 'Value changed', { title, oldValue: displayValue, newValue: value });
    
    if (value !== null) {
      const controls = animate(motionValue, value, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(latest);
          log('StatCard', 'Animating value', { title, currentValue: latest });
        }
      });
      return controls.stop;
    } else {
      setDisplayValue(0);
      log('StatCard', 'Reset to zero', { title });
    }
  }, [value, motionValue, title]);

  // Sparkline SVG
  let sparkline = null;
  if (sparklineData && sparklineData.length > 1) {
    log('StatCard', 'Processing sparkline data', { 
      title, 
      dataPoints: sparklineData.length,
      hasInvalidData: sparklineData.some(v => isNaN(v) || v === null)
    });
    
    const validData = sparklineData.filter(v => !isNaN(v) && v !== null);
    if (validData.length > 1) {
      const max = Math.max(...validData);
      const min = Math.min(...validData);
      const range = max - min || 1;
      
      log('StatCard', 'Sparkline data processed', { 
        title, 
        validPoints: validData.length,
        min,
        max,
        range
      });

      const points = validData.map((v, i) => {
        const x = (i / (validData.length - 1)) * 60;
        const y = 24 - ((v - min) / range) * 20;
        return `${x},${y}`;
      }).join(' ');

      sparkline = (
        <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
          <motion.polyline
            points={points}
            fill="none"
            stroke="#00D2D3"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
      );
    } else {
      log('StatCard', 'Insufficient valid data for sparkline', { title });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[160px] bg-gradient-to-br ${gradientFrom} ${gradientTo} overflow-hidden`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
      </div>
      <div className="flex items-center justify-between mb-2 relative z-10">
        {icon && (
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 rounded-xl bg-white/10 text-white text-2xl flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/10"
          >
            {icon}
          </motion.div>
        )}
        {illustration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute right-4 bottom-4 pointer-events-none animate-float"
          >
            {illustration}
          </motion.div>
        )}
        {avatars && avatars.length > 0 && (
          <div className="flex -space-x-3">
            {avatars.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.3 }}
                whileHover={{ y: -5, zIndex: 20 }}
                className="w-9 h-9 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-white text-sm font-bold shadow-md backdrop-blur-sm"
                style={{ zIndex: 10 - i }}
              >
                {a}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between relative z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium text-white/90 mb-2 backdrop-blur-sm inline-block px-2 py-0.5 rounded-lg bg-white/5"
          >
            {title}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-baseline gap-2"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              {value === null ? (
                <motion.span
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                  className="text-3xl"
                >
                  Loading...
                </motion.span>
              ) : (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {prefix}
                  {displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  {suffix}
                </motion.span>
              )}
            </span>
            {percentChange !== undefined && value !== null && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${percentColor} bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg`}
              >
                {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
              </motion.span>
            )}
          </motion.div>
        </div>
        {sparkline && value !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="ml-2"
          >
            {sparkline}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;