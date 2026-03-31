import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaCheese, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { FaLeaf, FaPercent, FaPhoneAlt, FaTruck } from 'react-icons/fa';
import { GiButter, GiCow, GiDropletSplash, GiMilkCarton } from 'react-icons/gi';
import { staggerContainerVariants, staggerItemVariants } from './motion/Reveal';

// Type definitions for products
type ProductId = 'standardMilk' | 'fullCreamMilk' | 'ghee' | 'paneer' | 'curd';

interface Product {
  id: ProductId;
  name: string;
  image: string;
  price: string;
  unit: string;
  icon: IconType;
}

// Product catalog
const products: Product[] = [
  {
    id: 'standardMilk',
    name: 'Standard Milk',
    image: '/milk.jpeg',
    price: '₹65/liter',
    unit: 'liter',
    icon: GiMilkCarton,
  },
  {
    id: 'fullCreamMilk',
    name: 'Full Cream Milk',
    image: '/milk.jpeg',
    price: '₹85/liter',
    unit: 'liter',
    icon: GiMilkCarton,
  },
  {
    id: 'ghee',
    name: 'Pure Ghee',
    image: '/ghee.jpeg',
    price: '₹1300/kg',
    unit: 'kg',
    icon: GiButter,
  },
  {
    id: 'paneer',
    name: 'Fresh Paneer',
    image: '/paneer.jpeg',
    price: '₹1000/kg',
    unit: 'kg',
    icon: FaCheese,
  },
  {
    id: 'curd',
    name: 'Homemade Curd',
    image: '/curd.jpeg',
    price: '₹100/liter',
    unit: 'liter',
    icon: GiDropletSplash,
  },
];

// WhatsApp contact number (without + sign)
const WHATSAPP_NUMBER = '919182879423';

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  location: string;
}

