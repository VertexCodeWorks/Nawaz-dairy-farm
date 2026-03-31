import { motion } from 'framer-motion';
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="py-14 sm:py-20 bg-green-50"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">Contact Us</h2>
          <p className="text-sm sm:text-base text-green-700 mt-3">Talk to us or find our location on Google Maps.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <motion.div
              className="rounded-xl p-6 bg-white border border-green-100 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="h-6 w-6 text-green-700" />
                Farm Location
              </h3>
              <p className="text-green-700 text-sm sm:text-base">Kanekal, Andhra Pradesh</p>
            </motion.div>
            <motion.div
              className="rounded-xl p-6 bg-white border border-green-100 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2 flex items-center gap-2">
                <FaWhatsapp className="h-6 w-6 text-green-700" />
                WhatsApp Order
              </h3>
              <motion.a
                href="https://wa.me/919182879423"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-green-700 hover:text-green-900 inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaPhoneAlt className="h-4 w-4" />
                +91 91828 79423
              </motion.a>
            </motion.div>
            <motion.div
              className="rounded-xl p-6 bg-white border border-green-100 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2">Areas Served</h3>
              <p className="text-green-700 text-sm sm:text-base">Kanekal & Kalyandurg</p>
            </motion.div>
            <motion.div
              className="rounded-xl p-6 bg-white border border-green-100 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2 flex items-center gap-2">
                <FaInstagram className="h-6 w-6 text-green-700" />
                Instagram
              </h3>
              <motion.a
                href="https://www.instagram.com/nawaz_dairy_farm/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-green-700 hover:text-green-900 flex items-center gap-2 transition text-sm sm:text-base"
              >
                <span>@nawaz_dairy_farm</span>
              </motion.a>
            </motion.div>
          </div>
          <div className="rounded-xl overflow-hidden border border-green-100 shadow-sm">
            <iframe
              title="Nawaz Dairy Farm Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.965!2d76.9709846!3d14.7775691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb7313627869743%3A0x240f814fd5682834!2sNawaz%20Dairy%20Farm!5e0!3m2!1sen!2sin!4v1703068473!5m2!1sen!2sin"
              className="h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="p-4 bg-white">
              <motion.a
                href="https://www.google.com/maps/place/NawazDairyFarm/@14.77992,76.9590689,15.17z/data=!4m7!3m6!1s0x3bb7313627869743:0x240f814fd5682834!4b1!8m2!3d14.7775691!4d76.9709846!16s%2Fg%2F11vphzvpty?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition min-h-[44px]"
              >
                Open Google Maps Link
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
