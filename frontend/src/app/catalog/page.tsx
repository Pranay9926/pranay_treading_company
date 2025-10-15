
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, X, Loader2, AlertCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Shoe, shoeTypes, shoeSizes } from '@/lib/data'; // Import types and static data
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Import Alert components
import ImageWithFallback from '@/components/ImageWithFallback'; // Import the new component


export default function CatalogPage() {
  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    type: Shoe['type'][];
    size: number[];
    priceRange: [number, number];
  }>({ type: [], size: [], priceRange: [0, 150] });
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data: Shoe[] = await res.json();
        setAllShoes(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const handleTypeChange = (type: Shoe['type']) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const handleSizeChange = (size: number) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const clearFilters = () => {
     setFilters({ type: [], size: [], priceRange: [0, 150] });
     setSortBy('price-asc');
  }

  const filteredAndSortedShoes = useMemo(() => {
    if (loading) return []; // Return empty if loading

    let result = allShoes.filter((shoe) => {
      const typeMatch = filters.type.length === 0 || filters.type.includes(shoe.type);
      const sizeMatch = filters.size.length === 0 || filters.size.some(s => shoe.size.includes(s));
      const priceMatch = shoe.price >= filters.priceRange[0] && shoe.price <= filters.priceRange[1];
      return typeMatch && sizeMatch && priceMatch;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [allShoes, filters, sortBy, loading]);

  const FilterControls = ({ inSheet = false }: { inSheet?: boolean }) => (
     <div className={`space-y-6 ${inSheet ? 'p-4' : ''}`}>
        <div>
          <h3 className="font-semibold mb-3 text-primary text-lg">Sort By</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-primary text-lg">Filter by Type</h3>
          <div className="space-y-2">
            {shoeTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}-${inSheet}`}
                  checked={filters.type.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                />
                <Label htmlFor={`type-${type}-${inSheet}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

         <div>
          <h3 className="font-semibold mb-3 text-primary text-lg">Filter by Size</h3>
           <div className="grid grid-cols-3 sm:grid-cols-4 gap-2"> {/* Responsive grid for sizes */}
             {shoeSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}-${inSheet}`}
                    checked={filters.size.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <Label htmlFor={`size-${size}-${inSheet}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {size}
                  </Label>
                </div>
              ))}
           </div>
        </div>

        <div>
           <h3 className="font-semibold mb-3 text-primary text-lg">Price Range</h3>
           <Slider
             defaultValue={[0, 150]}
             min={0}
             max={150}
             step={10}
             value={filters.priceRange}
             onValueChange={handlePriceChange}
             className="my-4"
           />
           <div className="flex justify-between text-sm text-muted-foreground">
             <span>${filters.priceRange[0]}</span>
             <span>${filters.priceRange[1]}</span>
           </div>
         </div>
         { (filters.type.length > 0 || filters.size.length > 0 || filters.priceRange[0] !== 0 || filters.priceRange[1] !== 150) && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
         )}
     </div>
  );

  // Loading State Component
  const LoadingGrid = () => (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {Array.from({ length: 8 }).map((_, index) => ( // Show 8 skeletons
         <Card key={index} className="overflow-hidden shadow-md flex flex-col">
           <Skeleton className="w-full aspect-square" /> {/* Aspect square for image skeleton */}
           <CardContent className="p-4 flex flex-col flex-grow">
             <Skeleton className="h-6 w-3/4 mb-1" />
             <Skeleton className="h-4 w-1/4 mb-2" />
             <Skeleton className="h-4 w-1/2 mb-3 flex-grow" /> {/* Shorten description skel */}
             <div className="flex justify-between items-center mt-auto pt-2">
               <Skeleton className="h-8 w-1/4" />
               <Skeleton className="h-9 w-1/3" />
             </div>
           </CardContent>
         </Card>
       ))}
     </div>
  );


  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 md:mb-8">Shoe Catalog</h1>

       {/* Mobile Filter Trigger */}
       <div className="md:hidden mb-4"> {/* Only show on screens smaller than md */}
         <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" /> Filters & Sort
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[320px] p-0"> {/* Adjusted width */}
                 <SheetHeader className="p-4 border-b">
                    <SheetTitle>Filters & Sort</SheetTitle>
                 </SheetHeader>
                 <ScrollArea className="h-[calc(100%-120px)]">
                     <FilterControls inSheet={true} />
                 </ScrollArea>
                 <SheetFooter className="p-4 border-t">
                    <SheetClose asChild>
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Apply Filters</Button>
                    </SheetClose>
                 </SheetFooter>
            </SheetContent>
         </Sheet>
       </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-6"> {/* Hide on screens smaller than md */}
            <FilterControls />
        </aside>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <LoadingGrid />
          ) : error ? (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Products</AlertTitle>
              <AlertDescription>
                {error} Please try refreshing the page.
              </AlertDescription>
            </Alert>
          ) : filteredAndSortedShoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Responsive grid columns */}
              {filteredAndSortedShoes.map((shoe) => (
                <Card key={shoe.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader className="p-0 relative aspect-square"> {/* Use aspect-square and relative */}
                     <Link href={`/product/${shoe.id}`}> {/* Link the image */}
                      <ImageWithFallback
                        src={shoe.imageUrl} // Use the correct image URL
                        alt={shoe.name}
                        fill // Use fill to cover the container
                        style={{ objectFit: 'cover' }} // Ensure image covers
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Scale on hover
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" // Responsive sizes
                        data-ai-hint={`${shoe.type.toLowerCase()} shoe product card`} // Updated hint
                      />
                     </Link>
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col flex-grow">
                     <Link href={`/product/${shoe.id}`}> {/* Link the title */}
                         <CardTitle className="text-base sm:text-lg font-semibold mb-1 text-primary hover:underline line-clamp-1">{shoe.name}</CardTitle> {/* line-clamp for title */}
                     </Link>
                    <p className="text-sm text-muted-foreground mb-2">{shoe.type}</p>
                    <p className="text-sm text-muted-foreground mb-3 flex-grow line-clamp-2">{shoe.description}</p> {/* Limit description lines */}
                    <div className="flex justify-between items-center mt-auto pt-2"> {/* Add padding top */}
                      <p className="font-bold text-primary text-base sm:text-lg">${shoe.price.toFixed(2)}</p>
                      {/* Link the View button */}
                       <Button size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                         <Link href={`/product/${shoe.id}`}>View</Link>
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No shoes match the current filters.</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
