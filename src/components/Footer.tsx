import { motion } from 'framer-motion';
import { GiCow } from 'react-icons/gi';
import { FaShieldAlt } from 'react-icons/fa';
import { FSSAI_LICENSE_NUMBER } from './FssaiBadge';

const Footer = () => {
  return (
    <motion.footer
      className="bg-green-900 text-green-100 py-6 sm:py-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-0">
        <p className="text-lg font-semibold inline-flex items-center justify-center gap-2">
          <GiCow className="h-5 w-5 text-green-200" />
          Nawaz Dairy Farm
        </p>
        <p className="text-sm">Fresh from Farm to Home • Kanekal, Andhra Pradesh</p>
        <p className="mt-3 text-sm font-semibold inline-flex flex-wrap items-center justify-center gap-2 text-green-100">
          <FaShieldAlt className="h-4 w-4 text-green-200" />
          Government Registered & Certified Dairy Farm
        </p>
        <p className="mt-1 text-xs sm:text-sm text-green-200">
          FSSAI License No: {FSSAI_LICENSE_NUMBER}
        </p>
        <p className="mt-2 text-xs text-green-200">© 2026 Nawaz Dairy Farm. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
