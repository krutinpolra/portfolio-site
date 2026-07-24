'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const navLinks = [
  { name: 'Home', href: '/', sectionId: 'hero' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Education', href: '#education', sectionId: 'education' },
  { name: 'Certifications', href: '#certifications', sectionId: 'certifications' },
  { name: 'Experience', href: '#experience', sectionId: 'experience' },
  { name: 'Skills', href: '#techstack', sectionId: 'techstack' },
  { name: 'Projects', href: '#projectsection', sectionId: 'projectsection' },
  { name: 'Resume', href: '/resume.pdf', external: true },
  { name: 'Contact', href: '#contact', modal: true },
];

const sectionLinks = navLinks.filter((link) => link.sectionId);

type NavbarProps = {
  onOpenContact: () => void;
};

export default function Navbar({ onOpenContact }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [activeHref, setActiveHref] = useState('/');
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    const contentEl = document.getElementById('page-content');
    if (contentEl) {
      contentEl.style.marginTop = menuOpen ? '400px' : '0px';
    }
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveHref('');
      setShowNav(true);
      return;
    }

    const initialHash = window.location.hash;
    if (initialHash === '#contact') {
      setActiveHref('#contact');
      onOpenContact();
      return;
    }

    const initialLink = sectionLinks.find(
      (link) => link.href === initialHash || (!initialHash && link.href === '/')
    );
    setActiveHref(initialLink?.href ?? '/');
  }, [onOpenContact, pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(!(currentScroll > lastScrollY.current && currentScroll > 100));
      lastScrollY.current = currentScroll;

      if (scrollFrame.current !== null) {
        return;
      }

      scrollFrame.current = window.requestAnimationFrame(() => {
        const currentSection = sectionLinks.reduce((active, link) => {
          if (!link.sectionId) return active;

          const section = document.getElementById(link.sectionId);
          if (!section) return active;

          const scrollPosition = window.scrollY + window.innerHeight * 0.35;
          return scrollPosition >= section.offsetTop ? link : active;
        }, sectionLinks[0]);

        if (currentSection) {
          setActiveHref(currentSection.href);

          const nextUrl =
            currentSection.href === '/'
              ? window.location.pathname
              : `${window.location.pathname}${currentSection.href}`;
          const currentUrl = `${window.location.pathname}${window.location.hash}`;

          if (currentUrl !== nextUrl) {
            window.history.replaceState(null, '', nextUrl);
          }
        }

        scrollFrame.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, [pathname]);

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string
  ) => {
    if (!sectionId) return;

    event.preventDefault();
    setMenuOpen(false);

    if (pathname !== '/') {
      window.location.href = href === '/' ? '/' : `/${href}`;
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    setActiveHref(href);
    window.history.pushState(
      null,
      '',
      href === '/' ? window.location.pathname : `${window.location.pathname}${href}`
    );

    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    setActiveHref('#contact');
    window.history.pushState(null, '', '#contact');
    onOpenContact();
  };

  const getLinkClassName = (href: string) =>
    `px-4 py-1.5 rounded-full transition-all duration-200 ${
      activeHref === href
        ? 'text-indigo-300 ring-1 ring-indigo-400/40 bg-white/5'
        : 'hover:text-indigo-300 hover:ring-1 hover:ring-indigo-400/40'
    }`;

  const getMobileLinkClassName = (href: string) =>
    `block transition ${
      activeHref === href ? 'text-indigo-400' : 'text-white hover:text-indigo-400'
    }`;

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4">
      <nav className="relative flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-lg font-bold text-indigo-400">Krutin.dev</h1>

        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <motion.ul
            animate={{ y: showNav ? 0 : -120 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex space-x-2 items-center text-sm font-medium text-white dark:text-gray-200 px-4 py-2 bg-black/40 dark:bg-white/10 border border-white/10 shadow-xl backdrop-blur-md rounded-full"
          >
            {navLinks.map(({ name, href, external, modal, sectionId }) => (
              <motion.li
                key={name}
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {modal ? (
                  <button onClick={handleContactClick} className={getLinkClassName(href)}>
                    {name}
                  </button>
                ) : external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full transition-all duration-200 hover:text-indigo-300 hover:ring-1 hover:ring-indigo-400/40"
                  >
                    {name}
                  </a>
                ) : (
                  <a
                    href={href}
                    onClick={(event) => handleSectionClick(event, href, sectionId)}
                    className={getLinkClassName(href)}
                  >
                    {name}
                  </a>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-8 flex flex-col justify-between items-center"
            aria-label="Toggle navigation"
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

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 w-full sm:w-3/4 max-h-fit bg-black dark:bg-zinc-900 shadow-lg p-6 pt-16 space-y-5 text-lg font-semibold z-40"
            >
              {navLinks.map(({ name, href, external, modal, sectionId }) => (
                <li key={name}>
                  {modal ? (
                    <button
                      onClick={handleContactClick}
                      className={getMobileLinkClassName(href)}
                    >
                      {name}
                    </button>
                  ) : external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="block text-white hover:text-indigo-400 transition"
                    >
                      {name}
                    </a>
                  ) : (
                    <a
                      href={href}
                      onClick={(event) => handleSectionClick(event, href, sectionId)}
                      className={getMobileLinkClassName(href)}
                    >
                      {name}
                    </a>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
