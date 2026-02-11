/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HotelShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Placeholder images for luxury hotel/banquet halls
  const images = [
    "https://images.unsplash.com/photo-1519167758481-83f29da8ee8d?w=800",
    "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800",
    "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800",
  ];

  return (
    <section ref={ref} className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Water's Edge Hotel
          </h2>
          <p className="text-gray-400 text-lg">
            Experience luxury and elegance at one of Colombo's finest venues
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-lg group"
            >
              <img
                src={img}
                alt={`Hotel venue ${index + 1}`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center text-gray-400"
        >
          <p className="text-sm">
            * Images are placeholders and will be replaced with actual venue photos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelShowcase;
