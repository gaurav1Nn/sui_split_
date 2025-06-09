// import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Define types for our particle system
// interface Particle {
//   x: number;
//   y: number;
//   size: number;
//   speedX: number;
//   speedY: number;
//   connections: number[];
//   alpha: number;
//   hue: number;
// }

// // Get Started button component
// import { useWallet } from '../../context/WalletContext';

// const GetStartedButton: React.FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => {
//     const navigate = useNavigate();
    
//     const handleClick = () => {
//       // Simply navigate to home page
//       navigate('/Home');
//     };
    
//     return (
//       <button onClick={handleClick} className={className}>
//         {children}
//       </button>
//     );
//   };

// const HeroSection: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const animationFrameRef = useRef<number>(0);
//   const mouseRef = useRef({ x: 0, y: 0 });

//   // Initialize and animate blockchain particle network
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Set canvas to full screen
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       initParticles();
//     };

//     // Track mouse position for interactive effects
//     const handleMouseMove = (e: MouseEvent) => {
//       mouseRef.current = {
//         x: e.clientX,
//         y: e.clientY
//       };
//     };

//     // Initialize particles
//     const initParticles = () => {
//       const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
//       particlesRef.current = [];

//       for (let i = 0; i < particleCount; i++) {
//         particlesRef.current.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           size: Math.random() * 2 + 1,
//           speedX: (Math.random() - 0.5) * 0.5,
//           speedY: (Math.random() - 0.5) * 0.5,
//           connections: [],
//           alpha: Math.random() * 0.5 + 0.5,
//           hue: Math.random() * 60 + 180, // Cyan to purple range
//         });
//       }
//     };

//     // Animation loop
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       // Update and draw particles
//       particlesRef.current.forEach((particle, index) => {
//         // Move particles
//         particle.x += particle.speedX;
//         particle.y += particle.speedY;
        
//         // Bounce off edges
//         if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
//         if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
//         // Draw particle
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`;
//         ctx.fill();
        
//         // Find connections
//         particle.connections = [];
//         particlesRef.current.forEach((otherParticle, otherIndex) => {
//           if (index !== otherIndex) {
//             const dx = particle.x - otherParticle.x;
//             const dy = particle.y - otherParticle.y;
//             const distance = Math.sqrt(dx * dx + dy * dy);
            
//             // Connect particles within range
//             if (distance < 150) {
//               particle.connections.push(otherIndex);
              
//               // Draw connection line
//               ctx.beginPath();
//               ctx.moveTo(particle.x, particle.y);
//               ctx.lineTo(otherParticle.x, otherParticle.y);
              
//               // Line opacity based on distance
//               const opacity = 1 - distance / 150;
//               ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 100%, 70%, ${opacity * 0.2})`;
//               ctx.lineWidth = 0.5;
//               ctx.stroke();
//             }
//           }
//         });
        
//         // Interactive effect with mouse
//         const dx = mouseRef.current.x - particle.x;
//         const dy = mouseRef.current.y - particle.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
        
//         if (distance < 200) {
//           const force = 0.1;
//           particle.speedX += (dx / distance) * force;
//           particle.speedY += (dy / distance) * force;
          
//           // Limit speed
//           const maxSpeed = 2;
//           const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
//           if (currentSpeed > maxSpeed) {
//             particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
//             particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
//           }
//         }
//       });
      
//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     // Set up event listeners
//     window.addEventListener('resize', handleResize);
//     window.addEventListener('mousemove', handleMouseMove);
    
//     // Initialize
//     handleResize();
//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(animationFrameRef.current);
//     };
//   }, []);

//   // Animation variants for content
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   // Floating coin animation variants
//   const floatingCoinVariants = {
//     float: (i: number) => ({
//       y: [0, -15, 0],
//       rotate: [0, i % 2 === 0 ? 10 : -10, 0],
//       transition: {
//         y: {
//           repeat: Infinity,
//           duration: 3 + i * 0.5,
//           ease: 'easeInOut',
//         },
//         rotate: {
//           repeat: Infinity,
//           duration: 4 + i * 0.5,
//           ease: 'easeInOut',
//         },
//       },
//     }),
//   };

