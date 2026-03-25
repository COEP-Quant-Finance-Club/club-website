import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-6 overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
          Thank You
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg mb-4">
          Your message has been successfully submitted.
        </p>

        <p className="text-gray-500 text-md mb-8 leading-relaxed">
          We appreciate you reaching out. Our team will review your message and respond as soon as possible.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition duration-300"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;