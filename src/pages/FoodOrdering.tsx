import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";
import Navbar from "@/components/Navbar";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const foodItems: FoodItem[] = [
  {
    id: "popcorn-large",
    name: "Large Popcorn",
    price: 8,
    category: "Snacks",
    image: "🍿",
    description: "Freshly popped buttery popcorn"
  },
  {
    id: "nachos-cheese",
    name: "Nachos with Cheese",
    price: 12,
    category: "Snacks",
    image: "🧀",
    description: "Crispy nachos with melted cheese dip"
  },
  {
    id: "soda-large",
    name: "Large Soda",
    price: 6,
    category: "Beverages",
    image: "🥤",
    description: "Your choice of Coke, Sprite, or Orange"
  },
  {
    id: "candy-mix",
    name: "Cinema Candy Mix",
    price: 5,
    category: "Snacks",
    image: "🍬",
    description: "Assorted movie theater candies"
  },
  {
    id: "hot-dog",
    name: "Gourmet Hot Dog",
    price: 10,
    category: "Food",
    image: "🌭",
    description: "All-beef hot dog with premium toppings"
  },
  {
    id: "combo-classic",
    name: "Classic Combo",
    price: 18,
    category: "Combos",
    image: "🍿",
    description: "Large popcorn + Large drink + Candy"
  }
];

const FoodOrdering = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theater = searchParams.get('theater');
  const showtime = searchParams.get('time');
  const seats = searchParams.get('seats');
  
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  const categories = Array.from(new Set(foodItems.map(item => item.category)));

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, quantity]) => {
      const item = foodItems.find(i => i.id === itemId);
      return sum + (item?.price || 0) * quantity;
    }, 0);
  };

  const handleContinue = () => {
    const cartItems = Object.entries(cart).map(([itemId, quantity]) => ({
      itemId,
      quantity,
      item: foodItems.find(i => i.id === itemId)
    }));
    
    const params = new URLSearchParams({
      theater: theater || '',
      time: showtime || '',
      seats: seats || '',
      food: JSON.stringify(cartItems)
    });
    
    navigate(`/checkout/${movieId}?${params.toString()}`);
  };
  return (
    <div className="min-h-screen relative">
      <Navbar title="Food & Beverages" />
      
      {/* Cinema hall background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${cinemaHeroBg})`,
          filter: 'blur(1px) grayscale(30%)',
          opacity: 0.4
        }}
      ></div>
      
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/65 z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-cinematic text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary-glow neon-text">
            Food & Beverages
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Enhance your movie experience with delicious snacks
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Food Menu */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {categories.map(category => (
              <div key={category}>
                <h2 className="font-cinematic text-2xl font-bold mb-4 text-primary-glow">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {foodItems.filter(item => item.category === category).map(item => (
                    <Card key={item.id} className="glass-card hover:neon-glow transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-accent-glow text-xl">
                                ${item.price}
                              </span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={!cart[item.id]}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">
                                  {cart[item.id] || 0}
                                </span>
                                <Button
                                  variant="cinema"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-cinematic text-primary-glow">
                  <ShoppingCart className="w-5 h-5" />
                  Your Order ({getTotalItems()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(cart).length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No items added yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cart).map(([itemId, quantity]) => {
                      const item = foodItems.find(i => i.id === itemId);
                      if (!item) return null;
                      
                      return (
                        <div key={itemId} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price} × {quantity}
                            </div>
                          </div>
                          <div className="font-bold text-accent-glow">
                            ${item.price * quantity}
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-accent-glow">${getTotalPrice()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="cinema" 
                      className="w-full neon-glow animate-pulse-soft"
                      onClick={handleContinue}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate(`/checkout/${movieId}?theater=${theater}&time=${showtime}&seats=${seats}&food=${JSON.stringify({})}`)}
                >
                  Skip Food & Beverages
                </Button>
              </CardContent>
            </Card>
          </div>        </div>
      </div>
      </div>
    </div>
  );
};

export default FoodOrdering;