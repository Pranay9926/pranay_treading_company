
'use client'; // Make this a client component to use hooks and context

import { useState, useEffect, useMemo } from 'react'; // Import hooks
import { notFound, useParams } from 'next/navigation'; // Import useParams
import type { Shoe } from '@/lib/data'; // Import Shoe type
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Trash2, AlertCircle } from 'lucide-react'; // Add Check and Trash2 icons
import { useCart } from '@/context/CartContext'; // Import useCart hook
import { useToast } from "@/hooks/use-toast"; // Import useToast hook
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Import Alert components
import ImageWithFallback from '@/components/ImageWithFallback'; // Import the new component

// NOTE: Fetching is now done inside the component using useEffect

export default function ProductPage() {
  const params = useParams();
  const { id } = params as { id: string }; // Get id from params
  const { addItemToCart, removeItemFromCart, cartItems } = useCart(); // Get cart functions and items from context
  const { toast } = useToast(); // Get toast function
  const [shoe, setShoe] = useState<Shoe | null | undefined>(undefined); // Add loading state (undefined initially)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
        if (!id) {
            setError("Product ID is missing.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setShoe(undefined); // Reset shoe state while loading

        try {
            const res = await fetch(`/api/products/${id}`);
            if (res.status === 404) {
                setShoe(null); // Explicitly set to null if not found
                return; // Exit early
            }
            if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.statusText}`);
            }
            const data: Shoe = await res.json();
            setShoe(data);
        } catch (err) {
             if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error(`Error fetching product ${id}:`, err);
            setShoe(null); // Set to null on error
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
  }, [id]); // Re-fetch when id changes

  const isItemInCart = useMemo(() => {
      // Ensure shoe and shoe.id exist before checking cart
      return !!shoe && cartItems.some(item => item.id === shoe.id);
  }, [cartItems, shoe]);


  const handleAddToCart = () => {
    if (shoe && !isItemInCart) { // Only add if shoe exists and is not in cart
      addItemToCart(shoe); // Add shoe (Cart context handles quantity)
      toast({
        title: "Added to Cart",
        description: `${shoe.name} has been added to your cart.`,
        action: (
          <Link href="/cart">
            <Button variant="outline" size="sm">View Cart</Button>
          </Link>
        ),
      });
    }
  };

  const handleRemoveFromCart = () => {
    if (shoe && isItemInCart) { // Only remove if shoe exists and is in cart
        removeItemFromCart(shoe.id);
        toast({
            title: "Removed from Cart",
            description: `${shoe.name} has been removed from your cart.`,
            variant: "destructive", // Use destructive variant for removal confirmation
        });
    }
  }

  // Loading state
  if (loading) {
     return (
       <div>
         <div className="mb-6">
            <Button variant="outline" size="sm" disabled>
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Catalog
            </Button>
         </div>
         <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
           <Skeleton className="w-full aspect-square" /> {/* Image skeleton */}
           <div className="space-y-6">
             <Skeleton className="h-10 w-3/4" />
             <Skeleton className="h-6 w-1/4" />
             <Skeleton className="h-8 w-1/5 mb-4" />
             <Separator />
             <Skeleton className="h-4 w-1/3 mb-2" />
             <Skeleton className="h-20 w-full" />
             <Separator />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <div className="flex flex-wrap gap-2">
                 <Skeleton className="h-6 w-16" />
                 <Skeleton className="h-6 w-16" />
                 <Skeleton className="h-6 w-16" />
              </div>
             <Separator />
             <div className="flex flex-col sm:flex-row gap-4 pt-4"> {/* Column on small screens */}
               <Skeleton className="h-11 w-full sm:flex-1" />
               <Skeleton className="h-11 w-full sm:flex-1" />
             </div>
           </div>
         </div>
       </div>
     );
  }

   // Error state
   if (error) {
     return (
       <div>
         <div className="mb-6">
             <Button variant="outline" size="sm" asChild>
                 <Link href="/catalog">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back to Catalog
                 </Link>
             </Button>
         </div>
         <Alert variant="destructive" className="mt-6">
           <AlertCircle className="h-4 w-4" />
           <AlertTitle>Error Loading Product</AlertTitle>
           <AlertDescription>
             {error} Please try refreshing the page or go back to the catalog.
           </AlertDescription>
         </Alert>
       </div>
     );
   }

  // Not Found state (shoe is null after loading/error check)
  if (!shoe) {
    notFound(); // Show Next.js 404 page
  }


  // --- Render Product Details (if shoe exists) ---
  return (
    <div>
        <div className="mb-6">
             <Button variant="outline" size="sm" asChild>
                 <Link href="/catalog">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back to Catalog
                 </Link>
             </Button>
        </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="flex justify-center items-start">
          <Card className="overflow-hidden shadow-lg w-full max-w-md lg:max-w-lg aspect-square relative"> {/* Aspect square and relative */}
            <ImageWithFallback
              src={shoe.imageUrl} // Use correct URL
              alt={shoe.name}
              fill // Use fill to cover container
              style={{ objectFit: 'cover' }} // Ensure image covers
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px" // Responsive sizes
              data-ai-hint={`${shoe.type.toLowerCase()} shoe main product image`} // Updated hint
              priority // Prioritize loading this image
            />
          </Card>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <Card className="shadow-md">
             <CardHeader>
                 <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">{shoe.name}</CardTitle>
                 <CardDescription className="text-base sm:text-lg text-muted-foreground">{shoe.type} Shoe</CardDescription>
             </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-xl sm:text-2xl font-bold text-primary">${shoe.price.toFixed(2)}</p>

                 <Separator />

                 <div>
                    <h3 className="text-base sm:text-md font-semibold text-primary mb-2">Description</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                       {shoe.longDescription || shoe.description}
                    </p>
                 </div>

                 <Separator />

                <div>
                    <h3 className="text-base sm:text-md font-semibold text-primary mb-2">Available Sizes</h3>
                     <p className="text-xs sm:text-sm text-muted-foreground mb-2">Note: Size selection will be available soon.</p>
                    <div className="flex flex-wrap gap-2">
                         {shoe.size.map((s) => (
                             <Badge key={s} variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                             Size {s}
                             </Badge>
                         ))}
                     </div>
                 </div>

                 <Separator />

                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                     {/* Conditional Button Rendering */}
                     {isItemInCart ? (
                        <>
                             {/* Disabled "Already in Cart" Button */}
                             <Button
                               size="lg"
                               className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-accent-foreground cursor-not-allowed"
                               disabled
                               aria-live="polite"
                             >
                               <Check className="mr-2 h-5 w-5" /> Already in Cart
                             </Button>

                             {/* Remove from Cart Button */}
                             <Button
                               size="lg"
                               variant="outline"
                               className="w-full sm:flex-1 border-destructive text-destructive hover:bg-destructive/10"
                               onClick={handleRemoveFromCart}
                             >
                               <Trash2 className="mr-2 h-5 w-5" /> Remove
                             </Button>
                        </>
                     ) : (
                         <>
                             {/* Add to Cart Button */}
                             <Button
                               size="lg"
                               className="w-full sm:flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                               onClick={handleAddToCart}
                               aria-live="polite"
                             >
                               <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                             </Button>
                             {/* Placeholder Buy Now Button */}
                             <Button size="lg" variant="outline" className="w-full sm:flex-1" disabled>Buy Now</Button>
                         </>
                     )}
                 </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
