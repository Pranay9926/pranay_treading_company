
'use client'; // Make header a client component to use context

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Import Badge
import { Package2, ShoppingCart, Menu } from 'lucide-react'; // Add Menu icon
import { useCart } from '@/context/CartContext'; // Import useCart hook
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Import Sheet components

export default function Header() {
  const { getCartItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false); // State to track client-side mounting
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for mobile menu sheet

  useEffect(() => {
    setIsClient(true); // Component has mounted on the client
  }, []);

  useEffect(() => {
    // Only update itemCount on the client side after mounting
    if (isClient) {
      setItemCount(getCartItemCount());
    }
  }, [getCartItemCount, isClient]); // Rerun when cart count changes or client status changes

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/shipping", label: "Shipping" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold">
          <Package2 className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>Pranay Treading Co.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
           {/* Cart Icon and Badge - Desktop */}
           <Button variant="ghost" size="icon" asChild className="relative text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground ml-2">
              <Link href="/cart">
                 <ShoppingCart className="h-5 w-5" />
                 {isClient && itemCount > 0 && (
                     <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {itemCount}
                     </Badge>
                  )}
                 <span className="sr-only">View Cart</span>
              </Link>
           </Button>
        </div>

        {/* Mobile Navigation Trigger & Cart */}
        <div className="md:hidden flex items-center gap-2">
            {/* Cart Icon and Badge - Mobile */}
            <Button variant="ghost" size="icon" asChild className="relative text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {isClient && itemCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {itemCount}
                        </Badge>
                    )}
                    <span className="sr-only">View Cart</span>
                </Link>
            </Button>
            {/* Mobile Menu Trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-primary text-primary-foreground p-4">
                    <div className="flex flex-col space-y-4 pt-8">
                        {navLinks.map((link) => (
                           <SheetClose key={link.href} asChild>
                                <Link href={link.href} className="text-lg hover:underline">
                                    {link.label}
                                </Link>
                           </SheetClose>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </nav>
    </header>
  );
}
