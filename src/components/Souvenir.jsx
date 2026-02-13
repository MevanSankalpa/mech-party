// Note: motion is used as a JSX component (<motion.div>, <motion.h2>, etc.)
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Star, Sparkles } from "lucide-react";

const Souvenir = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl">✨</div>
        <div className="absolute top-40 right-20 text-6xl">🎁</div>
        <div className="absolute bottom-20 left-20 text-6xl">⭐</div>
        <div className="absolute bottom-40 right-10 text-6xl">✨</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon Group */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center gap-4 mb-8"
          >
            <Sparkles className="text-yellow-400 w-12 h-12" />
            <Gift className="text-yellow-400 w-16 h-16" />
            <Star className="text-yellow-400 w-12 h-12" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient">
              Take Home a Memory,
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient">
              Crafted Just for You
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Every ticket includes a{" "}
            <span className="text-yellow-400 font-semibold">
              personalized souvenir
            </span>
            , specially designed to commemorate your Zynentia experience
          </motion.p>

          {/* Souvenir Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12"
          >
            <div className="relative inline-block">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur-3xl opacity-30 animate-pulse"></div>

              {/* Image */}
              {/* <img
                src="/souvenir-preview.png"
                alt="Personalized Souvenir"
                className="relative rounded-lg shadow-2xl max-w-full h-auto mx-auto border-4 border-yellow-400/30"
                style={{ maxWidth: "400px" }}
              /> */}
            </div>
          </motion.div>

          {/* Additional highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Uniquely Designed
              </h3>
              <p className="text-gray-400 text-sm">
                Each souvenir is crafted with care and attention to detail
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Personalized
              </h3>
              <p className="text-gray-400 text-sm">
                Your name and special details make it one-of-a-kind
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-400 text-sm">
                A keepsake you'll treasure for years to come
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Souvenir;
