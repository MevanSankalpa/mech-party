import Hero from "../components/Hero";
import HotelShowcase from "../components/HotelShowcase";
import Events from "../components/Events";
import Benefits from "../components/Benefits";
import Tickets from "../components/Tickets";
import TicketRecommendation from "../components/TicketRecommendation";

const Home = () => {
  return (
    <div className="bg-black">
      <Hero />
      <HotelShowcase />
      <Events />
      <Benefits />
      <Tickets />
      <TicketRecommendation />
    </div>
  );
};

export default Home;
