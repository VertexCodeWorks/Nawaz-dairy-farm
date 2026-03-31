import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const staggerContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Reveal({
  className,
  children,
  delay = 0,
  amount = 0.2,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

