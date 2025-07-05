import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Users, MapPin } from "lucide-react";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import Navbar from "@/components/Navbar";

const SeatSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theater = searchParams.get('theater');
  const showtime = searchParams.get('time');
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [suggestedSeats, setSuggestedSeats] = useState<string[]>([]);
  const [numberOfSeats, setNumberOfSeats] = useState<number>(2);
  const [preferredArea, setPreferredArea] = useState<string>('center');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate seat map (8 rows, 12 seats each)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  // Mock occupied seats
  const occupiedSeats = ['A3', 'A4', 'B7', 'C5', 'C6', 'E8', 'F2', 'G9', 'G10'];
  
  // Best seats (center area)
  const bestSeats = ['D5', 'D6', 'D7', 'D8', 'E5', 'E6', 'E7', 'E8'];

  // Smart seat suggestion algorithm
  const getSeatCoordinates = (seatId: string) => {
    const row = seatId.charAt(0);
    const seatNumber = parseInt(seatId.slice(1));
    const rowIndex = rows.indexOf(row);
    return { row: rowIndex, seat: seatNumber - 1 };
  };

  const getSeatScore = (seatId: string, groupSize: number, preference: string) => {
    const { row, seat } = getSeatCoordinates(seatId);
    let score = 0;

    // Center preference scoring
    const centerRow = Math.floor(rows.length / 2);
    const centerSeat = Math.floor(seatsPerRow / 2);
    
    if (preference === 'center') {
      // Higher score for center seats
      score += 100 - Math.abs(row - centerRow) * 10;
      score += 100 - Math.abs(seat - centerSeat) * 5;
    } else if (preference === 'front') {
      // Higher score for front seats
      score += 100 - row * 15;
      score += 80 - Math.abs(seat - centerSeat) * 3;
    } else if (preference === 'back') {
      // Higher score for back seats
      score += 50 + row * 15;
      score += 80 - Math.abs(seat - centerSeat) * 3;
    } else if (preference === 'aisle') {
      // Higher score for aisle seats
      if (seat === 0 || seat === seatsPerRow - 1) {
        score += 150;
      } else if (seat === 1 || seat === seatsPerRow - 2) {
        score += 100;
      }
    }

    // Bonus for best seats
    if (bestSeats.includes(seatId)) {
      score += 50;
    }

    // Penalty for being near occupied seats
    for (const occupiedSeat of occupiedSeats) {
      const occupiedCoords = getSeatCoordinates(occupiedSeat);
      const distance = Math.sqrt(
        Math.pow(row - occupiedCoords.row, 2) + 
        Math.pow(seat - occupiedCoords.seat, 2)
      );
      if (distance < 2) {
        score -= 30;
      }
    }

    return score;
  };

  const findBestSeatGroup = (groupSize: number, preference: string): string[] => {
    const availableSeats = [];
    
    // Generate all available seats
    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        if (!occupiedSeats.includes(seatId) && !selectedSeats.includes(seatId)) {
          availableSeats.push(seatId);
        }
      }
    }

    let bestGroup: string[] = [];
    let bestScore = -1;

    // Try all possible combinations for the group
    for (let i = 0; i <= availableSeats.length - groupSize; i++) {
      const group = [];
      let groupScore = 0;
      let isValidGroup = true;

      // Check if seats are consecutive in the same row
      for (let j = 0; j < groupSize; j++) {
        const currentSeat = availableSeats[i + j];
        if (!currentSeat) {
          isValidGroup = false;
          break;
        }

        const currentCoords = getSeatCoordinates(currentSeat);
        
        if (j > 0) {
          const prevCoords = getSeatCoordinates(group[j - 1]);
          // Check if in same row and consecutive
          if (currentCoords.row !== prevCoords.row || 
              currentCoords.seat !== prevCoords.seat + 1) {
            isValidGroup = false;
            break;
          }
        }

        group.push(currentSeat);
        groupScore += getSeatScore(currentSeat, groupSize, preference);
      }

      // Bonus for keeping the group together
      if (isValidGroup && group.length === groupSize) {
        groupScore += 100;
        
        if (groupScore > bestScore) {
          bestScore = groupScore;
          bestGroup = [...group];
        }
      }
    }

    // If no consecutive seats found, try to find close seats
    if (bestGroup.length === 0) {
      const sortedSeats = availableSeats
        .map(seat => ({ seat, score: getSeatScore(seat, groupSize, preference) }))
        .sort((a, b) => b.score - a.score);
      
      bestGroup = sortedSeats.slice(0, groupSize).map(item => item.seat);
    }

    return bestGroup;
  };

  const handleSmartSuggestion = () => {
    // Clear any existing suggestions first
    setSuggestedSeats([]);
    setIsLoading(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      const suggested = findBestSeatGroup(numberOfSeats, preferredArea);
      setSuggestedSeats(suggested);
      setIsLoading(false);
    }, 800);
  };

  const applySuggestion = () => {
    setSelectedSeats(suggestedSeats);
    setSuggestedSeats([]);
  };

  const clearSuggestion = () => {
    setSuggestedSeats([]);
  };

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    if (suggestedSeats.includes(seatId)) return 'suggested';
    if (bestSeats.includes(seatId)) return 'best';
    return 'available';
  };

  const getSeatClass = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-seat-occupied cursor-not-allowed';
      case 'selected':
        return 'bg-seat-selected animate-seat-bounce neon-glow cursor-pointer';
      case 'suggested':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-300 animate-pulse cursor-pointer hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-yellow-500/60 text-black font-bold';
      case 'best':
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
    <div className="min-h-screen">
      <Navbar title="Select Seats" />
      
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${theaterSeatsBg})` }}
      />
      <div className="fixed inset-0 bg-background/80" />
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="font-cinematic text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary-glow neon-text">
              Select Your Seats
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Tap to select your preferred seats
            </p>
          </div>

          {/* Smart Seat Suggestion */}
          <Card className="glass-card mb-6 sm:mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center font-cinematic text-primary-glow flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Smart Seat Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Number of Seats
                    </label>
                    <Select value={numberOfSeats.toString()} onValueChange={(value) => setNumberOfSeats(parseInt(value))}>
                      <SelectTrigger className="glass-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Seat' : 'Seats'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Preferred Area
                    </label>
                    <Select value={preferredArea} onValueChange={setPreferredArea}>
                      <SelectTrigger className="glass-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="center">Center (Best View)</SelectItem>
                        <SelectItem value="front">Front Rows</SelectItem>
                        <SelectItem value="back">Back Rows</SelectItem>
                        <SelectItem value="aisle">Aisle Seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleSmartSuggestion}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Finding Best Seats...' : 'Find Best Seats'}
                  </Button>
                  
                  {suggestedSeats.length > 0 && (
                    <>
                      <Button 
                        onClick={applySuggestion}
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                      >
                        Apply Suggestion
                      </Button>
                      <Button 
                        onClick={clearSuggestion}
                        variant="ghost"
                        className="text-muted-foreground"
                      >
                        Clear
                      </Button>
                    </>
                  )}
                </div>

                {suggestedSeats.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-2 font-medium">
                      ✨ Suggested seats: {suggestedSeats.join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      These seats are optimized for your preferences and provide the best viewing experience.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Screen */}
          <div className="mb-8 sm:mb-12">
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-gradient-primary h-3 sm:h-4 rounded-t-3xl mb-3 sm:mb-4 opacity-80" />
              <p className="text-center text-muted-foreground text-sm sm:text-base">SCREEN</p>
            </div>
          </div>

          {/* Seat Map */}
          <div className="mb-6 sm:mb-8">
            <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-border">
              <div className="space-y-2 sm:space-y-4">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-1 sm:gap-2">
                    <div className="w-6 sm:w-8 text-center font-bold text-primary-glow text-sm sm:text-base">{row}</div>
                    <div className="flex gap-1 sm:gap-2">
                      {Array.from({ length: seatsPerRow }, (_, index) => {
                        const seatNumber = index + 1;
                        const seatId = `${row}${seatNumber}`;
                        const status = getSeatStatus(seatId);
                        
                        return (
                          <button
                            key={seatId}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border transition-all duration-300 ${getSeatClass(status)}`}
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
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-seat-available rounded" />
              <span className="text-xs sm:text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-seat-selected rounded animate-pulse" />
              <span className="text-xs sm:text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 border border-yellow-400 rounded animate-pulse" />
              <span className="text-xs sm:text-sm">Suggested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-seat-occupied rounded" />
              <span className="text-xs sm:text-sm">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-seat-available border-2 border-accent/50 rounded animate-pulse shadow-accent-glow" />
              <span className="text-xs sm:text-sm">Best Seats</span>
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