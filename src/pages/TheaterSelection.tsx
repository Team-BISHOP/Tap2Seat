import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from "lucide-react";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";

const theaters = [
  {
    id: "cinema-city",
    name: "Cinema City Premium",
    location: "Downtown Plaza, Level 3",
    distance: "2.1 km",
    rating: "4.8",
    amenities: ["IMAX", "Dolby Atmos", "Recliner Seats"],
    showtimes: ["10:30 AM", "2:15 PM", "6:00 PM", "9:45 PM"]
  },
  {
    id: "star-cinema",
    name: "Star Cinema Complex",
    location: "Mall of Dreams, Wing B",
    distance: "3.5 km",
    rating: "4.6",
    amenities: ["4DX", "VIP Lounge", "Premium Sound"],
    showtimes: ["11:00 AM", "3:30 PM", "7:15 PM", "10:30 PM"]
  },
  {
    id: "royal-theater",
    name: "Royal Theater Experience",
    location: "Heritage Center",
    distance: "5.2 km",
    rating: "4.9",
    amenities: ["Private Boxes", "Butler Service", "Gourmet Menu"],
    showtimes: ["10:45 AM", "2:30 PM", "6:15 PM", "9:30 PM"]
  }
];

const TheaterSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTime = searchParams.get('time');
  
  const [selectedTheater, setSelectedTheater] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] = useState<string>(selectedTime || "");

  const handleBooking = () => {
    if (selectedTheater && selectedShowtime) {
      navigate(`/seats/${movieId}?theater=${selectedTheater}&time=${selectedShowtime}`);
    }
  };
  return (
    <div className="min-h-screen relative">
      {/* Cinema hall background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${cinemaHeroBg})`,
          filter: 'blur(1px) grayscale(25%)',
          opacity: 0.4
        }}
      ></div>
      
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/65 z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-cinematic text-4xl font-bold mb-4 text-primary-glow neon-text">
            Select Theater & Showtime
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred cinema location and show timing
          </p>
        </div>

        {/* Theater Cards */}
        <div className="grid gap-6 mb-8">
          {theaters.map((theater) => (
            <Card 
              key={theater.id} 
              className={`glass-card cursor-pointer transition-all duration-300 ${
                selectedTheater === theater.id ? 'neon-glow border-primary' : 'hover:neon-glow'
              }`}
              onClick={() => setSelectedTheater(theater.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-cinematic text-primary-glow mb-2">
                      {theater.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{theater.location}</span>
                      <span className="text-accent">({theater.distance})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{theater.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {theater.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="bg-secondary/20">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium mb-3 text-primary-glow">Available Showtimes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {theater.showtimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedShowtime === time ? "cinema" : "outline"}
                        size="sm"
                        className={`transition-all duration-300 ${
                          selectedShowtime === time ? 'neon-glow' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShowtime(time);
                        }}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selection Summary & Continue */}
        {selectedTheater && selectedShowtime && (
          <Card className="glass-card accent-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinematic text-xl text-primary-glow mb-2">
                    Your Selection
                  </h3>
                  <p className="text-muted-foreground">
                    {theaters.find(t => t.id === selectedTheater)?.name} • {selectedShowtime}
                  </p>
                </div>
                <Button 
                  variant="cinema" 
                  size="lg"
                  className="neon-glow animate-pulse-soft"
                  onClick={handleBooking}
                >
                  Continue to Seat Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}      </div>
      </div>
    </div>
  );
};

export default TheaterSelection;