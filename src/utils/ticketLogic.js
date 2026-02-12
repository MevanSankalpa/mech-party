// Ticket recommendation logic based on user preferences

export const TICKET_TYPES = {
  NORMAL_SINGLE: {
    name: "Normal Single Person",
    price: 11000,
    earlyBird: 9900,
    description: "Welcome drink, premium dinner buffet, unlimited bites",
    message: null,
  },
  NORMAL_SINGLE_LIQUOR: {
    name: "Normal Single Person with Liquor",
    price: 12500,
    earlyBird: 11500,
    description: "Welcome drink, premium dinner buffet, unlimited bites, unlimited liquor",
    message: null,
  },
  NORMAL_SINGLE_SAME_BATCH: {
    name: "Normal Single Person",
    price: 11000,
    earlyBird: 9900,
    description: "Welcome drink, premium dinner buffet, unlimited bites",
    message: "Since your partner is from the same batch, they'll have their own ticket! 🎉",
  },
  NORMAL_SINGLE_LIQUOR_SAME_BATCH: {
    name: "Normal Single Person with Liquor",
    price: 12500,
    earlyBird: 11500,
    description: "Welcome drink, premium dinner buffet, unlimited bites, unlimited liquor",
    message: "Since your partner is from the same batch, they'll have their own ticket! 🎉",
  },
  COUPLE: {
    name: "Couple",
    price: 20000,
    earlyBird: 19000,
    description: "Welcome drink, premium dinner buffet, unlimited bites (for 2)",
    message: null,
  },
  COUPLE_LIQUOR: {
    name: "Couple with Liquor",
    price: 22000,
    earlyBird: 21000,
    description: "Welcome drink, premium dinner buffet, unlimited bites, unlimited liquor (for 2)",
    message: null,
  },
};

export const getTicketRecommendation = (drinks, hasPartner, partnerSameBatch, drinksWithPartner) => {
  // Logic based on questionnaire
  
  // Single, no drinking
  if (!drinks && !hasPartner) {
    return TICKET_TYPES.NORMAL_SINGLE;
  }
  
  // Single, with drinking
  if (drinks && !hasPartner) {
    return TICKET_TYPES.NORMAL_SINGLE_LIQUOR;
  }
  
  // Has partner, same batch, no drinking
  if (!drinks && hasPartner && partnerSameBatch) {
    return TICKET_TYPES.NORMAL_SINGLE_SAME_BATCH;
  }
  
  // Has partner, same batch, with drinking
  if (drinks && hasPartner && partnerSameBatch) {
    return TICKET_TYPES.NORMAL_SINGLE_LIQUOR_SAME_BATCH;
  }
  
  // Has partner, different batch, no drinking
  if (!drinks && hasPartner && !partnerSameBatch) {
    return TICKET_TYPES.COUPLE;
  }
  
  // Has partner, different batch, drinking but not with partner
  if (drinks && hasPartner && !partnerSameBatch && !drinksWithPartner) {
    return TICKET_TYPES.COUPLE;
  }
  
  // Has partner, different batch, drinking with partner
  if (drinks && hasPartner && !partnerSameBatch && drinksWithPartner) {
    return TICKET_TYPES.COUPLE_LIQUOR;
  }
  
  return TICKET_TYPES.NORMAL_SINGLE;
};

export const saveRecommendation = (drinks, hasPartner, partnerSameBatch, drinksWithPartner, recommendedTicket) => {
  const data = {
    drinks,
    hasPartner,
    partnerSameBatch,
    drinksWithPartner,
    recommendedTicket: recommendedTicket.name,
    message: recommendedTicket.message,
    timestamp: Date.now(),
  };
  
  localStorage.setItem("ticketRecommendation", JSON.stringify(data));
};

export const loadRecommendation = () => {
  const stored = localStorage.getItem("ticketRecommendation");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored recommendation", e);
      return null;
    }
  }
  return null;
};

export const clearRecommendation = () => {
  localStorage.removeItem("ticketRecommendation");
};
