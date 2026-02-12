import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadRecommendation,
  clearRecommendation,
  TICKET_TYPES,
  EARLY_BIRD_ON,
} from "../utils/ticketLogic";
import {
  ArrowLeft,
  CheckCircle,
  Home,
  PartyPopper,
  Upload,
} from "lucide-react";

const PURCHASE_FORM_DRAFT_KEY = "purchaseFormDraft";

const TICKET_VALUE_MAP = {
  [TICKET_TYPES.NORMAL_SINGLE.name.toLowerCase()]: "single/without-liquor",
  [TICKET_TYPES.NORMAL_SINGLE_SAME_BATCH.name.toLowerCase()]:
    "single/without-liquor",
  [TICKET_TYPES.NORMAL_SINGLE_LIQUOR.name.toLowerCase()]: "single/with-liquor",
  [TICKET_TYPES.NORMAL_SINGLE_LIQUOR_SAME_BATCH.name.toLowerCase()]:
    "single/with-liquor",
  [TICKET_TYPES.COUPLE.name.toLowerCase()]: "couple/without-liquor",
  [TICKET_TYPES.COUPLE_LIQUOR.name.toLowerCase()]: "couple/with-liquor",
  "single/with-liquor": "single/with-liquor",
  "single/without-liquor": "single/without-liquor",
  "couple/with-liquor": "couple/with-liquor",
  "couple/without-liquor": "couple/without-liquor",
};

const TICKET_TYPE_BY_VALUE = {
  "single/without-liquor": TICKET_TYPES.NORMAL_SINGLE,
  "single/with-liquor": TICKET_TYPES.NORMAL_SINGLE_LIQUOR,
  "couple/without-liquor": TICKET_TYPES.COUPLE,
  "couple/with-liquor": TICKET_TYPES.COUPLE_LIQUOR,
};

