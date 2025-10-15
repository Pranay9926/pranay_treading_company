
'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ImageWithFallback from '@/components/ImageWithFallback'; // Import the new component

export default function CartPage() {
  const { cartItems, removeItemFromCart, updateItemQuantity, getCartTotal, clearCart, getCartItemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12 shadow-md">
            <CardHeader>
                <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
                <CardTitle className="text-xl sm:text-2xl text-primary">Your Cart is Empty</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Looks like you haven't added any shoes to your cart yet.</p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
             <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-secondary">
                    <CardTitle className="text-lg sm:text-xl text-primary">Cart Items ({getCartItemCount()})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[60vh] w-full"> {/* Ensure ScrollArea takes full width */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead> {/* Smaller width on md */}
                          <TableHead>Product</TableHead>
                          <TableHead className="text-center w-24">Quantity</TableHead> {/* Fixed width */}
                          <TableHead className="text-right hidden sm:table-cell">Price</TableHead> {/* Hide on extra small */}
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="w-[50px] text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                             <TableCell className="hidden md:table-cell p-2"> {/* Less padding */}
                               <ImageWithFallback
                                 src={item.imageUrl} // Use correct URL
                                 alt={item.name}
                                 width={60} // Smaller image
                                 height={60}
                                 className="rounded-md object-cover"
                                 data-ai-hint={`${item.type.toLowerCase()} shoe cart item`} // Updated hint
                               />
                             </TableCell>
                            <TableCell className="font-medium py-2 px-3 sm:px-4"> {/* Adjust padding */}
                                <Link href={`/product/${item.id}`} className="hover:underline text-primary text-sm sm:text-base line-clamp-2">{item.name}</Link>
                                <p className="text-xs text-muted-foreground sm:hidden">{item.type} - ${item.price.toFixed(2)}</p> {/* Show type/price inline on small */}
                                <p className="text-xs text-muted-foreground hidden sm:block">{item.type}</p> {/* Show type below on larger */}
                            </TableCell>
                            <TableCell className="text-center py-2 px-1 sm:px-4"> {/* Adjust padding */}
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                                className="w-14 sm:w-16 mx-auto h-8 text-center text-sm" // Smaller input on mobile
                              />
                            </TableCell>
                            <TableCell className="text-right hidden sm:table-cell py-2 px-3 sm:px-4">${item.price.toFixed(2)}</TableCell> {/* Adjust padding */}
                            <TableCell className="text-right font-semibold py-2 px-3 sm:px-4">${(item.price * item.quantity).toFixed(2)}</TableCell> {/* Adjust padding */}
                            <TableCell className="text-right py-2 px-1 sm:px-4"> {/* Adjust padding */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive/80 h-8 w-8" // Smaller button
                                onClick={() => removeItemFromCart(item.id)}
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                   </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-end p-3 sm:p-4 border-t"> {/* Adjust padding */}
                     <Button variant="outline" size="sm" onClick={clearCart}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                     </Button>
                </CardFooter>
             </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
             <Card className="shadow-lg lg:sticky lg:top-24"> {/* Make summary sticky only on large screens */}
                 <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-primary">Order Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3 sm:space-y-4"> {/* Adjust spacing */}
                    <div className="flex justify-between text-sm sm:text-base">
                         <span className="text-muted-foreground">Subtotal</span>
                         <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm sm:text-base">
                         <span className="text-muted-foreground">Shipping</span>
                         <span className="font-medium">Calculated at checkout</span>
                     </div>
                     <Separator />
                    <div className="flex justify-between text-base sm:text-lg font-bold text-primary">
                         <span>Total</span>
                         <span>${getCartTotal().toFixed(2)}</span>
                     </div>
                 </CardContent>
                <CardFooter className="flex flex-col gap-3 p-3 sm:p-4"> {/* Adjust padding */}
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled>
                         Proceed to Checkout
                    </Button>
                     <Button variant="outline" asChild className="w-full">
                       <Link href="/catalog">Continue Shopping</Link>
                     </Button>
                 </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