//   const [rotateX, setRotateX] = React.useState(0);
//   const [rotateY, setRotateY] = React.useState(0);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (contentRef.current) {
//         const { left, top, width, height } = contentRef.current.getBoundingClientRect();
//         const centerX = left + width / 2;
//         const centerY = top + height / 2;
//         const offsetX = (e.clientX - centerX) / (width / 2); // -1 to 1
//         const offsetY = (e.clientY - centerY) / (height / 2); // -1 to 1

//         setRotateY(offsetX * 10); // Max 10 degrees rotation
//         setRotateX(-offsetY * 10); // Max 10 degrees rotation
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Blockchain network background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full z-0"
//       />

//       {/* Morphing gradient blobs */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse-subtle" />
//         <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
//         <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }} />
//       </div>

//       {/* Content container */}
//       <div
//         ref={contentRef}
//         className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen perspective-1000"
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="text-center max-w-4xl"
//           style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
//           transition: 'transform 0.1s ease-out' // Smooth transition for rotation
//          }}
//         >
//           {/* Holographic headline */}
//           <motion.h1
//             variants={itemVariants}
//             className="text-6xl md:text-7xl font-extrabold mb-6 relative"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-size-200 animate-gradient relative inline-block">
//               Split Bills,
//               <br />
//               Not Friendships
//             </span>
//             <div className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-size-200 animate-gradient blur-sm opacity-70" style={{ animationDelay: '0.5s' }} aria-hidden="true">
//               Split Bills,
//               <br />
//               Not Friendships
//             </div>
//           </motion.h1>

//           {/* Subheadline */}
//           <motion.p
//             variants={itemVariants}
//             className="text-xl md:text-2xl text-gray-300 mb-10"
//           >
//             Revolutionary blockchain-powered expense sharing
//           </motion.p>

//           {/* CTA button */}
//           <motion.div
//             variants={itemVariants}
//             className="flex justify-center mb-16"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative group"
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
//               <GetStartedButton className="relative px-8 py-4 bg-gray-900 rounded-lg font-bold text-white flex items-center justify-center gap-2 group-hover:bg-gray-800 transition duration-200">
//                 Get Started <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
//               </GetStartedButton>
//             </motion.div>
//           </motion.div>

