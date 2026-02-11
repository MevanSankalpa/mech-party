import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PurchaseForm from "./pages/PurchaseForm";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router basename="/mech-party">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<PurchaseForm />} />
      </Routes>
    </Router>
  );
}

export default App;

