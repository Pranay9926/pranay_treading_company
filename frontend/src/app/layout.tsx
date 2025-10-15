import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/CartContext';


const inter = Inter({ subsets: ['latin'] }) // Use Inter font

export const metadata: Metadata = {
  title: 'Pranay Treading Co. Online',
  description: 'Your source for quality security and everyday shoes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter font class */}
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          {/* Add padding top/bottom (py) and left/right (px) */}
          <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