//           {/* Floating app screenshots */}
//           <motion.div
//             variants={itemVariants}
//             className="relative h-80 mb-10"
//           >
//             {/* Phone mockups */}
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
//             >
//               <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative glassmorphism-card">
//                 <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
//                 <div className="p-2 h-full">
//                   <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
//                     <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-12 rounded-lg mb-3 flex items-center justify-between px-4">
//                       <div className="w-24 h-4 bg-white/20 rounded-full"></div>
//                       <div className="w-8 h-8 bg-white/20 rounded-full"></div>
//                     </div>
//                     <div className="space-y-3">
//                       <div className="bg-gray-800/50 h-20 rounded-lg p-3 backdrop-blur-md">
//                         <div className="flex justify-between items-center mb-2">
//                           <div className="w-20 h-3 bg-cyan-500/30 rounded-full"></div>
//                           <div className="w-10 h-3 bg-purple-500/30 rounded-full"></div>
//                         </div>
//                         <div className="flex gap-2">
//                           <div className="w-10 h-10 rounded-full bg-cyan-500/20"></div>
//                           <div className="flex-1 space-y-2">
//                             <div className="w-full h-2 bg-gray-700 rounded-full"></div>
//                             <div className="w-2/3 h-2 bg-gray-700 rounded-full"></div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="bg-gray-800/50 h-20 rounded-lg p-3 backdrop-blur-md">
//                         <div className="flex justify-between items-center mb-2">
//                           <div className="w-20 h-3 bg-purple-500/30 rounded-full"></div>
//                           <div className="w-10 h-3 bg-cyan-500/30 rounded-full"></div>
//                         </div>
//                         <div className="flex gap-2">
//                           <div className="w-10 h-10 rounded-full bg-purple-500/20"></div>
//                           <div className="flex-1 space-y-2">
//                             <div className="w-full h-2 bg-gray-700 rounded-full"></div>
//                             <div className="w-2/3 h-2 bg-gray-700 rounded-full"></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Secondary phone mockup */}
//             <motion.div
//               initial={{ y: 40, opacity: 0 }}
//               animate={{ y: 0, opacity: 0.7 }}
//               transition={{ delay: 1, duration: 0.8 }}
//               className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-90"
//             >
//               <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative rotate-6 glassmorphism-card">
//                 <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
//                 <div className="p-2 h-full">
//                   <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
//                     <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-12 rounded-lg mb-3"></div>
//                     <div className="space-y-3">
//                       <div className="bg-gray-800/50 h-40 rounded-lg backdrop-blur-md"></div>
//                       <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
//                       <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Tertiary phone mockup */}
//             <motion.div
//               initial={{ y: 40, opacity: 0 }}
//               animate={{ y: 0, opacity: 0.7 }}
//               transition={{ delay: 1.2, duration: 0.8 }}
//               className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-90"
//             >
//               <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative -rotate-6 glassmorphism-card">
//                 <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
//                 <div className="p-2 h-full">
//                   <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
//                     <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-12 rounded-lg mb-3"></div>
//                     <div className="space-y-3">
//                       <div className="bg-gray-800/50 h-40 rounded-lg backdrop-blur-md"></div>
//                       <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
//                       <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Floating crypto coins */}
//           <div className="absolute z-10 opacity-80 pointer-events-none">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 custom={i}
//                 variants={floatingCoinVariants}
//                 animate="float"
//                 className="absolute glassmorphism-coin"
//                 style={{
//                   left: `${20 + i * 30}%`,
//                   top: `${30 + (i % 3) * 20}%`,
//                 }}
//               >
//                 <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${i === 0 ? 'from-orange-400 to-orange-600' : i === 1 ? 'from-blue-400 to-indigo-600' : 'from-cyan-400 to-cyan-600'} shadow-lg`}>
//                   <div className="text-white font-bold text-xl">
//                     {i === 0 ? 'B' : i === 1 ? 'E' : 'S'}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { ConnectButton } from '@mysten/wallet-kit';

// Define types for our particle system
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  connections: number[];
  alpha: number;
  hue: number;
}

// Remove the GetStartedButton component - we'll use ConnectButton directly