const PurchaseForm = () => {
  const navigate = useNavigate();
  const paymentSlipInputRef = useRef(null);
  const [recommendedTicket, setRecommendedTicket] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [index, setIndex] = useState("200581H");
  const [email, setEmail] = useState("mevan@mailinator.com");
  const [whatsApp, setWhatsApp] = useState("0715683158");
  const [name, setName] = useState("Mevan");
  const [partner, setPartner] = useState("Jesmin");
  const [ticket, setTicket] = useState("single/with-liquor");
  const [isDraftHydrated, setIsDraftHydrated] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    const stored = loadRecommendation();
    if (stored?.recommendedTicket) {
      setRecommendedTicket(stored.recommendedTicket);
    } else {
      navigate("/", { replace: true });
      return;
    }

    const draft = localStorage.getItem(PURCHASE_FORM_DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setIndex(parsed.index ?? "");
        setEmail(parsed.email ?? "");
        setWhatsApp(parsed.whatsApp ?? "");
        setName(parsed.name ?? "");
        setPartner(parsed.partner ?? "");
        setTicket(parsed.ticket ?? "single/with-liquor");
        setImageUrl(parsed.imageUrl ?? null);
      } catch (error) {
        console.error("Failed to parse saved purchase form draft", error);
      }
    }

    setIsDraftHydrated(true);
  }, [navigate]);

  useEffect(() => {
    if (!recommendedTicket) return;

    const normalizedTicket = recommendedTicket.trim().toLowerCase();
    const mappedTicket = TICKET_VALUE_MAP[normalizedTicket];

    if (mappedTicket) {
      setTicket(mappedTicket);
    }
  }, [recommendedTicket]);

  const selectedTicketType = TICKET_TYPE_BY_VALUE[ticket];
  const selectedTicketPrice = selectedTicketType
    ? EARLY_BIRD_ON
      ? selectedTicketType.earlyBird
      : selectedTicketType.price
    : null;
  const isFormBusy = submitLoading || imageUploadLoading;

  useEffect(() => {
    if (!isDraftHydrated) return;

    const draft = {
      index,
      email,
      whatsApp,
      name,
      partner,
      ticket,
      imageUrl,
    };

    localStorage.setItem(PURCHASE_FORM_DRAFT_KEY, JSON.stringify(draft));
  }, [
    isDraftHydrated,
    index,
    email,
    whatsApp,
    name,
    partner,
    ticket,
    imageUrl,
  ]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const hasRequiredFields =
      index.trim() &&
      email.trim() &&
      whatsApp.trim() &&
      name.trim() &&
      partner.trim();

    if (!hasRequiredFields || !imageUrl) {
      alert("Please complete all required fields and upload the payment slip.");
      return;
    }

    setSubmitLoading(true);

    const formData = new FormData();

    formData.append("Date", new Date().toLocaleString());
    formData.append("Index", index);
    formData.append("Email", email);
    formData.append("WhatsApp", whatsApp);
    formData.append("Name", name);
    formData.append("Partner", partner);
    formData.append("Ticket", ticket);
    formData.append("Payment", imageUrl);
    formData.append("Early", EARLY_BIRD_ON ? "Yes" : "No");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz8tHHG-Q_8dXz9i1gfGkkXmDWXL_K1e6Ou12AJVbYP6A9c-aES9TmN_d4nj7yAf5B6/exec",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        localStorage.removeItem(PURCHASE_FORM_DRAFT_KEY);
        clearRecommendation();
        setIsSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      const payload = {
        fileName: file.name,
        mimeType: file.type,
        image: base64Image,
      };

      try {
        setImageUploadLoading(true);

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycby2rAbHTrR4110HcSp5dvadz8k6QGMIadmEUlguTS_oxSu-LqTJ93dhedYRIcw8_7q4ew/exec",
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
        );

        const result = await response.json();

        if (result.success) {
          setImageUrl(result.fileUrl);
        } else {
          alert("Upload failed: " + result.error);
        }
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setImageUploadLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

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
            <div className="bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full">
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
          {!isSubmitSuccess && (
            <>
              <h1 className="text-4xl font-bold text-white mb-4 text-center">
                Purchase Your Ticket
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Fill out the form below to secure your spot at Zynentia
              </p>
            </>
          )}

          {isSubmitSuccess ? (
            <div className="bg-black rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PartyPopper size={32} className="text-yellow-400" />
                <CheckCircle size={34} className="text-green-500" />
                <PartyPopper size={32} className="text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Your ticket is secured!
              </h2>
              <p className="text-gray-300 mb-8">
                Payment details received successfully. We&apos;ll contact you
                soon with further updates.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                <Home size={18} />
                Go back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitForm}
              className="bg-black rounded-lg p-8 border border-gray-700"
            >
              <fieldset disabled={isFormBusy} className="space-y-6">
                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="index"
                  >
                    Index Number
                  </label>
                  <input
                    id="index"
                    type="text"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="whatsapp"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    type="number"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="name"
                  >
                    Name (First Name & Last Name)
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="partner"
                  >
                    Partner&apos;s Name (First Name & Last Name)
                  </label>
                  <input
                    id="partner"
                    type="text"
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-white font-medium mb-2"
                    htmlFor="paymentSlip"
                  >
                    Payment Slip
                  </label>
                  <div className="bg-gray-900 border border-gray-700 rounded-md p-4 mb-4">
                    <p className="text-white text-sm">
                      ACC NO: 088200170059332
                    </p>
                    <p className="text-white text-sm">
                      ACC NAME: HMSY Ariyawantha
                    </p>
                    <p className="text-white text-sm">
                      BANK: People&apos;s bank
                    </p>
                    <p className="text-white text-sm">BRANCH: Ratnapura</p>
                    {selectedTicketPrice !== null && (
                      <>
                        {EARLY_BIRD_ON ? (
                          <>
                            <p className="text-white/80 text-sm mt-3">
                              Normal Price: Rs{" "}
                              {selectedTicketType.price.toLocaleString()}
                            </p>
                            <p className="text-yellow-400 font-semibold mt-1">
                              You should Pay Only: Rs{" "}
                              {selectedTicketType.earlyBird.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-yellow-400 font-semibold mt-3">
                            Ticket Price: Rs{" "}
                            {selectedTicketType.price.toLocaleString()}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <input
                    id="paymentSlip"
                    ref={paymentSlipInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => paymentSlipInputRef.current?.click()}
                    disabled={isFormBusy}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white flex items-center justify-center gap-2 hover:border-gray-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Upload size={18} />
                    {imageUploadLoading ? "Uploading..." : "Upload Image"}
                  </button>
                  {imageUrl && (
                    <div className="mt-3 flex items-center gap-2 text-green-500">
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">
                        Upload successful
                      </span>
                    </div>
                  )}
                  {!imageUrl && (
                    <p className="mt-3 text-red-400 text-sm">
                      Payment slip upload is required before submitting.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitLoading || imageUploadLoading || !imageUrl}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitLoading ? "Submitting..." : "Submit"}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
