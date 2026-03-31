import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import { staggerContainerVariants, staggerItemVariants } from './motion/Reveal';

const trustItems = [
  { icon: FaShieldAlt, title: 'FSSAI Certified', desc: 'Government registered and certified dairy farm.' },
  { icon: GiMilkCarton, title: '100% Pure Milk', desc: 'Fresh milk delivered daily from our farm.' },
  { icon: FaCheckCircle, title: 'No Chemicals', desc: 'Hygienic processing with a quality-first approach.' },
  { icon: FaCheckCircle, title: 'Local Farm Fresh', desc: 'Trusted locally in Kanekal, Rayadurgam & Kalyandurg.' },
];

const Trust = () => {
  return (
    <motion.section
      id="trust"
      className="py-12 sm:py-16 bg-white"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">Why Choose Us?</h2>
          <p className="mt-2 text-sm sm:text-base text-green-700">Trusted, certified, and farm-fresh dairy you can rely on.</p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={staggerItemVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="rounded-2xl border border-green-100 bg-green-50 p-5 sm:p-6 shadow-sm hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-white border border-green-200 p-3 mb-4">
                  <Icon className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-green-900">{item.title}</h3>
                <p className="mt-2 text-sm text-green-700">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Trust;

