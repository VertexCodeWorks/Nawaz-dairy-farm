import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919182879423';

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative inline-flex items-center justify-center rounded-full bg-green-600 text-white shadow-xl w-14 h-14 sm:w-14 sm:h-14 border border-white/30">
        <FaWhatsapp className="h-7 w-7" />
      </span>
    </motion.a>
  );
}

