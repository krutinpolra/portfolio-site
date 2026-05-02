'use client';

import { useCallback, useState } from 'react';
import Navbar from './Navbar';
import ContactModal from './contact';

export default function NavbarWrapper() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openContactModal = useCallback(() => setModalOpen(true), []);

  return (
    <>
      <Navbar onOpenContact={openContactModal} />
      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
