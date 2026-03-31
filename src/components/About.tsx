import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-14 sm:py-20 bg-green-50"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">About Nawaz Dairy Farm</h2>
          <p className="text-sm sm:text-base text-green-700 mt-3">
            Trusted local dairy in Kanekal, serving fresh milk, ghee, paneer, and curd to Kanekal and Kalyandurg.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <motion.img
              src="/nawaz bottle.jpeg"
              alt="Nawaz Dairy Farm Products"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-xl"></div>
          </div>
          <div className="space-y-4 text-sm sm:text-base">
            <p className="text-green-800">At Nawaz Dairy Farm, cows are raised with care using natural feed and local practices. Everything is processed and delivered with an emphasis on hygiene and farm-to-home freshness.</p>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 h-5 w-5 text-green-600" />
                Farm-sourced milk, churned into pure ghee
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 h-5 w-5 text-green-600" />
                Handcrafted paneer and curd with no additives
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 h-5 w-5 text-green-600" />
                Daily quality checks and cold-chain support
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 h-5 w-5 text-green-600" />
                Eco-friendly and community-first approach
              </li>
            </ul>
            <p className="text-green-700">We maintain transparency from sourcing to packaging so your family enjoys real, wholesome dairy every day.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
