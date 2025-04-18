'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#11111a] rounded-xl shadow-2xl max-w-lg w-full p-6 text-white relative"
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Icons */}
            <div className="flex justify-center gap-6 mb-4 text-2xl text-indigo-400">
              <a href="https://linkedin.com/in/krutinpolra1444" target="_blank">
                <FaLinkedin />
              </a>
              <a href="https://github.com/krutinpolra" target="_blank">
                <FaGithub />
              </a>
            </div>
            Email me at:
            <div className="flex gap-4 justify-between mb-4">
              <div className="flex items-center gap-2 bg-[#1b1b2a] px-4 py-2 rounded-lg w-full">
                <FiMail />
                <span className="text-sm">krutinpolra1444@gmail.com</span>
              </div>
              {/* <a
                href="https://cal.com/YOUR-CAL-LINK"
                target="_blank"
                className="flex items-center gap-2 bg-[#1b1b2a] px-4 py-2 rounded-lg"
              >
                <FiCalendar /> Book a Call
              </a> */}
            </div>
            <div className="text-center text-sm text-gray-400 mb-2">
              Or send a message
            </div>
            <form
              onSubmit={async e => {
                e.preventDefault();
                await fetch('/api/send-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });
                onClose();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                required
                placeholder="Your name"
                className="bg-[#1b1b2a] p-3 rounded-lg outline-none"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                required
                placeholder="Your email"
                className="bg-[#1b1b2a] p-3 rounded-lg outline-none"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Your message"
                className="bg-[#1b1b2a] p-3 rounded-lg h-24 outline-none"
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
