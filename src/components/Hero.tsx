import { motion } from 'framer-motion';
import { FaLeaf, FaTruck } from 'react-icons/fa';
import { GiCow, GiMilkCarton } from 'react-icons/gi';
import { staggerContainerVariants, staggerItemVariants } from './motion/Reveal';
import { FssaiBadge } from './FssaiBadge';

const badgeData = [
  { icon: <GiMilkCarton className="h-5 w-5 text-green-300" />, label: 'Pure Milk' },
  { icon: <GiCow className="h-5 w-5 text-green-300" />, label: 'Healthy Cows' },
  { icon: <FaTruck className="h-5 w-5 text-green-300" />, label: 'Daily Delivery' },
  { icon: <FaLeaf className="h-5 w-5 text-green-300" />, label: 'No Chemicals' },
];

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-[url('/farm.jpg')] bg-cover bg-center min-h-[80vh] sm:min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-900/50 to-green-900/90"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex items-center justify-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Fresh Farm Milk Delivered Daily
            </motion.h1>

            <div className="flex justify-center">
              <FssaiBadge className="mt-2" size="sm" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="space-y-2"
            >
              <p className="text-base sm:text-lg md:text-xl text-green-100">
                Pure Buffalo & Cow Milk, Ghee, Paneer & Curd
              </p>
              <p className="text-sm sm:text-base text-green-200">
                Direct from our farm in Kanekal
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 place-items-center mx-auto"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {badgeData.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  variants={staggerItemVariants}
                  className="flex items-center gap-2 bg-white/20 border border-white/25 hover:bg-green-100/20 hover:border-green-300/60 hover:shadow-lg rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="text-lg text-green-300">
                    {badge.icon}
                  </span>
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto"
            >
              <motion.button
                onClick={scrollToProducts}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#25D366] hover:bg-[#20b85c] text-white px-6 py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Order Now on WhatsApp
              </motion.button>
              <motion.button
                onClick={() => window.location.href = 'https://wa.me/919182879423?text=' + encodeURIComponent('Hello Nawaz Dairy Farm, I would like to order milk.')}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Contact via WhatsApp
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

