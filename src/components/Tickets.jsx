/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TICKET_TYPES, EARLY_BIRD_ON } from "../utils/ticketLogic";
import { User, Users, Wine } from "lucide-react";

const Tickets = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const ticketCards = [
    {
      type: TICKET_TYPES.NORMAL_SINGLE,
      icon: User,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      type: TICKET_TYPES.NORMAL_SINGLE_LIQUOR,
      icon: Wine,
      gradient: "from-purple-600 to-purple-800",
    },
    {
      type: TICKET_TYPES.COUPLE,
      icon: Users,
      gradient: "from-pink-600 to-pink-800",
    },
    {
      type: TICKET_TYPES.COUPLE_LIQUOR,
      icon: Users,
      gradient: "from-red-600 to-red-800",
    },
  ];

  return (
    <section
      id="tickets"
      ref={ref}
      className="min-h-screen bg-gray-900 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ticket Options
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            Choose the perfect ticket for your experience
          </p>
          {EARLY_BIRD_ON && (
            <p className="text-yellow-400 font-semibold text-xl">
              🎟️ Early Bird Pricing Available!
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ticketCards.map((ticket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-white transition-colors"
            >
              <div
                className={`bg-linear-to-br ${ticket.gradient} p-6 flex items-center justify-center`}
              >
                <ticket.icon size={60} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {ticket.type.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {ticket.type.description}
                </p>
                <div className="mb-4">
                  {EARLY_BIRD_ON ? (
                    <>
                      <div className="text-gray-400 line-through text-sm">
                        Rs {ticket.type.price.toLocaleString()}
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">
                        Rs {ticket.type.earlyBird.toLocaleString()}
                      </div>
                      <div className="text-xs text-yellow-400">
                        Early Bird Price
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      Rs {ticket.type.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">
            Not sure which ticket is right for you?
          </p>
          <button
            onClick={() => {
              document.getElementById("recommendation")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Let Us Help You Choose
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Tickets;
