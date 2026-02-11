import { motion } from "framer-motion";
import { Settings } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Settings size={64} className="text-white" />
      </motion.div>
    </div>
  );
};

export default Loader;
