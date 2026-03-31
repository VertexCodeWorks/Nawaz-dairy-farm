import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

export const FSSAI_LICENSE_NUMBER = '10126013000084';

export function FssaiBadge({
  showLicense = true,
  size = 'md',
  className,
}: {
  showLicense?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const pad = size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2';
  const text1 = size === 'sm' ? 'text-xs' : 'text-sm';
  const text2 = size === 'sm' ? 'text-[11px]' : 'text-xs';
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <motion.div
      className={[
        'inline-flex items-center gap-3 rounded-full border border-green-200/60',
        'bg-white/90 text-green-900 shadow-sm backdrop-blur',
        pad,
        className ?? '',
      ].join(' ')}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ boxShadow: ['0 0 0 rgba(34,197,94,0)', '0 0 18px rgba(34,197,94,0.22)', '0 0 0 rgba(34,197,94,0)'] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <span className="inline-flex items-center justify-center rounded-full bg-green-600 text-white p-2">
        <FaShieldAlt className={icon} />
      </span>

      <span className="text-left leading-tight">
        <span className={`flex items-center gap-2 font-semibold ${text1}`}>
          FSSAI Certified <FaCheckCircle className="h-4 w-4 text-green-600" />
        </span>
        {showLicense && (
          <span className={`block font-medium text-green-800/90 ${text2}`}>
            License No: {FSSAI_LICENSE_NUMBER}
          </span>
        )}
      </span>
    </motion.div>
  );
}

