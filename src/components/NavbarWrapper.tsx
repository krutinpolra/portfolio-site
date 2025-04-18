'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import ContactModal from './contact';

export default function NavbarWrapper() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
