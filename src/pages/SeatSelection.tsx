import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";

const SeatSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theater = searchParams.get('theater');
  const showtime = searchParams.get('time');
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat map (8 rows, 12 seats each)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  // Mock occupied seats
  const occupiedSeats = ['A3', 'A4', 'B7', 'C5', 'C6', 'E8', 'F2', 'G9', 'G10'];
  
  // Best seats (center area)
  const bestSeats = ['D5', 'D6', 'D7', 'D8', 'E5', 'E6', 'E7', 'E8'];

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    if (bestSeats.includes(seatId)) return 'best';
    return 'available';
  };

  const getSeatClass = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-seat-occupied cursor-not-allowed';
      case 'selected':
        return 'bg-seat-selected animate-seat-bounce neon-glow cursor-pointer';      case 'best':
        return 'bg-seat-available animate-glow-pulse cursor-pointer border-2 border-accent/50 shadow-accent-glow hover:border-accent hover:shadow-lg transition-all duration-300';
      default:
        return 'bg-seat-available hover:bg-primary-glow cursor-pointer hover:animate-seat-bounce';
    }
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === 'occupied') return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * 15; // $15 per seat

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate(`/food/${movieId}?theater=${theater}&time=${showtime}&seats=${selectedSeats.join(',')}`);
    }
  };

  return (
    <div className="min-h-screen">      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${theaterSeatsBg})` }}
      />
      <div className="fixed inset-0 bg-background/80" />
      
      <div className="relative z-10 p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-cinematic text-4xl font-bold mb-4 text-primary-glow neon-text">
              Select Your Seats
            </h1>
            <p className="text-muted-foreground text-lg">
              Tap to select your preferred seats
            </p>
          </div>

          {/* Screen */}
          <div className="mb-12">
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-gradient-primary h-4 rounded-t-3xl mb-4 opacity-80" />
              <p className="text-center text-muted-foreground">SCREEN</p>
            </div>
          </div>

          {/* Seat Map */}
          <div className="mb-8">
            <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-border">
              <div className="space-y-4">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    <div className="w-8 text-center font-bold text-primary-glow">{row}</div>
                    <div className="flex gap-2">
                      {Array.from({ length: seatsPerRow }, (_, index) => {
                        const seatNumber = index + 1;
                        const seatId = `${row}${seatNumber}`;
                        const status = getSeatStatus(seatId);
                        
                        return (
                          <button
                            key={seatId}
                            className={`w-8 h-8 rounded-lg border transition-all duration-300 ${getSeatClass(status)}`}
                            onClick={() => handleSeatClick(seatId)}
                            disabled={status === 'occupied'}
                          >
                            <span className="text-xs font-bold">
                              {seatNumber}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-available rounded" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-selected rounded animate-pulse" />
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-occupied rounded" />
              <span className="text-sm">Occupied</span>
            </div>            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-seat-available border-2 border-accent/50 rounded animate-pulse shadow-accent-glow" />
              <span className="text-sm">Best Seats</span>
            </div>
          </div>

          {/* Selection Summary */}
          {selectedSeats.length > 0 && (
            <Card className="glass-card accent-glow max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center font-cinematic text-primary-glow">
                  Your Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {selectedSeats.map((seat) => (
                        <Badge key={seat} variant="default" className="bg-primary text-primary-foreground">
                          Seat {seat}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-accent-glow">
                      Total: ${totalPrice}
                    </div>
                  </div>
                  <Button 
                    variant="cinema" 
                    size="lg"
                    className="neon-glow animate-pulse-soft w-full md:w-auto"
                    onClick={handleContinue}
                  >
                    Continue to Food & Beverages
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;