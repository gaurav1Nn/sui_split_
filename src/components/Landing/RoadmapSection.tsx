import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

interface RoadmapItemProps {
  title: string;
  features: string[];
  status: 'current' | 'upcoming' | 'future';
  version: string;
  index: number;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ title, features, status, version, index }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'current':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
          borderColor: 'border-green-500/30',
          iconColor: 'text-green-500',
          titleColor: 'text-green-400'
        };
      case 'upcoming':
        return {
          icon: <Clock className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
          borderColor: 'border-blue-500/30',
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-400'
        };
      case 'future':
        return {
          icon: <Calendar className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
          borderColor: 'border-purple-500/30',
          iconColor: 'text-purple-500',
          titleColor: 'text-purple-400'
        };
      default:
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-br from-gray-500/20 to-gray-600/20',
          borderColor: 'border-gray-500/30',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-400'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`${config.bgColor} backdrop-blur-sm rounded-xl p-6 border ${config.borderColor}`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${config.iconColor} mr-3`}>
          {config.icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${config.titleColor}`}>{title}</h3>
          <p className="text-gray-400 text-sm">{version}</p>
        </div>
      </div>
      
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className={`${config.iconColor} mr-2`}>•</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const RoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      title: "Current Version",
      version: "v1.0",
      status: 'current' as const,
      features: [
        "Basic expense splitting",
        "Sui wallet integration",
        "Real-time balance tracking",
        "One-click settlements"
      ]
    },
    {
      title: "Upcoming Features",
      version: "v1.1",
      status: 'upcoming' as const,
      features: [
        "Multi-currency support",
        "Mobile application",
        "Advanced analytics and insights",
        "Push notifications",
        "Internationalization (i18n)"
      ]
    },
    {
      title: "Future Plans",
      version: "v2.0",
      status: 'future' as const,
      features: [
        "Integration with traditional payment methods",
        "AI-powered expense categorization",
        "Recurring expense management",
        "Merchant integrations",
        "Enhanced privacy features"
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="roadmap">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-green-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">🗺 Roadmap</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Our vision for SuiSplit's evolution and growth.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapItems.map((item, index) => (
            <RoadmapItem
              key={index}
              title={item.title}
              version={item.version}
              status={item.status}
              features={item.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;