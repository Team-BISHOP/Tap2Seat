import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Fingerprint } from "lucide-react";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";

const paymentMethods = [
  {
    id: "frimi",
    name: "Frimi",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Pay with your mobile wallet"
  },
  {
    id: "genie",
    name: "Genie",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Digital payment platform"
  },
  {
    id: "ez-cash",
    name: "eZ Cash",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Mobile money transfer"
  }
];

const Checkout = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const theater = searchParams.get('theater');
  const showtime = searchParams.get('time');
  const seats = searchParams.get('seats')?.split(',') || [];
  const foodData = searchParams.get('food');
  
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [showFingerprint, setShowFingerprint] = useState(false);

  let foodItems: any[] = [];
  try {
    if (foodData && foodData !== '{}') {
      foodItems = JSON.parse(foodData);
    }
  } catch (e) {
    console.error('Failed to parse food data');
  }

  const ticketPrice = seats.length * 15;
  const foodTotal = foodItems.reduce((sum: number, item: any) => 
    sum + ((item.item?.price || 0) * item.quantity), 0
  );
  const servicesFee = 2.50;
  const totalAmount = ticketPrice + foodTotal + servicesFee;

  const handleConfirmBooking = () => {
    if (!selectedPayment) return;
    
    setShowFingerprint(true);
    setTimeout(() => {
      navigate(`/confirmation/${movieId}?total=${totalAmount}`);
    }, 3000);
  };

  if (showFingerprint) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-6">
              <Fingerprint className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-primary animate-pulse-soft" />
            </div>
            <h2 className="font-cinematic text-xl sm:text-2xl font-bold mb-4 text-primary-glow">
              Touch to Confirm
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Place your finger on the sensor to complete your booking
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Processing payment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen relative">      {/* Cinema hall background */}
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
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-cinematic text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary-glow neon-text">
            Checkout
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Review your booking and complete payment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Movie & Theater Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-cinematic text-primary-glow">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Movie</div>
                    <div className="font-medium capitalize text-sm sm:text-base">{movieId?.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Theater</div>
                    <div className="font-medium capitalize text-sm sm:text-base">{theater?.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Showtime</div>
                    <div className="font-medium text-sm sm:text-base">{showtime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Seats</div>
                    <div className="flex flex-wrap gap-1">
                      {seats.map(seat => (
                        <Badge key={seat} variant="default" className="bg-primary text-primary-foreground text-xs">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Food Items */}
            {foodItems.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-cinematic text-primary-glow">Food & Beverages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {foodItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm sm:text-base">{item.item?.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                        <div className="font-bold text-accent-glow text-sm sm:text-base">
                          ${(item.item?.price || 0) * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-cinematic text-primary-glow">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedPayment === method.id
                          ? 'border-primary bg-primary/10 neon-glow'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-primary flex-shrink-0">{method.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base">{method.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">
                            {method.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <Card className="glass-card lg:sticky lg:top-8">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-cinematic text-primary-glow text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Tickets ({seats.length})</span>
                  <span>${ticketPrice}</span>
                </div>
                
                {foodTotal > 0 && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Food & Beverages</span>
                    <span>${foodTotal}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                  <span>Service Fee</span>
                  <span>${servicesFee}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent-glow">${totalAmount}</span>
                </div>
                
                <Button 
                  variant="cinema" 
                  className="w-full neon-glow shimmer animate-pulse-soft"
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={!selectedPayment}
                >
                  <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Confirm Booking</span>
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  You will be charged ${totalAmount} for this booking
                </p>
              </CardContent>
            </Card>
          </div>        </div>
      </div>
      </div>
    </div>
  );
};

export default Checkout;