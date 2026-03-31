import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Products from './components/Products';
import About from './components/About';
import ServiceArea from './components/ServiceArea';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App = () => {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Trust />
        <Products />
        <About />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </motion.div>
  );
};

export default App;
