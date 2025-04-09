'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
  { name: 'Resume', href: '/resume' },
];

export default function Navbar() {
  
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  
  useEffect(() => {
    const contentEl = document.getElementById('page-content');
    if (contentEl) {
      contentEl.style.marginTop = menuOpen ? '400px' : '0px';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 100) {
        setShowNav(false); // Scroll Down → Hide
      } else {
        setShowNav(true); // Scroll Up → Show
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4">
      <nav className="relative flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-lg font-bold text-indigo-400">Krutin.dev</h1>

        {/* Desktop Pill Nav */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
        <motion.ul
          animate={{ y: showNav ? 0 : -120 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex space-x-2 items-center text-sm font-medium text-white dark:text-gray-200 px-4 py-2 bg-black/40 dark:bg-white/10 border border-white/10 shadow-xl backdrop-blur-md rounded-full"
        >
          {navLinks.map(({ name, href }) => (
            <motion.li
              key={name}
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={href}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  pathname === href
                    ? 'text-indigo-400 font-semibold'
                    : 'hover:text-indigo-300 hover:ring-1 hover:ring-indigo-400/40'
                }`}
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-8 flex flex-col justify-between items-center"
          >
            <span
              className={`h-1 w-full bg-indigo-400 rounded transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}
            />
            <span
              className={`h-1 w-full bg-indigo-400 rounded transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-1 w-full bg-indigo-400 rounded transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Slide-In Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 w-full sm:w-3/4 max-h-fit bg-black dark:bg-zinc-900 shadow-lg p-6 pt-16 space-y-5 text-lg font-semibold z-40"
            >
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-indigo-400 transition ${
                      pathname === href ? 'text-indigo-400' : ''
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