const HeroSection: React.FC = () => {
  const { isConnected } = useWallet(); // Add this to check connection status
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // ... rest of your particle animation code ...

  // Then in your JSX where you had the GetStartedButton, replace it with:
  // (in the CTA button section)
  // Initialize and animate blockchain particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Track mouse position for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          connections: [],
          alpha: Math.random() * 0.5 + 0.5,
          hue: Math.random() * 60 + 180, // Cyan to purple range
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`;
        ctx.fill();
        
        // Find connections
        particle.connections = [];
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect particles within range
            if (distance < 150) {
              particle.connections.push(otherIndex);
              
              // Draw connection line
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              
              // Line opacity based on distance
              const opacity = 1 - distance / 150;
              ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 100%, 70%, ${opacity * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
        
        // Interactive effect with mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = 0.1;
          particle.speedX += (dx / distance) * force;
          particle.speedY += (dy / distance) * force;
          
          // Limit speed
          const maxSpeed = 2;
          const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize
    handleResize();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Floating coin animation variants
  const floatingCoinVariants = {
    float: (i: number) => ({
      y: [0, -15, 0],
      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3 + i * 0.5,
          ease: 'easeInOut',
        },
        rotate: {
          repeat: Infinity,
          duration: 4 + i * 0.5,
          ease: 'easeInOut',
        },
      },
    }),
  };

  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contentRef.current) {
        const { left, top, width, height } = contentRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = (e.clientX - centerX) / (width / 2); // -1 to 1
        const offsetY = (e.clientY - centerY) / (height / 2); // -1 to 1

        setRotateY(offsetX * 10); // Max 10 degrees rotation
        setRotateX(-offsetY * 10); // Max 10 degrees rotation
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blockchain network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Morphing gradient blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content container */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen perspective-1000"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out' // Smooth transition for rotation
         }}
        >
          {/* Holographic headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-extrabold mb-6 relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-size-200 animate-gradient relative inline-block">
              Split Bills,
              <br />
              Not Friendships
            </span>
            <div className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-size-200 animate-gradient blur-sm opacity-70" style={{ animationDelay: '0.5s' }} aria-hidden="true">
              Split Bills,
              <br />
              Not Friendships
            </div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-10"
          >
            Revolutionary blockchain-powered expense sharing
          </motion.p>

          {/* CTA button */}
         {/* CTA button */}
<motion.div
  variants={itemVariants}
  className="flex justify-center mb-16"
>
  {!isConnected ? (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative px-8 py-4 bg-gray-900 rounded-lg">
        <ConnectButton />
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-xl text-green-400 font-semibold flex items-center gap-2"
    >
      ✓ Wallet Connected
    </motion.div>
  )}
</motion.div>

          {/* Floating app screenshots */}
          <motion.div
            variants={itemVariants}
            className="relative h-80 mb-10"
          >
            {/* Phone mockups */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative glassmorphism-card">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
                <div className="p-2 h-full">
                  <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-12 rounded-lg mb-3 flex items-center justify-between px-4">
                      <div className="w-24 h-4 bg-white/20 rounded-full"></div>
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 h-20 rounded-lg p-3 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-2">
                          <div className="w-20 h-3 bg-cyan-500/30 rounded-full"></div>
                          <div className="w-10 h-3 bg-purple-500/30 rounded-full"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20"></div>
                          <div className="flex-1 space-y-2">
                            <div className="w-full h-2 bg-gray-700 rounded-full"></div>
                            <div className="w-2/3 h-2 bg-gray-700 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 h-20 rounded-lg p-3 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-2">
                          <div className="w-20 h-3 bg-purple-500/30 rounded-full"></div>
                          <div className="w-10 h-3 bg-cyan-500/30 rounded-full"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20"></div>
                          <div className="flex-1 space-y-2">
                            <div className="w-full h-2 bg-gray-700 rounded-full"></div>
                            <div className="w-2/3 h-2 bg-gray-700 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary phone mockup */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-90"
            >
              <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative rotate-6 glassmorphism-card">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
                <div className="p-2 h-full">
                  <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-12 rounded-lg mb-3"></div>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 h-40 rounded-lg backdrop-blur-md"></div>
                      <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
                      <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tertiary phone mockup */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-90"
            >
              <div className="w-64 h-[500px] rounded-[36px] border-8 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden relative -rotate-6 glassmorphism-card">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
                <div className="p-2 h-full">
                  <div className="rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 backdrop-blur-lg">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-12 rounded-lg mb-3"></div>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 h-40 rounded-lg backdrop-blur-md"></div>
                      <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
                      <div className="bg-gray-800/50 h-20 rounded-lg backdrop-blur-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating crypto coins */}
          <div className="absolute z-10 opacity-80 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={floatingCoinVariants}
                animate="float"
                className="absolute glassmorphism-coin"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${i === 0 ? 'from-orange-400 to-orange-600' : i === 1 ? 'from-blue-400 to-indigo-600' : 'from-cyan-400 to-cyan-600'} shadow-lg`}>
                  <div className="text-white font-bold text-xl">
                    {i === 0 ? 'B' : i === 1 ? 'E' : 'S'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;