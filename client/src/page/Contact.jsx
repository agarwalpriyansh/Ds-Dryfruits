import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { apiService } from '../utils/apiConnector';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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
      const response = await apiService.sendContactMessage(formData);
      if (response.data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: response.data.message || 'Your message has been sent successfully!' 
        });
        // Reset form
        setFormData({
          name: '',
          mobile: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again later.' 
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
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl">Get In Touch</h1>
          {/* Intro Text */}
          <div className=" space-y-2 max-w-3xl ">
            <p className="text-gray-700 text-base sm:text-lg">
              We are here to help our customers all over world. We would be happy to assist you.
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              So let us know what are your queries or what you are looking for, we will get back to you shortly
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Column - Contact Information */}
            <div className="bg-[#5e0404] text-white p-6 sm:p-8 lg:p-10 rounded-lg space-y-6 lg:col-span-2">
              {/* Contact Us Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <div className="flex gap-3 items-start">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm mb-1">Reach us on call/whatsapp</p>
                    <a href="tel:+917483600212" className="text-white hover:underline">
                      +91-9024675644
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Address Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Email Address</h3>
                <div className="flex gap-3 items-start">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                  <a href="mailto:info@dryfruithouse.com" className="text-white hover:underline break-all">
                    dryfruits.ds@gmail.com
                  </a>
                </div>
              </div>

              {/* Office Location Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Office Location</h3>
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">
                  329-330 Khatipura Road,Opposite Bank of Baroda, Jhotwara, Jaipur.
                  </p>
                </div>
              </div>

              {/* Follow Us Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
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

            {/* Right Column - Contact Form */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg border border-gray-200 shadow-sm lg:col-span-3">
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
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Write Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write Your Message"
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1d14] focus:border-transparent resize-none"
                  />
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
        </div>
      </div>
    </div>
  );
};

export default Contact;
