'use client';

import { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import ContactModal from './contact';

export default function NavbarWrapper() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openContactModal = useCallback(() => setModalOpen(true), []);

  useEffect(() => {
    window.addEventListener('open-contact-modal', openContactModal);

    return () =>
      window.removeEventListener('open-contact-modal', openContactModal);
  }, [openContactModal]);

  return (
    <>
      <Navbar onOpenContact={openContactModal} />
      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
