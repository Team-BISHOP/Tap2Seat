import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, MapPin, QrCode } from "lucide-react";

const Confirmation = () => {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const total = searchParams.get('total');
  
  const bookingId = `TAP2SEAT${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-seat-selected rounded-full mb-4 animate-seat-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-cinematic text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-primary">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your tickets have been successfully booked
          </p>
        </div>

        {/* Digital Ticket */}
        <Card className="glass-card accent-glow mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="font-cinematic text-2xl font-bold text-primary-glow">TAP2SEAT</div>
            </div>
            <CardTitle className="font-cinematic text-xl text-accent-glow">
              Digital Cinema Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Section */}
            <div className="flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <QrCode className="w-24 h-24 text-black" />
              </div>
            </div>
            
            {/* Ticket Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Movie</div>
                <div className="font-medium capitalize text-primary-glow">
                  {movieId?.replace('-', ' ')}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Booking ID</div>
                <div className="font-medium text-accent-glow">{bookingId}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div className="font-medium">{currentDate}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Time</div>
                <div className="font-medium">{currentTime}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Theater</div>
                <div className="font-medium">Cinema City Premium</div>
              </div>
              <div>
                <div className="text-muted-foreground">Seats</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    D6
                  </Badge>
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    D7
                  </Badge>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="text-center p-4 bg-card-glass rounded-lg">
              <div className="text-sm text-muted-foreground">Total Paid</div>
              <div className="text-2xl font-bold text-accent-glow">${total}</div>
            </div>

            {/* Snack Order */}
            <div className="text-center p-3 bg-secondary/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Snack Order #</div>
              <div className="font-bold text-primary-glow">SN{Date.now().toString().slice(-4)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Show this at the concession stand
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="cinema" size="lg" className="neon-glow">
              <Download className="w-5 h-5 mr-2" />
              Save Ticket
            </Button>
            <Button variant="cinemaSecondary" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              View Route to Cinema
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Book Another Movie
          </Button>
        </div>

        {/* Important Notes */}
        <Card className="glass-card mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold mb-4 text-primary-glow">Important Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Please arrive 15 minutes before showtime</li>
              <li>• Present this QR code at the entrance</li>
              <li>• Snacks can be collected with your order number</li>
              <li>• Tickets are non-refundable</li>
              <li>• Contact support for any issues: support@tap2seat.com</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;