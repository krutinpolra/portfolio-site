// src/app/layout.tsx
import '../styles/globals.css';
import NavbarWrapper from '@/components/NavbarWrapper';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title: 'Krutin | Portfolio',
  description: 'Full-stack developer portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <NavbarWrapper />
        <main
          id="page-content"
          className="transition-all duration-500 ease-in-out"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
