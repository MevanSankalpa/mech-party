/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTicketRecommendation,
  saveRecommendation,
  loadRecommendation,
  clearRecommendation,
  getTicketImage,
  EARLY_BIRD_ON,
} from "../utils/ticketLogic";
import { Check, X, RotateCcw } from "lucide-react";

const TicketRecommendation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    drinks: null,
    hasPartner: null,
    partnerSameBatch: null,
    drinksWithPartner: null,
  });
  const [recommendation, setRecommendation] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Load previous answers from localStorage on mount
  useEffect(() => {
    const stored = loadRecommendation();
    if (stored) {
      setAnswers({
        drinks: stored.drinks,
        hasPartner: stored.hasPartner,
        partnerSameBatch: stored.partnerSameBatch ?? null,
        drinksWithPartner: stored.drinksWithPartner,
      });

      const ticket = getTicketRecommendation(
        stored.drinks,
        stored.hasPartner,
        stored.partnerSameBatch ?? null,
        stored.drinksWithPartner,
      );
      setRecommendation(ticket);
      setShowRecommendation(true);
      setStep(4); // Skip to recommendation display
    }
  }, []);

  const handleAnswer = (question, value) => {
    const newAnswers = { ...answers, [question]: value };
    setAnswers(newAnswers);

    if (question === "drinks") {
      // Move to partner question
      setStep(1);
    } else if (question === "hasPartner") {
      if (!value) {
        // No partner - calculate recommendation immediately
        const ticket = getTicketRecommendation(
          newAnswers.drinks,
          value,
          null,
          null,
        );
        setRecommendation(ticket);
        saveRecommendation(newAnswers.drinks, value, null, null, ticket);
        setShowRecommendation(true);
        setStep(4);
      } else {
        // Has partner - ask if same batch
        setStep(2);
      }
    } else if (question === "partnerSameBatch") {
      // Check if user drinks to decide whether to ask Question 4
      if (newAnswers.drinks) {
        // Ask about drinking with partner (for both same and different batch)
        setStep(3);
      } else {
        // Doesn't drink
        const ticket = getTicketRecommendation(
          newAnswers.drinks,
          newAnswers.hasPartner,
          value,
          null,
        );
        setRecommendation(ticket);
        saveRecommendation(
          newAnswers.drinks,
          newAnswers.hasPartner,
          value,
          null,
          ticket,
        );
        setShowRecommendation(true);
        setStep(4);
      }
    } else if (question === "drinksWithPartner") {
      const ticket = getTicketRecommendation(
        newAnswers.drinks,
        newAnswers.hasPartner,
        newAnswers.partnerSameBatch,
        value,
      );
      setRecommendation(ticket);
      saveRecommendation(
        newAnswers.drinks,
        newAnswers.hasPartner,
        newAnswers.partnerSameBatch,
        value,
        ticket,
      );
      setShowRecommendation(true);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({
      drinks: null,
      hasPartner: null,
      partnerSameBatch: null,
      drinksWithPartner: null,
    });
    setRecommendation(null);
    setShowRecommendation(false);
    localStorage.clear();
  };

  const handleBuyNow = () => {
    navigate("/purchase");
  };

  const questions = [
    {
      id: "drinks",
      text: "Do you drink? 🍹",
      key: "drinks",
    },
    {
      id: "hasPartner",
      text: "Do you have a girlfriend/boyfriend? 💑",
      key: "hasPartner",
    },
    {
      id: "partnerSameBatch",
      text: "Is your partner from the same batch and department? 🎓",
      subtitle: "20th Batch, Mechanical Engineering, University of Moratuwa",
      key: "partnerSameBatch",
    },
    {
      id: "drinksWithPartner",
      text: "Do you drink when your partner is around? 🥂",
      key: "drinksWithPartner",
    },
  ];

  return (
    <section
      id="recommendation"
      ref={ref}
      className="min-h-screen bg-black py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Ticket
          </h2>
          <p className="text-gray-400 text-lg">
            Answer a few quick questions to get a personalized recommendation
          </p>
        </motion.div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {/* Show previous answers if they exist */}
          {showRecommendation && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between text-gray-300">
                <span>Do you drink? 🍹</span>
                <span
                  className={answers.drinks ? "text-green-400" : "text-red-400"}
                >
                  {answers.drinks ? "Yes ✓" : "No ✗"}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Do you have a girlfriend/boyfriend? 💑</span>
                <span
                  className={
                    answers.hasPartner ? "text-green-400" : "text-red-400"
                  }
                >
                  {answers.hasPartner ? "Yes ✓" : "No ✗"}
                </span>
              </div>
              {answers.hasPartner && answers.partnerSameBatch !== null && (
                <div className="flex items-center justify-between text-gray-300">
                  <span>Is your partner from the same batch? 🎓</span>
                  <span
                    className={
                      answers.partnerSameBatch
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {answers.partnerSameBatch ? "Yes ✓" : "No ✗"}
                  </span>
                </div>
              )}
              {answers.drinks &&
                answers.hasPartner &&
                answers.drinksWithPartner !== null && (
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Do you drink when your partner is around? 🥂</span>
                    <span
                      className={
                        answers.drinksWithPartner
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {answers.drinksWithPartner ? "Yes ✓" : "No ✗"}
                    </span>
                  </div>
                )}
              <div className="border-t border-gray-700 pt-4"></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showRecommendation ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {step < 4 && (
                  <>
                    <h3 className="text-2xl text-white mb-2 text-center">
                      {questions[step]?.text}
                    </h3>
                    {questions[step]?.subtitle && (
                      <p className="text-gray-400 text-sm mb-6 text-center">
                        {questions[step].subtitle}
                      </p>
                    )}
                    <div className="flex justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(questions[step].key, true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
                      >
                        <Check size={24} />
                        Yes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(questions[step].key, false)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
                      >
                        <X size={24} />
                        No
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-3xl text-white mb-4">
                  🎉 Perfect Match Found!
                </h3>
                
                {/* Ticket Image */}
                <div className="mb-6">
                  <img
                    src={getTicketImage(recommendation?.name)}
                    alt={recommendation?.name}
                    className="mx-auto rounded-lg shadow-2xl max-w-full h-auto border-4 border-gray-700 hover:scale-105 transition-transform duration-300"
                    style={{ maxWidth: '600px' }}
                  />
                </div>
                
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 mb-6">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {recommendation?.name}
                  </h4>
                  <p className="text-gray-200 text-sm mb-6">
                    {recommendation?.description}
                  </p>

                  {/* Custom Message Display */}
                  {recommendation?.message && (
                    <div className="bg-yellow-400/20 border border-yellow-400 rounded-lg p-4 mb-6">
                      <p className="text-yellow-100 font-medium">
                        💡 {recommendation.message}
                      </p>
                    </div>
                  )}

                  {/* Pricing Section */}
                  <div className="bg-black/30 rounded-lg p-6 mb-4">
                    {EARLY_BIRD_ON ? (
                      <>
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="text-left">
                            <p className="text-gray-300 text-sm mb-1">
                              Regular Price:
                            </p>
                            <p className="text-white line-through text-xl">
                              Rs {recommendation?.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-4xl">→</div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                                EARLY BIRD
                              </span>
                            </div>
                            <p className="text-yellow-400 text-3xl font-bold">
                              Rs {recommendation?.earlyBird.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-green-400 font-semibold text-lg">
                            💰 Save Rs{" "}
                            {(
                              recommendation?.price - recommendation?.earlyBird
                            ).toLocaleString()}
                            !
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-300 text-sm mb-1">Price:</p>
                        <p className="text-white text-3xl font-bold">
                          Rs {recommendation?.price.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBuyNow}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Buy Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="bg-gray-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Start Over
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TicketRecommendation;
