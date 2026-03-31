import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaHome, FaBoxOpen, FaPhoneAlt, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import { GiCow } from 'react-icons/gi';
import { IoMdCall } from 'react-icons/io';

const Navbar = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll detection for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'products', 'about', 'service-area', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu
  };

  // WhatsApp order function
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent("Hello Nawaz Dairy Farm! I'd like to place an order.");
    window.open(`https://wa.me/919182879423?text=${message}`, '_blank');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Menu items configuration
  const menuItems = [
    { id: 'hero', label: 'Home', icon: <FaHome className="h-4 w-4" /> },
    { id: 'products', label: 'Products', icon: <FaBoxOpen className="h-4 w-4" /> },
    { id: 'about', label: 'About', icon: <FaInfoCircle className="h-4 w-4" /> },
    { id: 'contact', label: 'Contact', icon: <FaPhoneAlt className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:border-gray-700/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">

            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <a href="#hero" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    alt="Nawaz Dairy Farm"
                    className="h-12 w-12 lg:h-14 lg:w-14 rounded-full object-cover ring-2 ring-green-500/20 group-hover:ring-green-500/40 transition-all duration-300"
                  />
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <GiCow className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                    Nawaz Dairy Farm
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Fresh from Farm to Home
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded bg-green-500 origin-left"
                    initial={false}
                    animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">

              {/* FSSAI (minimal) */}
              <div className="hidden xl:flex items-center gap-2 rounded-full bg-green-50 text-green-900 border border-green-200 px-3 py-1 text-xs font-semibold">
                <FaShieldAlt className="h-4 w-4 text-green-700" />
                FSSAI Certified
              </div>

              {/* WhatsApp CTA Button */}
              <motion.button
                onClick={handleWhatsAppOrder}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <IoMdCall className="h-4 w-4" />
                <span className="hidden md:inline">Order on WhatsApp</span>
                <span className="md:hidden">Order</span>
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FaSun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <FaMoon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FaBars className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 bg-white dark:bg-gray-900 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.jpg"
                      alt="Nawaz Dairy Farm"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">
                      Nawaz Dairy Farm
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FaTimes className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-2 mb-8">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-5 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Mobile WhatsApp CTA */}
                <motion.button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg text-base"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <IoMdCall className="h-5 w-5" />
                  Order on WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
