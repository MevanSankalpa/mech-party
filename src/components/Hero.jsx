/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useMemo } from "react";

const Hero = () => {
  // Generate particles once using useMemo to avoid re-renders
  const particles = useMemo(() => {
    return [...Array(50)].map(() => ({
      initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      initialOpacity: Math.random() * 0.5,
      animateY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      animateOpacity: Math.random() * 0.5,
      duration: Math.random() * 10 + 5,
    }));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
              opacity: particle.initialOpacity,
            }}
            animate={{
              y: [null, particle.animateY],
              opacity: [null, particle.animateOpacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            ZYNENTIA
          </h1>
          <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            14th March 2026
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Water's Edge Hotel
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
            onClick={() => {
              document.getElementById("tickets")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Get Your Tickets
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
