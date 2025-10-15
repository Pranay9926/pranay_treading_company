import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, Clock, DollarSign, PackageCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">Shipping Information</h1>

      <Card className="mb-8 shadow-md">
         <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left"> {/* Stack on small screens */}
             <Truck className="h-8 w-8 text-accent" />
             <CardTitle className="text-xl sm:text-2xl text-primary">General Shipping Policy</CardTitle>
         </CardHeader>
         <CardContent>
             <p className="text-muted-foreground text-sm sm:text-base">
                 We strive to process and ship all orders as quickly as possible. Orders are typically processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
             </p>
         </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-base sm:text-lg text-left"> {/* Adjusted padding & alignment */}
              <div className="flex items-center gap-3">
                 <DollarSign className="h-5 w-5 text-accent" />
                 <span>Shipping Costs</span>
              </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-sm sm:text-base"> {/* Adjusted padding */}
            <p className="mb-2"><strong>Retail Orders:</strong> Shipping charges for your order will be calculated and displayed at checkout. We offer standard and expedited shipping options.</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Standard Shipping: Typically $5.99 - $9.99 based on weight and destination.</li>
                <li>Expedited Shipping: Costs vary, calculated at checkout.</li>
                <li>Free standard shipping on retail orders over $100.</li>
            </ul>
            <p><strong>Bulk Orders:</strong> Shipping costs for bulk orders are calculated based on the total weight, dimensions, and destination of the shipment. Please contact us for a custom shipping quote for your bulk order. We work with various freight carriers to provide competitive rates.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-base sm:text-lg text-left"> {/* Adjusted padding & alignment */}
            <div className="flex items-center gap-3">
                 <Clock className="h-5 w-5 text-accent" />
                 <span>Estimated Delivery Times</span>
              </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-sm sm:text-base"> {/* Adjusted padding */}
            <p className="mb-2">Delivery times are estimates and commence from the date of shipping, rather than the date of order. Delivery times are to be used as a guide only and are subject to the acceptance and approval of your order.</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
                <li><strong>Standard Shipping (Retail):</strong> Typically 5-7 business days after processing.</li>
                <li><strong>Expedited Shipping (Retail):</strong> Typically 2-3 business days after processing.</li>
                <li><strong>Bulk Orders:</strong> Delivery times vary significantly based on location and carrier. We will provide an estimated delivery window when you receive your shipping quote.</li>
            </ul>
            <p>Please note: Business day means Monday to Friday, except holidays. We do not ship on weekends. Delivery delays can occasionally occur due to weather, carrier issues, or high volume periods.</p>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="item-3" className="border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-base sm:text-lg text-left"> {/* Adjusted padding & alignment */}
            <div className="flex items-center gap-3">
                 <PackageCheck className="h-5 w-5 text-accent" />
                 <span>Order Tracking</span>
              </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-sm sm:text-base"> {/* Adjusted padding */}
            <p>Once your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
            <p className="mt-2">If you haven’t received your order within 10 days (for standard retail shipping) of receiving your shipping confirmation email, please contact us at <a href="mailto:support@pranaytreading.co" className="text-accent hover:underline">support@pranaytreading.co</a> with your name and order number, and we will look into it for you.</p>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

       <Card className="mt-8 shadow-md bg-secondary">
         <CardHeader>
             <CardTitle className="text-lg sm:text-xl text-primary">International Shipping</CardTitle>
         </CardHeader>
         <CardContent>
             <p className="text-muted-foreground text-sm sm:text-base">
                 Currently, we primarily ship within [Your Country/Region]. For international shipping inquiries, especially for bulk orders, please contact us directly to discuss possibilities and obtain a quote. International shipments may be subject to import duties and taxes, which are the responsibility of the buyer.
             </p>
         </CardContent>
      </Card>

    </div>
  );
}
