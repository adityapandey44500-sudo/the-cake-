import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'The Cakery Nook | Luxury Bakery & Fast Food Café in Mithapur, Patna',
  description: 'Freshly Baked Happiness Every Day. Premium Cakes, Pizzas, Burgers, Fries & Custom Celebration Cakes in Road No. 1, Jawahar Colony, Mithapur, Patna, Bihar.',
  keywords: 'bakery in Patna, cake shop Mithapur Patna, The Cakery Nook, pizza burger Patna, custom celebration cakes Patna',
  openGraph: {
    title: 'The Cakery Nook | Luxury Bakery & Café',
    description: 'Freshly Baked Happiness Every Day in Mithapur, Patna.',
    url: 'https://thecakerynook.patna',
    siteName: 'The Cakery Nook',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              "name": "The Cakery Nook",
              "image": "https://images.pexels.com/photos/34008843/pexels-photo-34008843.jpeg",
              "url": "https://thecakerynook.patna",
              "telephone": "+919876543210",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Road No. 1, Jawahar Colony, Mithapur",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "postalCode": "800001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.5941,
                "longitude": 85.1376
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "23:00"
              },
              "servesCuisine": "Bakery, Fast Food, Cakes, Pizzas, Burgers",
              "priceRange": "₹₹"
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#2D231E] dark:bg-[#121212] dark:text-[#EAE0D5] selection:bg-[#D4A373] selection:text-white transition-colors duration-300">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
