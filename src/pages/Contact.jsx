import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.', { icon: '✉️' });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
      
      {/* Header Section */}
      <div className="bg-primary dark:bg-gray-800 pt-24 pb-16 px-4 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-accent text-lg max-w-2xl mx-auto"
          >
            Have questions about planning your next trip? Our travel experts are here to help you every step of the way.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-black text-dark dark:text-white mb-6 tracking-tighter uppercase">Contact Information</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                Whether you're looking for technical support, travel advice, or just want to say hi, we're always happy to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-dark dark:text-white">Email Us</h3>
                  <p className="text-gray-500 dark:text-gray-400">support@travelwithus.com</p>
                  <p className="text-gray-500 dark:text-gray-400">hello@travelwithus.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-dark dark:text-white">Call Us</h3>
                  <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-500 dark:text-gray-400">Mon - Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-dark dark:text-white">Visit Our Office</h3>
                  <p className="text-gray-500 dark:text-gray-400">123 Travel Lane, Adventure City</p>
                  <p className="text-gray-500 dark:text-gray-400">New York, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 group cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 w-fit">
              <Globe className="w-6 h-6 text-primary dark:text-secondary group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-dark dark:text-white">www.travelwithus.com</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark dark:text-white mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark dark:text-white mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark dark:text-white mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white">
                  <option>General Inquiry</option>
                  <option>Trip Planning Support</option>
                  <option>Bug Report</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark dark:text-white mb-2">Message</label>
                <textarea 
                  rows="5"
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none dark:text-white"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-dark dark:bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
