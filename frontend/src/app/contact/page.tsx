'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }).max(500, {
    message: 'Message cannot exceed 500 characters.'
  }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const companyAddress = "123 Shoe Lane, Footwear City, FC 54321"; // Dummy Address
  const companyPhone = "+1 (555) 123-4567"; // Dummy Phone
  const companyEmail = "sales@pranaytreading.co"; // Dummy Email


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // IMPORTANT: This is a placeholder submission handler.
  // In a real application, you would replace this with an actual API call
  // to send the email (e.g., using Nodemailer, SendGrid, Resend, etc.).
  // For this example, we'll just log to console and show a success toast.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form Submitted:', values);
    // Simulate sending email
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset(); // Reset form after submission
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12"> {/* Responsive grid layout */}
       {/* Contact Information */}
      <div className="space-y-6 md:space-y-8">
         <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 md:mb-6">Contact Us</h1>
         <p className="text-muted-foreground text-sm sm:text-base">
             Have questions about our products, bulk orders, or need assistance? Reach out to us using the form below or through our contact details.
         </p>

         <Card className="bg-secondary border-none shadow-none">
            <CardContent className="pt-6 space-y-4">
                 <div className="flex items-start gap-3 sm:gap-4">
                     <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-accent mt-1 shrink-0" />
                     <div>
                         <h3 className="font-semibold text-primary text-base sm:text-lg">Address</h3>
                         <p className="text-muted-foreground text-sm sm:text-base">{companyAddress}</p>
                     </div>
                 </div>
                 <div className="flex items-start gap-3 sm:gap-4">
                     <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-accent mt-1 shrink-0" />
                     <div>
                         <h3 className="font-semibold text-primary text-base sm:text-lg">Phone</h3>
                         <a href={`tel:${companyPhone}`} className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">{companyPhone}</a>
                     </div>
                 </div>
                 <div className="flex items-start gap-3 sm:gap-4">
                     <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-accent mt-1 shrink-0" />
                     <div>
                         <h3 className="font-semibold text-primary text-base sm:text-lg">Email</h3>
                         <a href={`mailto:${companyEmail}`} className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base break-all">{companyEmail}</a> {/* Allow email to break */}
                     </div>
                 </div>
            </CardContent>
         </Card>

      </div>

      {/* Contact Form */}
      <div>
         <Card className="shadow-lg">
             <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary">Send us a Message</CardTitle>
                <CardDescription className="text-sm sm:text-base">Fill out the form and we'll respond as soon as possible.</CardDescription>
             </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                         <FormDescription className="text-xs sm:text-sm">
                            Max 500 characters.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Send Message</Button>
                </form>
              </Form>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
