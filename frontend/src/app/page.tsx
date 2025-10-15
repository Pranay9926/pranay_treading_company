
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShoppingBag, Truck, ArrowRight, AlertCircle } from 'lucide-react';
import type { Shoe } from '@/lib/data'; // Import Shoe type
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Import Alert components
import ImageWithFallback from '@/components/ImageWithFallback'; // Import the new component

// Fetch featured shoes data (Server Component Data Fetching)
async function getFeaturedShoes(): Promise<Shoe[] | null> {
  try {
    // Construct the absolute URL for fetching within a Server Component
    // Ensure NEXT_PUBLIC_APP_URL is set in your environment variables (.env.local)
    // Default to localhost:9002 if not set, adjust port if necessary
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const allShoes: Shoe[] = await res.json();
    // Select a diverse set of featured shoes (e.g., ids 1, 6, 9, 11)
    // Updated IDs to ensure they exist in the current dummy data
    const featuredIds = [1, 6, 9, 11];
    const featured = allShoes.filter(shoe => featuredIds.includes(shoe.id));
    // Ensure we always return 4, even if some IDs weren't found (fallback)
    return featured.length === 4 ? featured : allShoes.slice(0, 4);
  } catch (error) {
    console.error("Error fetching featured shoes:", error);
    return null; // Return null on error
  }
}


export default async function Home() {
  // Fetch the featured shoes
  const featuredShoes = await getFeaturedShoes();

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-28 px-4 rounded-lg overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
         {/* Subtle Background Pattern */}
         <div className="absolute inset-0 z-0 opacity-5 mix-blend-multiply">
             <ImageWithFallback
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d34?q=80&w=1200&h=800&fit=crop&ixlib=rb-4.0.3" // Working Unsplash background image
                alt="Abstract shoe pattern background"
                fill // Use fill instead of layout
                style={{ objectFit: 'cover' }} // Use style for objectFit with fill
                quality={50} // Lower quality for background
                priority // Load hero image first
                data-ai-hint="shoe pattern background" // Updated hint
                // Removed fallbackSrc prop
              />
         </div>
        {/* Animated Content */}
        <div className="relative z-10 animate-in fade-in duration-1000">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-5 tracking-tight">
            Welcome to Pranay Treading Co.
          </h1>
           {/* Sub Heading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl md:max-w-3xl mx-auto leading-relaxed">
            Your trusted source for high-quality security guard shoes in bulk, and a wide variety of footwear for everyone.
          </p>
           {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
             {/* Use SlotClone for single child */}
             <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 transform transition hover:scale-105 duration-300 ease-in-out shadow-md hover:shadow-lg"
             >
                 <Link href="/catalog">
                    Shop Our Catalog <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
             </Button>
            <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto transform transition hover:scale-105 duration-300 ease-in-out shadow-sm hover:shadow-md"
             >
                 <Link href="/contact">Bulk Inquiries</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Key Offerings Section with Hover Effects */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1: Bulk Security Shoes */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-border/50 group">
          <CardHeader>
            <div className="flex justify-center mb-4">
               <ShieldCheck className="h-12 w-12 sm:h-14 sm:w-14 text-accent transition-transform duration-300 group-hover:scale-110" /> {/* Icon scales on hover */}
            </div>
            <CardTitle className="text-center text-xl sm:text-2xl text-primary">Bulk Security Shoes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-sm sm:text-base text-muted-foreground">
              Durable, comfortable, and reliable footwear designed for security professionals. Available for bulk purchase at competitive prices.
            </CardDescription>
             <div className="text-center mt-5"> {/* Increased margin */}
                <Button variant="link" asChild className="text-accent font-semibold">
                    <Link href="/contact">
                       Get a Quote <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* Card 2: Retail Shoe Shop */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-border/50 group">
          <CardHeader>
             <div className="flex justify-center mb-4">
               <ShoppingBag className="h-12 w-12 sm:h-14 sm:w-14 text-accent transition-transform duration-300 group-hover:scale-110" />
             </div>
            <CardTitle className="text-center text-xl sm:text-2xl text-primary">Retail Shoe Shop</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-sm sm:text-base text-muted-foreground">
              Explore our diverse collection of shoes for men, women, and children. Find the perfect pair for any occasion.
            </CardDescription>
             <div className="text-center mt-5">
                <Button variant="link" asChild className="text-accent font-semibold">
                    <Link href="/catalog">
                        Browse Shop <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* Card 3: Reliable Shipping */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-border/50 group">
          <CardHeader>
             <div className="flex justify-center mb-4">
               <Truck className="h-12 w-12 sm:h-14 sm:w-14 text-accent transition-transform duration-300 group-hover:scale-110" />
             </div>
            <CardTitle className="text-center text-xl sm:text-2xl text-primary">Reliable Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-sm sm:text-base text-muted-foreground">
              Fast and dependable shipping options for both bulk orders and individual purchases. Check our shipping policy for details.
            </CardDescription>
             <div className="text-center mt-5">
                <Button variant="link" asChild className="text-accent font-semibold">
                    <Link href="/shipping">
                        Shipping Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
             </div>
          </CardContent>
        </Card>
      </section>

       {/* Featured Products Section with Enhanced Styling */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8 md:mb-12">Featured Products</h2>
        {featuredShoes ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredShoes.map((shoe) => (
                <Card key={shoe.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group border border-border/50 hover:-translate-y-1">
                {/* Image container with hover effect */}
                <div className="overflow-hidden aspect-square relative"> {/* Use aspect-square and relative for fill */}
                    <Link href={`/product/${shoe.id}`}>
                    <ImageWithFallback
                        src={shoe.imageUrl} // Use the correct image URL from data
                        alt={shoe.name}
                        fill // Use fill to cover the container
                        style={{ objectFit: 'cover' }} // Ensure image covers the area
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Scale image on hover
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" // Responsive sizes
                        data-ai-hint={`${shoe.type.toLowerCase()} shoe product style`} // More specific hint
                    />
                    </Link>
                </div>
                <CardContent className="p-4">
                    <Link href={`/product/${shoe.id}`}>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 text-primary hover:underline line-clamp-1">{shoe.name}</h3> {/* line-clamp for title */}
                    </Link>
                    <p className="text-muted-foreground text-sm mb-2">{shoe.type}</p>
                    <p className="font-bold text-primary text-base sm:text-lg">${shoe.price.toFixed(2)}</p>
                    {/* Updated Button linking to product page */}
                    <Button
                        size="sm"
                        asChild // Important: Allows Button to render as Link
                        className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90 transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        <Link href={`/product/${shoe.id}`}>View Details</Link>
                    </Button>
                </CardContent>
                </Card>
            ))}
            </div>
         ) : (
             <Alert variant="destructive" className="mt-6">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Error Loading Products</AlertTitle>
               <AlertDescription>
                 We couldn't load the featured products right now. Please try again later.
               </AlertDescription>
             </Alert>
          )
        }
         {/* Button to view all products */}
         <div className="text-center mt-10 md:mt-12">
             <Button
               variant="outline"
               size="lg" // Larger button
               asChild
               className="transform transition hover:scale-105 duration-300 ease-in-out shadow-sm hover:shadow-md"
             >
                <Link href="/catalog">See All Products</Link>
             </Button>
         </div>
      </section>
    </div>
  );
}
