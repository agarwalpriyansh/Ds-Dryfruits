import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { apiService } from '../utils/apiConnector';

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [openFaq, setOpenFaq] = useState(0); // First FAQ item is open by default

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Add a default message for bulk order inquiries
      const contactData = {
        ...formData,
        message: `Bulk Order Inquiry - Subject: ${formData.subject || 'Wholesale Dry Fruits Inquiry'}`
      };
      
      const response = await apiService.sendContactMessage(contactData);
      if (response.data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: response.data.message || 'Your inquiry has been sent successfully!' 
        });
        // Reset form
        setFormData({
          name: '',
          mobile: '',
          email: '',
          subject: ''
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send inquiry. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-1">     
      {/* Main Content */}
      <div className="px-6 py-10 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl">
            Wholesale Dry Fruits
          </h1>

          {/* Descriptive Text */}
          <div className="space-y-2">
            <p className="text-gray-700 ">
              DS Dryfruits provides options to buy in bulk quantities. Our company is very popular in premium quality and best price products. We provide the best bulk/wholesale prices for dry fruits, nuts, seeds and alike products.
            </p>
            <p className="text-gray-700 ">
              DS Dryfruits is a platform where you get to choose from the best in market and offers you the finest variety of dry fruits. We offer dry fruits such as almonds, cashews, raisins, walnuts, dates and Pistachio. Exotic nuts such as Hazelnuts etc. We also offer a variety of berries such as cranberries, blueberries and seed mixes all of which are sourced and packed hygienically.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8">
            {/* Left Section - Call to Action */}
            <div className="bg-[#5e0404] text-white p-6 sm:p-8 lg:p-10 rounded-lg space-y-6">
              {/* Call to Action Text */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Let us get the
                </h2>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  business started!
                </h2>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Reach out us
                </h2>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  today.
                </h2>
              </div>

              {/* Follow Us Section */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Mobile Fields - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent"
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile No."
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email and Subject Fields - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email ID Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Id"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Message */}
                {submitStatus.message && (
                  <div
                    className={`p-4 rounded-md ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#7a1d14] hover:bg-[#5e0404]'
                  } text-white font-medium py-3 px-6 rounded-md transition-colors duration-200`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Now'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "Where can I buy bulk dry fruits in India?",
                  answer: "DS Dryfruits brings you a collection of carefully selected foods from India and across the world. Our products are well-loved for their quality and taste across categories - Dry Fruits, Chocolates, Gift Boxes and Spices. We are sure you will find our quality products appetizing."
                },
                {
                  question: "Does DS Dryfruits offer fair wholesale rates?",
                  answer: "Yes, DS Dryfruits offers competitive and fair wholesale rates for bulk orders. We provide the best bulk/wholesale prices for dry fruits, nuts, seeds and alike products. Contact us through the form above to get a customized quote for your bulk order requirements."
                },
                {
                  question: "Can I get dry fruits for cheap in bulk?",
                  answer: "Absolutely! DS Dryfruits specializes in providing the best bulk/wholesale prices for dry fruits. Our company is very popular for premium quality products at competitive prices. The more you order, the better rates we can offer. Reach out to us for a personalized quote."
                },
                {
                  question: "Do you have an offline store?",
                  answer: "Please contact us through the form above or reach out to us via phone or email to inquire about our physical store locations and visiting hours. We'll be happy to assist you with your bulk order needs."
                },
                {
                  question: "Are bulk orders delivered safely?",
                  answer: "Yes, all bulk orders are carefully packed and delivered safely. We ensure hygienic sourcing and packing of all our products. Our packaging is designed to maintain the freshness and quality of dry fruits during transit. We take great care to ensure your bulk order reaches you in perfect condition."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#7a1d14] flex items-center justify-center transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;

