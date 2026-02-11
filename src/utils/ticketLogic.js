// Ticket recommendation logic based on user preferences

export const TICKET_TYPES = {
  NORMAL_SINGLE: {
    name: "Normal Single Person",
    price: 11000,
    earlyBird: 9900,
    description: "Welcome drink, premium dinner buffet, unlimited bites",
  },
  NORMAL_SINGLE_LIQUOR: {
    name: "Normal Single Person with Liquor",
    price: 12500,
    earlyBird: 11500,
    description: "Welcome drink, premium dinner buffet, unlimited bites, unlimited liquor",
  },
  COUPLE: {
    name: "Couple",
    price: 20000,
    earlyBird: 19000,
    description: "Welcome drink, premium dinner buffet, unlimited bites (for 2)",
  },
  COUPLE_LIQUOR: {
    name: "Couple with Liquor",
    price: 22000,
    earlyBird: 21000,
    description: "Welcome drink, premium dinner buffet, unlimited bites, unlimited liquor (for 2)",
  },
};

export const getTicketRecommendation = (drinks, hasPartner, drinksWithPartner) => {
  // Logic based on questionnaire
  if (!drinks && !hasPartner) {
    return TICKET_TYPES.NORMAL_SINGLE;
  }
  
  if (drinks && !hasPartner) {
    return TICKET_TYPES.NORMAL_SINGLE_LIQUOR;
  }
  
  if (!drinks && hasPartner) {
    return TICKET_TYPES.COUPLE;
  }
  
  if (drinks && hasPartner && !drinksWithPartner) {
    return TICKET_TYPES.COUPLE;
  }
  
  if (drinks && hasPartner && drinksWithPartner) {
    return TICKET_TYPES.COUPLE_LIQUOR;
  }
  
  return TICKET_TYPES.NORMAL_SINGLE;
};

export const saveRecommendation = (drinks, hasPartner, drinksWithPartner, recommendedTicket) => {
  const data = {
    drinks,
    hasPartner,
    drinksWithPartner,
    recommendedTicket: recommendedTicket.name,
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
