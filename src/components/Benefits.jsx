/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Utensils, Wine, Pizza } from "lucide-react";

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const benefits = [
    {
      icon: Utensils,
      title: "Premium Dinner Buffet",
      description:
        "Savor a delicious spread of international and local cuisine",
      emoji: "🍽️",
    },
    {
      icon: Wine,
      title: "Unlimited Liquor",
      description: "Premium drinks flowing all night long",
      emoji: "🍹",
    },
    {
      icon: Pizza,
      title: "Unlimited Bites",
      description: "Snacks and treats throughout the evening",
      emoji: "🍕",
    },
  ];

  return (
    <section ref={ref} className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            What You Get
          </h2>
          <p className="text-gray-400 text-lg">
            All-inclusive premium experience for an unforgettable night
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 border border-gray-800 hover:border-white transition-colors text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-4">
                  <benefit.icon size={40} className="text-black" />
                </div>
              </div>
              <span className="text-5xl block mb-4">{benefit.emoji}</span>
              <h3 className="text-2xl font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
            onClick={() => {
              document.getElementById("recommendation")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Get Your Tickets
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