const Products = () => {
  // State management for product quantities
  const [quantities, setQuantities] = useState<Record<ProductId, number>>({
    standardMilk: 0,
    fullCreamMilk: 0,
    ghee: 0,
    paneer: 0,
    curd: 0,
  });

  // State management for customer details
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    location: '',
  });

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Location states for geolocation feature
  const [locationUrl, setLocationUrl] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Subscription state
  const [subscription, setSubscription] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    months: 1,
    isFirstTimeCustomer: true,
  });
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [isSubscriptionProcessing, setIsSubscriptionProcessing] = useState(false);

  // Base price for milk subscription (placeholder)
  const MILK_BASE_PRICE = 65; // ₹65 per liter (standard milk)
  const DAYS_PER_MONTH = 30;

  // Compute if user has selected at least one product
  const hasSelection = useMemo(
    () => Object.values(quantities).some((qty) => qty > 0),
    [quantities]
  );

  // Subscription calculations
  const originalTotal = useMemo(
    () => subscription.quantity * DAYS_PER_MONTH * subscription.months * MILK_BASE_PRICE,
    [subscription.quantity, subscription.months]
  );
  const isDiscountEligible = subscription.months >= 3;
  const discount = useMemo(() => (isDiscountEligible ? originalTotal * 0.05 : 0), [originalTotal, isDiscountEligible]);
  const finalTotal = useMemo(() => originalTotal - discount, [originalTotal, discount]);
  const hasFirstTimeFreeProductsOffer = subscription.isFirstTimeCustomer && subscription.months <= 2;

  /**
   * Adjust quantity for a product
   * @param id Product ID
   * @param delta Change amount (+1 or -1)
   */
  const handleAdjust = (id: ProductId, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  /**
   * Validate customer details and product selection
   * @returns true if all validations pass
   */
  const validate = (): boolean => {
    // Check if required fields are filled
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.location.trim()
    ) {
      setError('Please fill all required fields (Name, Phone, Address, Location).');
      return false;
    }

    // Validate phone number format (10 digits)
    if (!/^[0-9]{10}$/.test(customer.phone.trim())) {
      setError('Phone number must be 10 digits.');
      return false;
    }

    // Check if at least one product is selected
    if (!hasSelection) {
      setError('Please select at least one product.');
      return false;
    }

    setError('');
    return true;
  };

  /**
   * Validate subscription details
   * @returns true if all validations pass
   */
  const validateSubscription = (): boolean => {
    if (
      !subscription.name.trim() ||
      !subscription.phone.trim() ||
      !subscription.address.trim()
    ) {
      setSubscriptionError('Please fill all required fields (Name, Phone, Address).');
      return false;
    }

    if (!/^[0-9]{10}$/.test(subscription.phone.trim())) {
      setSubscriptionError('Phone number must be 10 digits.');
      return false;
    }

    if (subscription.quantity <= 0) {
      setSubscriptionError('Quantity must be at least 1 liter.');
      return false;
    }

    if (subscription.months < 1 || subscription.months > 5) {
      setSubscriptionError('Please select subscription months (1 to 5).');
      return false;
    }

    setSubscriptionError('');
    return true;
  };

  /**
   * Fetch current location using browser geolocation API.
   * Stores Google Maps link in state and handles permission errors.
   */
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not available in your browser.');
      return;
    }

    setFetchingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationUrl(link);
        setFetchingLocation(false);
        setLocationError('');
      },
      (error) => {
        setFetchingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please allow access.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError('Location unavailable. Try again later.');
        } else {
          setLocationError('Error fetching location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 300000 }
    );
  };

  /**
   * Handle form submission and send order to WhatsApp
   * - Prevents default form behavior
   * - Validates all inputs
   * - Constructs formatted message
   * - Encodes URL and opens WhatsApp
   */
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form reload

    if (!validate()) return;

    // Build order details string with proper formatting
    const orderDetails = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return `${product?.name} - ${qty} ${product?.unit}`;
      })
      .join('\n');

    // Determine final location (Geolocation link wins over manual location)
    const locationText = locationUrl || customer.location || 'Not provided';

    // Construct the complete message in the required format
    const message = `Hello Nawaz Dairy Farm, I would like to place an order:

Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
Location: ${locationText}

Order Details:
${orderDetails}`;

    // Encode message for URL (handles special characters and spaces)
    const encodedMessage = encodeURIComponent(message);

    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show processing state
    setIsProcessing(true);

    // Add small delay for better UX, then open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      
      // Reset form after successful submission
      setQuantities({ standardMilk: 0, fullCreamMilk: 0, ghee: 0, paneer: 0, curd: 0 });
      setCustomer({ name: '', phone: '', address: '', location: '' });
      setShowForm(false);
      setIsProcessing(false);
    }, 300);
  };

  /**
   * Handle subscription submission and send to WhatsApp
   */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSubscription()) return;

    // Determine final location (Geolocation link wins over manual location)
    const locationText = locationUrl || 'Not provided';

    const offerLine = hasFirstTimeFreeProductsOffer
      ? 'Offer: First-time customer free products (for 1–2 month plan)'
      : isDiscountEligible
        ? 'Offer: 5% discount (for 3+ month plan)'
        : 'Offer: None';

    const message = `Hello Nawaz Dairy Farm,

I want to subscribe for monthly milk delivery:

Name: ${subscription.name}
Phone: ${subscription.phone}
Address: ${subscription.address}
Location: ${locationText}

Milk Quantity per day: ${subscription.quantity} liters
Subscription: ${subscription.months} month(s)
${offerLine}

Total Price: ₹${originalTotal}
Discount: ₹${discount}
Final Price: ₹${finalTotal}

Please confirm my subscription.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setIsSubscriptionProcessing(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubscription({ name: '', phone: '', address: '', quantity: 1, months: 1, isFirstTimeCustomer: true });
      setShowSubscriptionForm(false);
      setIsSubscriptionProcessing(false);
    }, 300);
  };

  return (
    <motion.section
      id="products"
      className="py-14 sm:py-20 bg-white"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">Our Products</h2>
          <p className="text-sm sm:text-base text-green-700">Select your products and order via WhatsApp</p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <motion.article
              key={product.id}
              className="bg-green-50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition p-4"
              variants={staggerItemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Product Image */}
              <div className="relative h-44 sm:h-52 w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>

              {/* Product Name and Price */}
              <h3 className="text-xl font-bold text-green-900 mb-1 flex items-center gap-2">
                <Icon className="h-5 w-5 text-green-700" />
                {product.name}
              </h3>
              <p className="text-green-700 mb-4">{product.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Decrease Button */}
                  <button
                    onClick={() => handleAdjust(product.id, -1)}
                    className="px-3 py-2 min-h-[44px] rounded border border-green-300 text-green-800 hover:bg-green-200 transition"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  {/* Quantity Display */}
                  <span className="font-semibold text-green-900 w-8 text-center">
                    {quantities[product.id]}
                  </span>

                  {/* Increase Button */}
                  <button
                    onClick={() => handleAdjust(product.id, 1)}
                    className="px-3 py-2 min-h-[44px] rounded border border-green-300 text-green-800 hover:bg-green-200 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-green-600">{product.unit}</span>
              </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Order Button and Error Messages */}
        <div className="mt-10 text-center">
          <motion.button
            onClick={() => setShowForm(true)}
            disabled={!hasSelection}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-3 min-h-[44px] rounded-lg font-semibold transition duration-200 w-full sm:w-auto ${
              hasSelection
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Order on WhatsApp
          </motion.button>
          {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>

        {/* Milk Subscription Section */}
        <div className="mt-16 text-center">
          <div className="bg-green-50 rounded-xl shadow-lg p-5 sm:p-8 max-w-2xl mx-auto relative overflow-hidden">
            {/* Offer badge */}
            <motion.div
              className="sm:absolute sm:top-4 sm:right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm mb-3 sm:mb-0 inline-block"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.06, 1], opacity: [1, 0.95, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              5% OFF
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3">Monthly Milk Subscription 🥛</h3>
            <p className="text-sm sm:text-base text-green-700 mb-6">
              Fresh milk delivered daily with special offers based on your plan duration.
            </p>
            <ul className="text-left text-green-800 mb-6 space-y-2 text-sm sm:text-base">
              <li>🎁 1–2 months: Free products for first-time customers (first order)</li>
              <li>🏷️ 3+ months: 5% discount on milk subscription</li>
              <li>✅ Daily fresh delivery</li>
              <li>✅ Hassle-free service</li>
            </ul>
            <motion.button
              onClick={() => setShowSubscriptionForm(true)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg min-h-[44px] font-semibold hover:bg-green-700 transition duration-200 w-full sm:w-auto"
            >
              Subscribe Now
            </motion.button>
            {subscriptionError && <p className="mt-4 text-red-600 font-semibold">{subscriptionError}</p>}
          </div>
        </div>

        {/* Modal Form for Order Details */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-h-[85vh] overflow-y-auto">
              {/* Modal Header */}
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                Enter Your Details
              </h3>

              {/* Form Fields */}
              <form onSubmit={handleSubmitOrder} className="space-y-3">
                {/* Name Field */}
                <label className="block text-sm font-semibold text-green-900">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                />

                {/* Phone Field */}
                <label className="block text-sm font-semibold text-green-900">
                  Phone Number (10 digits) *
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits) *"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                    }))
                  }
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                />

                {/* Address Field */}
                <label className="block text-sm font-semibold text-green-900">
                  Delivery Address *
                </label>
                <textarea
                  placeholder="Delivery Address *"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer((prev) => ({ ...prev, address: e.target.value }))
                  }
                  rows={3}
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md resize-none transition-shadow"
                  required
                />

                {/* Location Field */}
                <label className="block text-sm font-semibold text-green-900">
                  Select Location *
                </label>
                <select
                  value={customer.location}
                  onChange={(e) =>
                    setCustomer((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                >
                  <option value="">Select Location *</option>
                  <option value="Kanekal">Kanekal</option>
                  <option value="Kalyandurg">Kalyandurg</option>
                  <option value="Kalyandurg">Rayadurgam</option>
                </select>

                {/* Geolocation Button */}
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    disabled={fetchingLocation}
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-300"
                  >
                    {fetchingLocation ? 'Fetching location...' : 'Get Current Location'}
                  </button>
                  {locationUrl && (
                    <p className="text-green-700 text-sm">
                      Location captured ✅ {' '}
                      <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        View on map
                      </a>
                    </p>
                  )}
                  {locationError && <p className="text-red-600 text-sm">{locationError}</p>}
                </div>

                {/* Order Summary */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">Order Summary</h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    {Object.entries(quantities)
                      .filter(([, qty]) => qty > 0)
                      .map(([id, qty]) => {
                        const product = products.find((p) => p.id === id);
                        return (
                          <li key={id} className="flex justify-between">
                            <span>{product?.name}:</span>
                            <span className="font-semibold">
                              {qty} {product?.unit}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3 sticky bottom-0 bg-white/95 backdrop-blur pt-3 pb-3 z-10">
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-600 text-white p-3 min-h-[44px] rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400"
                  >
                    {isProcessing ? 'Processing...' : 'Send to WhatsApp'}
                  </motion.button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-green-300 text-green-700 p-3 min-h-[44px] rounded-lg hover:bg-green-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Form for Subscription */}
        {showSubscriptionForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-6 md:p-10 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 md:p-8 shadow-xl max-h-[85vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Subscribe to Monthly Milk</h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <label className="block text-sm font-semibold text-green-900">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={subscription.name}
                  onChange={(e) => setSubscription((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                />
                <label className="block text-sm font-semibold text-green-900">
                  Phone Number (10 digits) *
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits) *"
                  value={subscription.phone}
                  onChange={(e) => setSubscription((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                />
                <label className="block text-sm font-semibold text-green-900">
                  Delivery Address *
                </label>
                <textarea
                  placeholder="Delivery Address *"
                  value={subscription.address}
                  onChange={(e) => setSubscription((prev) => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md resize-none transition-shadow"
                  required
                />
                <label className="flex items-center gap-3 rounded-lg border border-green-200 p-3">
                  <input
                    type="checkbox"
                    checked={subscription.isFirstTimeCustomer}
                    onChange={(e) => setSubscription((prev) => ({ ...prev, isFirstTimeCustomer: e.target.checked }))}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span className="text-green-900 font-medium">First time customer</span>
                </label>
                {/* Geolocation Button */}
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    disabled={fetchingLocation}
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-300"
                  >
                    {fetchingLocation ? 'Fetching location...' : 'Get Current Location'}
                  </button>
                  {locationUrl && (
                    <p className="text-green-700 text-sm">
                      Location captured ✅ {' '}
                      <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        View on map
                      </a>
                    </p>
                  )}
                  {locationError && <p className="text-red-600 text-sm">{locationError}</p>}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-green-900">
                    Daily Milk Quantity (liters) *
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={1}
                    max={5}
                    step={1}
                    value={subscription.quantity}
                    onChange={(e) => {
                      const next = parseInt(e.target.value);
                      setSubscription((prev) => ({
                        ...prev,
                        quantity: Number.isFinite(next) ? Math.min(5, Math.max(1, next)) : prev.quantity,
                      }));
                    }}
                    className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                    required
                  />
                </div>
                <label className="block text-sm font-semibold text-green-900">
                  Subscription Plan (months) *
                </label>
                <select
                  value={subscription.months}
                  onChange={(e) => setSubscription((prev) => ({ ...prev, months: parseInt(e.target.value) }))}
                  className="w-full border border-green-200 rounded p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/30 focus:shadow-md transition-shadow"
                  required
                >
                  <option value="">Select number of months *</option>
                  <option value={1}>1 month</option>
                  <option value={2}>2 months</option>
                  <option value={3}>3 months</option>
                  <option value={4}>4 months</option>
                  <option value={5}>5 months</option>
                </select>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h4 className="font-bold text-green-900">Price Summary</h4>
                    {isDiscountEligible ? (
                      <motion.div
                        className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.07, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      >
                        <FaPercent className="h-4 w-4" />
                        5% OFF
                      </motion.div>
                    ) : hasFirstTimeFreeProductsOffer ? (
                      <motion.div
                        className="inline-flex items-center gap-2 bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.07, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      >
                        🎁 Free
                      </motion.div>
                    ) : null}
                  </div>

                  <div className="text-sm text-green-800 space-y-1">
                    <p>
                      Original Price:{' '}
                      <motion.span
                        key={`original-${originalTotal}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-semibold text-green-900"
                      >
                        ₹{originalTotal}
                      </motion.span>
                    </p>

                    {hasFirstTimeFreeProductsOffer ? (
                      <p className="font-semibold text-green-900/90">
                        Offer: Free products for first-time customer (1–2 months)
                      </p>
                    ) : isDiscountEligible ? (
                      <p>
                        Discount (5%):{' '}
                        <motion.span
                          key={`discount-${discount}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="font-semibold text-green-900"
                        >
                          ₹{discount}
                        </motion.span>
                      </p>
                    ) : (
                      <p>Discount: ₹0</p>
                    )}

                    <p>
                      Final Price:{' '}
                      <motion.span
                        key={`final-${finalTotal}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-semibold text-green-900"
                      >
                        ₹{finalTotal}
                      </motion.span>
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-3 sticky bottom-0 bg-white/95 backdrop-blur pt-3 pb-3 z-10">
                  <motion.button
                    type="submit"
                    disabled={isSubscriptionProcessing}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 min-h-[44px]"
                  >
                    {isSubscriptionProcessing ? 'Processing...' : 'Subscribe via WhatsApp'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowSubscriptionForm(false)}
                    className="flex-1 border border-green-300 text-green-700 p-3 rounded-lg hover:bg-green-50 transition font-semibold min-h-[44px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Products;
