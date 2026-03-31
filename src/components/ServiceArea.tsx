import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const ServiceArea = () => {
  const areas = [
    { name: 'Kanekal', description: 'Headquarter and main delivery region.', image: '/kanekal.jpg', icon: FaMapMarkerAlt },
    { name: 'Kalyandurg', description: 'Neighboring city with same-day delivery options.', image: '/kalyandurg.jpg', icon: FaTruck },
    { name: 'Rayadurgam', description: 'Rayadurgam area with delivery options.', image: '/Rayadurgam.jpg', icon: FaTruck },
  ];

  return (
    <motion.section
      id="service-area"
      className="py-14 sm:py-20 bg-white"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">Service Area</h2>
          <p className="text-sm sm:text-base text-green-700 mt-3">
            Our coverage around Kanekal and Kalyandurg for fresh dairy deliveries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {areas.map((area) => (
            <motion.div
              key={area.name}
              className="rounded-xl border border-green-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="relative h-56 w-full">
                <img
                  src={area.image}
                  alt={`${area.name} area`}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-green-900 flex items-center gap-2">
                  <area.icon className="h-5 w-5 text-green-700" />
                  {area.name}
                </h3>
                <p className="text-green-700 mt-2 text-sm sm:text-base">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceArea;
