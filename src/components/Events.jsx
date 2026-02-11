/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Music, Shirt, Gift, PartyPopper, Video } from "lucide-react";

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const events = [
    {
      icon: Video,
      title: "360 Photo & Videography",
      description: "Capture unforgettable moments from every angle",
      emoji: "📸",
    },
    {
      icon: Camera,
      title: "Live Photo Booth",
      description: "Instant photos to take home as memories",
      emoji: "📷",
    },
    {
      icon: Music,
      title: "Live Acoustic Band",
      description: "Enjoy live music throughout the evening",
      emoji: "🎸",
    },
    {
      icon: Shirt,
      title: "Costume Competition",
      description: "Show off your best party outfit and win prizes",
      emoji: "👔",
    },
    {
      icon: Gift,
      title: "Raffle Draw",
      description: "Win exciting prizes throughout the night",
      emoji: "🎁",
    },
    {
      icon: PartyPopper,
      title: "Fun Activities",
      description: "Games and entertainment all night long",
      emoji: "🎉",
    },
  ];

  return (
    <section ref={ref} className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            What's Happening
          </h2>
          <p className="text-gray-400 text-lg">
            Experience an unforgettable night filled with entertainment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black rounded-lg p-6 border border-gray-800 hover:border-white transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <event.icon size={40} className="text-white" />
                <span className="text-4xl">{event.emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <p className="text-gray-400">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
