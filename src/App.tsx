import React, { useState, useEffect } from 'react';
import { 
  Wine, 
  ShoppingBag, 
  Star, 
  Heart, 
  Search, 
  ArrowRight, 
  Award, 
  Truck, 
  Shield, 
  Clock,
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
  Eye,
  Filter
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const products = [
    {
      id: 1,
      name: "Macallan 25",
      category: "whiskey",
      price: 9000,
      originalPrice: 12000,
      image: "https://brand-assets.edrington.com/transform/fbbe6de1-b848-4318-af41-5ed9022276c9/MAC-2023-REV-25YO-Sherry-Oak-BottleBox-Front-NO-REFLECTION-1000x1000-png-72dpi-WEB-2xl?quality=100&io=transform%3Afit%2Cwidth%3A1176%2Cheight%3A1176",
      rating: 4.9,
      reviews: 127,
      description: "Exceptional single malt aged in hand-selected sherry oak casks. Rich amber with notes of dried fruits and dark chocolate.",
      badge: "Limited",
      inStock: true,
      category_display: "Single Malt"
    },
    {
      id: 2,
      name: "Dom Pérignon 2013",
      category: "champagne",
      price: 299,
      originalPrice: 349,
      image: "https://cdn.sanity.io/images/1p5qvg3x/ww/65dda22dace8ce43ba0e262bfa553c421b937f77-901x891.jpg?rect=6,0,891,891&w=2400&h=2400&q=75&fit=crop&auto=format",
      rating: 4.8,
      reviews: 89,
      description: "Prestigious vintage champagne with delicate bubbles and citrus notes. Perfect for special celebrations.",
      badge: "Vintage",
      inStock: true,
      category_display: "Champagne"
    },
    {
      id: 3,
      name: "Hennessy Paradis",
      category: "cognac",
      price: 899,
      originalPrice: 999,
      image: "https://i.ytimg.com/vi/65WLjg8or8Q/maxresdefault.jpg",
      rating: 4.9,
      reviews: 156,
      description: "Exceptional blend of over 100 rare eaux-de-vie with hints of jasmine and orange blossom.",
      badge: "Premium",
      inStock: false,
      category_display: "Cognac"
    },
    {
      id: 4,
      name: "Château Margaux",
      category: "wine",
      price: 799,
      originalPrice: 899,
      image: "https://m.media-amazon.com/images/I/31tG0M5ZXDL._UF1000,1000_QL80_.jpg",
      rating: 5.0,
      reviews: 203,
      description: "Legendary Bordeaux with elegant tannins and exceptional aging potential.",
      badge: "98pts",
      inStock: true,
      category_display: "Bordeaux"
    },
    {
      id: 5,
      name: "Grey Goose",
      category: "vodka",
      price: 189,
      originalPrice: 219,
      image: "https://mansionz.in/cdn/shop/files/GREYGOOSEVODKA.jpg?v=1715074807",
      rating: 4.7,
      reviews: 94,
      description: "Premium French vodka crafted from winter wheat with smooth, clean taste.",
      badge: "Staff Pick",
      inStock: true,
      category_display: "Premium Vodka"
    },
    {
      id: 6,
      name: "Johnnie Walker Blue",
      category: "whiskey",
      price: 199,
      originalPrice: 229,
      image: "https://static.livcheers.com/static/content/images/brand-content/johnnie-walker/Photo-3.webp",
      rating: 4.6,
      reviews: 312,
      description: "Rare blend of Scotland's finest whiskies with honeyed sweetness and hints of smoke.",
      badge: "Classic",
      inStock: true,
      category_display: "Blended Scotch"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', count: products.length },
    { id: 'whiskey', name: 'Whiskey', count: products.filter(p => p.category === 'whiskey').length },
    { id: 'wine', name: 'Wine', count: products.filter(p => p.category === 'wine').length },
    { id: 'champagne', name: 'Champagne', count: products.filter(p => p.category === 'champagne').length },
    { id: 'cognac', name: 'Cognac', count: products.filter(p => p.category === 'cognac').length },
    { id: 'vodka', name: 'Vodka', count: products.filter(p => p.category === 'vodka').length }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                  <Wine className="w-7 h-7 text-black" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">ELIXIR</h1>
                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">Premium Spirits</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <a href="#home" className="nav-link">Home</a>
              <a href="#collection" className="nav-link">Collection</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-3 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <button className="relative p-3 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <button 
                className="lg:hidden p-3 hover:bg-white/10 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/10`}>
          <div className="px-6 py-8 space-y-6">
            <a href="#home" className="block text-lg hover:text-amber-400 transition-colors duration-300">Home</a>
            <a href="#collection" className="block text-lg hover:text-amber-400 transition-colors duration-300">Collection</a>
            <a href="#about" className="block text-lg hover:text-amber-400 transition-colors duration-300">About</a>
            <a href="#contact" className="block text-lg hover:text-amber-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-55"></div>
          {/* <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/87224/pexels-photo-87224.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-30"></div> */}
        </div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-amber-400 font-medium tracking-widest uppercase text-sm">Premium Collection</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
                RARE
                <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  SPIRITS
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Discover the world's most exceptional spirits, curated by experts and delivered with uncompromising quality.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 transform hover:scale-105">
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              <button className="group px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-500">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Truck className="w-8 h-8" />, title: "Free Delivery", desc: "Orders over 200" },
              { icon: <Shield className="w-8 h-8" />, title: "Authentic", desc: "100% genuine" },
              { icon: <Clock className="w-8 h-8" />, title: "Same Day", desc: "Select areas" },
              { icon: <Award className="w-8 h-8" />, title: "Curated", desc: "Expert selection" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 hover:border-amber-400/30 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-amber-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">Premium Selection</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Handpicked spirits from the world's most prestigious distilleries
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/25'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                // className="group bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 hover:border-amber-400/30 transition-all duration-700 transform hover:-translate-y-4 overflow-visible animate-fade-in-up"
                className="group bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 hover:border-amber-400/30 transition-all duration-700 transform hover:-translate-y-4 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-3xl ">

                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-sm font-bold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                    <button 
                      onClick={() => toggleLike(product.id)}
                      className={`p-3 rounded-full backdrop-blur-xl transition-all duration-300 ${
                        likedProducts.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-xl text-white rounded-full hover:bg-white/30 transition-all duration-300">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Quick Add */}
                  {/* <div className="absolute bottom-6 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div> */}
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">
                      {product.category_display}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="ml-1 text-sm font-bold text-gray-300">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-black text-white">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      product.inStock 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Sold Out'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">Our Story</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                Crafting Excellence Since 1985
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                For nearly four decades, ELIXIR has been the premier destination for discerning 
                connoisseurs seeking the world's finest spirits. Our passion for quality and 
                commitment to authenticity has made us the trusted choice for collectors worldwide.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    38+
                  </div>
                  <div className="text-gray-400 font-medium">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    2.5K+
                  </div>
                  <div className="text-gray-400 font-medium">Bottles</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    50K+
                  </div>
                  <div className="text-gray-400 font-medium">Customers</div>
                </div>
              </div>
              
              <button className="group bg-gradient-to-r from-amber-400 to-orange-500 text-black px-10 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-500 transform hover:scale-105">
                <span className="flex items-center">
                  Our Story
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
            
            <div className="relative animate-fade-in-up">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/63633/bar-local-cong-ireland-63633.jpeg" 
                  alt="Premium spirits collection"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-amber-400 to-orange-500 text-black p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <Award className="w-10 h-10" />
                    <div>
                      <div className="font-black text-xl">Award Winning</div>
                      <div className="text-black/70 font-medium">Collection</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-black/70 mb-12">
              Be the first to know about new arrivals and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-4 rounded-full text-black placeholder-black/50 bg-white/20 backdrop-blur-xl border border-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-300"
              />
              <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Wine className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ELIXIR</h3>
                  <p className="text-sm text-gray-400 tracking-widest uppercase">Premium Spirits</p>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Curating the world's finest spirits since 1985. Experience excellence in every bottle.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#home" className="hover:text-amber-400 transition-colors duration-300">Home</a></li>
                <li><a href="#collection" className="hover:text-amber-400 transition-colors duration-300">Collection</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-colors duration-300">About</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Whiskey</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Wine</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Spirits</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Champagne</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <div className="space-y-4 text-gray-400">
                <p>Patankar park<br />Nallasopara, IN 401303</p>
                <p>Phone: (+91) 123-456-789</p>
                <p>Email: support@elixir.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ELIXIR. All rights reserved. Please drink responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;