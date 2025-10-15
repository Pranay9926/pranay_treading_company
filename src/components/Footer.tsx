import { Separator } from '@/components/ui/separator';
import Link from 'next/link'; // Import Link
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const companyAddress = "123 Shoe Lane, Footwear City, FC 54321"; // Dummy Address
  const companyPhone = "+1 (555) 123-4567"; // Dummy Phone
  const companyEmail = "sales@pranaytreading.co"; // Dummy Email


  return (
    <footer className="bg-secondary text-secondary-foreground mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Pranay Treading Co.</h3>
            <p className="text-sm text-muted-foreground">
              Providing quality security and everyday footwear in bulk and retail.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Contact Us</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2"> {/* Use items-start for address */}
                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">{companyAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href={`tel:${companyPhone}`} className="text-muted-foreground hover:text-primary transition-colors">{companyPhone}</a>
              </li>
               <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href={`mailto:${companyEmail}`} className="text-muted-foreground hover:text-primary transition-colors break-all">{companyEmail}</a> {/* Allow email to break */}
              </li>
            </ul>
          </div>

          {/* Quick Links */}
           <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Quick Links</h3>
            <ul className="space-y-1 text-sm">
               <li><Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link></li>
               <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
               <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Form</Link></li>
               {/* Add more links as needed, e.g., About Us, FAQ */}
            </ul>
          </div>
        </div>
        <Separator className="bg-border mb-4" />
        <p className="text-center text-xs text-muted-foreground">
          &copy; {currentYear} Pranay Treading Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
