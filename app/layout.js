import './globals.css';

export const metadata = {
  title: 'The Cakery Nook | Luxury Bakery & Fast Food Café in Mithapur, Patna',
  description: 'Best cakes, pastries, and fast food in Mithapur, Patna.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
