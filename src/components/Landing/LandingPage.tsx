import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ComparisonSection from './ComparisonSection';
import UseCasesSection from './UseCasesSection';
import TechStackSection from './TechStackSection';
import HowItWorksSection from './HowItWorksSection';
import RoadmapSection from './RoadmapSection';
// Remove this import line:
// import UserTestimonials from './UserTestimonials';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <UseCasesSection />
      <HowItWorksSection />
      <TechStackSection />
      {/* Remove this component: */}
      {/* <UserTestimonials /> */}
      <RoadmapSection />
      
      {/* Footer */}
      <footer className="py-12 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">SuiSplit</h3>
              <p className="text-gray-400 mt-2">Splitting expenses on the Sui blockchain</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="https://github.com/your-repo/suisplit" className="text-gray-400 hover:text-cyan-400 transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"></a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"></a></li>
                </ul>
              </div>
              
              {/* <div>
                <h4 className="text-lg font-semibold mb-3"></h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Discord</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Telegram</a></li>
                </ul>
              </div> */}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700/50 text-center text-gray-500">
            <p>© {new Date().getFullYear()} SuiSplit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;