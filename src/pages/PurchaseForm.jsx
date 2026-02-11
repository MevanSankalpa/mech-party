import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadRecommendation } from "../utils/ticketLogic";
import { ArrowLeft } from "lucide-react";

const PurchaseForm = () => {
  const [recommendedTicket, setRecommendedTicket] = useState(null);

  useEffect(() => {
    const stored = loadRecommendation();
    if (stored) {
      setRecommendedTicket(stored.recommendedTicket);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header with recommended ticket badge */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          {recommendedTicket && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full">
              <span className="text-white text-sm font-semibold">
                Recommended: {recommendedTicket}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Google Form Embed */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Purchase Your Ticket
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Fill out the form below to secure your spot at Zynentia
          </p>

          {/* Placeholder for Google Form */}
          <div className="bg-black rounded-lg p-8 border border-gray-700 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-xl mb-4">
                Google Form will be embedded here
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Placeholder URL: https://forms.google.com/PLACEHOLDER
              </p>
              {recommendedTicket && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-lg inline-block">
                  <p className="text-white text-lg font-semibold">
                    Your Recommended Ticket:
                  </p>
                  <p className="text-white text-2xl font-bold mt-2">
                    {recommendedTicket}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions for actual implementation */}
          <div className="mt-8 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>To embed the actual Google Form:</strong>
              <br />
              1. Create your Google Form
              <br />
              2. Click "Send" → "Embed HTML"
              <br />
              3. Copy the iframe code
              <br />
              4. Replace the placeholder div above with the iframe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
