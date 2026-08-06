'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, Pizza, Utensils, ShoppingBag, Search, Menu as MenuIcon, X, 
  MapPin, Phone, Clock, Star, Heart, ArrowRight, Sparkles, ShieldCheck, 
  Smile, Award, ChevronRight, MessageCircle, Sun, Moon, CheckCircle2, 
  ChevronDown, ExternalLink, Instagram, Facebook, Send
} from 'lucide-react';
// Missing components replacement
const Button = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded-lg font-medium transition ${className}`} {...props}>{children}</button>
);
const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`} {...props}>{children}</div>
);
const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
);
const Badge = ({ children, className = '', ...props }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`} {...props}>{children}</span>
);
const Input = (props) => (
  <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" {...props} />
);
const Dialog = ({ children, open }) => open ? (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">{children}</div>
  </div>
) : null;
const DialogContent = ({ children }) => <div>{children}</div>;
const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const DialogTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;
const DialogDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
const DialogFooter = ({ children }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;
const toast = { success: (msg) => alert(msg), error: (msg) => alert(msg) };

const PRODUCTS = [
  {
    id: 'c1',
    name: 'Butterscotch Cake (450g)',
    category: 'Cakes',
    price: 299,
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://images.pexels.com/photos/34008843/pexels-photo-34008843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Layers of moist vanilla sponge infused with caramel sauce and crunchy butterscotch praline chunks.',
    bestseller: true,
  },
  {
    id: 'c2',
    name: 'Vanilla Cake (450g)',
    category: 'Cakes',
    price: 299,
    rating: 4.7,
    reviewsCount: 98,
    image: 'https://images.pexels.com/photos/33759172/pexels-photo-33759172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Classic delicate vanilla sponge layered with silky smooth Madagascar vanilla buttercream frosting.',
    bestseller: false,
  },
  {
    id: 'c3',
    name: 'Black Forest Cake (450g)',
    category: 'Cakes',
    price: 399,
    rating: 5.0,
    reviewsCount: 215,
    image: 'https://images.pexels.com/photos/18656839/pexels-photo-18656839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Rich chocolate sponge soaked in cherry syrup, layered with whipped cream and dark cherry pieces.',
    bestseller: true,
  },
  {
    id: 'c4',
    name: 'Custom Celebration Cake (1kg+)',
    category: 'Cakes',
    price: 799,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.pexels.com/photos/29170275/pexels-photo-29170275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Tailor-made designer cakes for birthdays, anniversaries, and weddings with personalized fondant themes.',
    bestseller: true,
  },
  {
    id: 'p1',
    name: "Onion Cheese Burst Pizza (12'')",
    category: 'Pizza',
    price: 99,
    rating: 4.8,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxwaXp6YXxlbnwwfHx8fDE3ODU5MTE1MTB8MA&ixlib=rb-4.1.0&q=85',
    description: 'Hand-tossed crust loaded with molten liquid cheese core, crunchy onions, and Italian herbs.',
    bestseller: true,
  },
  {
    id: 'p2',
    name: "Veg Paneer Pizza (12'')",
    category: 'Pizza',
    price: 109,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwaXp6YXxlbnwwfHx8fDE3ODU5MTE1MTB8MA&ixlib=rb-4.1.0&q=85',
    description: 'Topped with spiced marinated paneer cubes, capsicum, olives, jalapeños, and generous mozzarella.',
    bestseller: false,
  },
  {
    id: 'b1',
    name: 'Veg Burger',
    category: 'Burgers',
    price: 69,
    rating: 4.6,
    reviewsCount: 85,
    image: 'https://images.pexels.com/photos/33502810/pexels-photo-33502810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Crispy potato-veggie patty in a toasted sesame bun with crisp lettuce, tomato, and tangy mayo.',
    bestseller: false,
  },
  {
    id: 'b2',
    name: 'Cheesy Burger',
    category: 'Burgers',
    price: 89,
    rating: 4.8,
    reviewsCount: 110,
    image: 'https://images.pexels.com/photos/36007382/pexels-photo-36007382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Savory veg patty dripping with melted cheddar cheese slice and special house sauce.',
    bestseller: false,
  },
  {
    id: 'b3',
    name: 'Double Decker Burger',
    category: 'Burgers',
    price: 99,
    rating: 4.9,
    reviewsCount: 195,
    image: 'https://images.pexels.com/photos/33502810/pexels-photo-33502810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Two crispy patties stacked together with double layers of veggies and creamy mayo.',
    bestseller: true,
  },
  {
    id: 'b4',
    name: 'Double Cheese Burger',
    category: 'Burgers',
    price: 119,
    rating: 4.7,
    reviewsCount: 78,
    image: 'https://images.pexels.com/photos/36007382/pexels-photo-36007382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Loaded with double cheese slices for ultimate gooey goodness in every single bite.',
    bestseller: false,
  },
  {
    id: 'b5',
    name: 'Double Decker Double Cheese Burger',
    category: 'Burgers',
    price: 149,
    rating: 5.0,
    reviewsCount: 230,
    image: 'https://images.pexels.com/photos/33502810/pexels-photo-33502810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'The ultimate beast: 2 crispy patties, 2 cheese slices, caramelized onions, and signature sauce.',
    bestseller: true,
  },
  {
    id: 's1',
    name: 'Veg Patty',
    category: 'Sides',
    price: 39,
    rating: 4.5,
    reviewsCount: 40,
    image: 'https://images.pexels.com/photos/33502810/pexels-photo-33502810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Golden fried crispy potato and garden vegetable cutlet.',
    bestseller: false,
  },
  {
    id: 's2',
    name: 'Paneer Patty',
    category: 'Sides',
    price: 49,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.pexels.com/photos/36007382/pexels-photo-36007382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Tender spiced paneer patty coated in crispy breadcrumbs.',
    bestseller: false,
  },
  {
    id: 's3',
    name: 'French Fries',
    category: 'Sides',
    price: 99,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxmcmVuY2glMjBmcmllc3xlbnwwfHx8fDE3ODU5MTE1MTB8MA&ixlib=rb-4.1.0&q=85',
    description: 'Classic crisp golden potato french fries dusted with seasoned salt.',
    bestseller: true,
  },
  {
    id: 's4',
    name: 'Peri Peri Fries',
    category: 'Sides',
    price: 119,
    rating: 4.9,
    reviewsCount: 275,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwZXJpJTIwcGVyaSUyMGZyaWVzfGVufDB8fHx8fDE3ODU5MTE1MTB8MA&ixlib=rb-4.1.0&q=85',
    description: 'Crispy fries tossed in fiery and tangy African Peri-Peri spice blend.',
    bestseller: true,
  },
];

const REVIEWS = [
  {
    name: 'Anjali Sharma',
    location: 'Boring Road, Patna',
    rating: 5,
    comment: 'The Butterscotch cake from The Cakery Nook is out of this world! Fresh, spongy, and not overly sweet. My family loves their pizzas too.',
    date: '2 days ago',
  },
  {
    name: 'Rahul Kumar',
    location: 'Mithapur, Patna',
    rating: 5,
    comment: 'Best Double Decker Double Cheese Burger in Patna! Super juicy and crunchy. And it is right in Jawahar Colony. Highly recommended!',
    date: '1 week ago',
  },
  {
    name: 'Priya Singh',
    location: 'Kankarbagh, Patna',
    rating: 5,
    comment: 'Ordered a custom birthday cake for my daughter. The design was gorgeous and tasted like heaven. Thank you Cakery Nook!',
    date: '2 weeks ago',
  },
];

const FAQS = [
  {
    q: 'Where is The Cakery Nook located?',
    a: 'We are conveniently located at Road No. 1, Jawahar Colony, Mithapur, Patna, Bihar 800001. You can easily drop by or order online for quick delivery.'
  },
  {
    q: 'Do you make custom celebration cakes for birthdays and anniversaries?',
    a: 'Yes! We specialize in custom designer cakes. You can place your order 24 hours in advance by contacting us via WhatsApp or phone.'
  },
  {
    q: 'Do you offer home delivery across Patna?',
    a: 'Yes, we provide prompt home delivery across major localities in Patna including Mithapur, Kankarbagh, Boring Road, and Gandhi Maidan.'
  },
  {
    q: 'Are your items 100% vegetarian?',
    a: 'Yes, all our bakery items, pizzas, burgers, and fast-food delights are 100% vegetarian and prepared in a clean, hygienic kitchen.'
  },
  {
    q: 'What are your operating hours?',
    a: 'We are open every day from 9:00 AM to 11:00 PM to satisfy your sweet and savory cravings!'
  },
];

export default function TheCakeryNookApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderType, setOrderType] = useState('Delivery');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`Added ${product.name} to cart!`, {
      description: `₹${product.price} • Tap cart to view order`,
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = orderType === 'Delivery' ? 30 : 0;
  const cartGrandTotal = cartSubtotal + (cart.length > 0 ? deliveryFee : 0);

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory || (selectedCategory === 'Bestsellers' && item.bestseller);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || (orderType === 'Delivery' && !customerAddress.trim())) {
      toast.error('Please fill in all required contact & delivery details.');
      return;
    }

    const orderData = {
      id: 'CN-' + Math.floor(100000 + Math.random() * 900000),
      name: customerName,
      phone: customerPhone,
      address: customerAddress || 'Dine-In / Pickup at Jawahar Colony',
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee,
      grandTotal: cartGrandTotal,
      orderType,
      note: orderNote,
      time: new Date().toLocaleString(),
    };

    setLastOrderDetails(orderData);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
    setCart([]);
    toast.success('Order placed successfully!');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map(i => `• ${i.name} x ${i.qty} = ₹${i.price * i.qty}`).join('%0A');
    const msg = `Hello The Cakery Nook! I want to place an order:%0A%0A${itemsList}%0A%0A*Subtotal: ₹${cartSubtotal}*%0A*Delivery Fee: ₹${deliveryFee}*%0A*Total: ₹${cartGrandTotal}*%0A%0APlease confirm my order!`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#121212] text-[#2D231E] dark:text-[#EAE0D5] transition-colors duration-300">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#6B4226] text-[#FDFBF7] py-2 px-4 text-xs sm:text-sm font-medium flex justify-between items-center z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Sparkles className="w-4 h-4 text-[#D4A373] animate-pulse shrink-0" />
            <span className="truncate">✨ Free Home Delivery in Mithapur & Patna for orders above ₹499! Call: +91 98765 43210</span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 9:00 AM - 11:00 PM</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Jawahar Colony, Patna</span>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/90 dark:bg-[#1A1A1A]/90 border-b border-[#E6D5C3] dark:border-[#2A2A2A] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#6B4226] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              CN
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#6B4226] dark:text-[#EAE0D5] block leading-none">
                The Cakery Nook
              </span>
              <span className="text-[10px] tracking-widest text-[#8C6D53] dark:text-[#A39171] uppercase font-medium">
                Luxury Bakery & Café
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
            <a href="#menu" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">Menu</a>
            <a href="#about" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">About Us</a>
            <a href="#bestsellers" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">Best Sellers</a>
            <a href="#gallery" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-[#6B4226] dark:hover:text-[#D4A373] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-48 lg:w-60">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8C6D53]" />
              <Input
                placeholder="Search cakes, pizzas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white/80 dark:bg-zinc-800/80 border-[#E6D5C3] dark:border-zinc-700 text-xs rounded-full"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full w-9 h-9 text-[#6B4226] dark:text-amber-400 hover:bg-[#E6D5C3]/40 dark:hover:bg-zinc-800"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#6B4226] hover:bg-[#52321c] text-white rounded-full px-4 h-9 flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold text-xs">Cart</span>
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A373] text-[#2D231E] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                  {cartTotalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EFEA] to-[#FAF7F2] dark:from-zinc-900 dark:to-zinc-950 py-16 md:py-24 border-b border-[#E6D5C3]/50 dark:border-zinc-800">
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E6D5C3]/60 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-[#6B4226] dark:text-[#D4A373] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Patna's Premier Artisanal Bakery & Fast-Food Café
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A2E1B] dark:text-[#F5EBE0] leading-tight mb-6">
              Freshly Baked <br />
              <span className="text-[#8C5835] italic">Happiness Every Day</span>
            </h1>
            <p className="text-base sm:text-lg text-[#665245] dark:text-[#B0A499] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Indulge in our exquisite range of gourmet cakes, molten-cheese pizzas, crunchy burgers, and golden fries. Handcrafted daily with love at Mithapur, Patna.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#6B4226] hover:bg-[#52321c] text-white text-base font-medium px-8 py-6 rounded-xl shadow-lg"
              >
                Order Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
              <img 
                src="https://images.pexels.com/photos/34008843/pexels-photo-34008843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Butterscotch Cake"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Menu Section */}
      <section id="menu" className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#8C5835] dark:text-[#D4A373] text-xs font-bold tracking-widest uppercase block mb-2">Artisanal Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2E1B] dark:text-[#F5EBE0] mb-4">Explore Our Delicious Offerings</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', 'Bestsellers', 'Cakes', 'Pizza', 'Burgers', 'Sides'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
                selectedCategory === cat
                  ? 'bg-[#6B4226] text-white shadow-md scale-105'
                  : 'bg-white dark:bg-zinc-800 text-[#6B4226] dark:text-[#D4A373] border border-[#E6D5C3] dark:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <Card key={item.id} className="h-full flex flex-col overflow-hidden bg-white dark:bg-zinc-800 border-[#E6D5C3] dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden bg-[#FAF7F2] dark:bg-zinc-900">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-[#D4A373] text-[#2D231E] font-bold text-[10px]">Bestseller</Badge>
                )}
              </div>
              <CardContent className="flex-1 flex flex-col justify-between p-5">
                <div>
                  <span className="text-[10px] font-semibold text-[#8C5835] uppercase tracking-wider block mb-1">{item.category}</span>
                  <h3 className="font-serif font-bold text-lg text-[#4A2E1B] dark:text-white mb-2">{item.name}</h3>
                  <p className="text-xs text-[#665245] dark:text-zinc-400 line-clamp-2 mb-4">{item.description}</p>
                </div>
                <div className="pt-4 border-t border-[#FAF7F2] dark:border-zinc-700 flex items-center justify-between">
                  <span className="font-serif font-bold text-xl text-[#6B4226] dark:text-amber-400">₹{item.price}</span>
                  <Button onClick={() => addToCart(item)} className="bg-[#6B4226] hover:bg-[#52321c] text-white text-xs font-semibold px-4 py-2 rounded-xl">
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-20 bg-[#F3EFEA] dark:bg-zinc-950 border-t border-[#E6D5C3]/40">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-bold text-[#4A2E1B] dark:text-[#F5EBE0] mb-6">The Cakery Nook Café</h2>
            <p className="text-xs sm:text-sm text-[#665245] dark:text-zinc-300 mb-6">Road No. 1, Jawahar Colony, Mithapur, Patna, Bihar 800001</p>
            <p className="text-xs sm:text-sm text-[#665245] dark:text-zinc-300 mb-6">Phone: +91 98765 43210</p>
            <Button onClick={() => window.open('https://wa.me/919876543210', '_blank')} className="bg-[#25D366] text-white text-xs font-semibold px-6 py-3 rounded-xl">
              Chat on WhatsApp
            </Button>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[350px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7785233633!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM1JzM4LjgiTiA4NcKwMDguMTYiRQ!5e0!3m2!1sen!2sin!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}





Create all project
