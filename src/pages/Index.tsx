import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter, Star, Clock } from "lucide-react";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";
import movieNeonDreams from "@/assets/movie-neon-dreams.jpg";
import movieShadowRealm from "@/assets/movie-shadow-realm.jpg";
import movieQuantumStrike from "@/assets/movie-quantum-strike.jpg";
import movieStarlightRomance from "@/assets/movie-starlight-romance.jpg";

const movies = [
  {
    id: "neon-dreams",
    title: "Neon Dreams",
    poster: movieNeonDreams,
    genre: "Sci-Fi Thriller",
    rating: "4.8",
    duration: "2h 15m",
    language: "English",
    format: "2D/3D/IMAX"
  },
  {
    id: "shadow-realm",
    title: "Shadow Realm",
    poster: movieShadowRealm,
    genre: "Dark Fantasy",
    rating: "4.6",
    duration: "1h 58m",
    language: "English",
    format: "2D/3D"
  },
  {
    id: "quantum-strike",
    title: "Quantum Strike",
    poster: movieQuantumStrike,
    genre: "Action",
    rating: "4.7",
    duration: "2h 8m",
    language: "English",
    format: "2D/4DX"
  },
  {
    id: "starlight-romance",
    title: "Starlight Romance",
    poster: movieStarlightRomance,
    genre: "Romance",
    rating: "4.5",
    duration: "1h 52m",
    language: "English",
    format: "2D"
  }
];

const genres = ["All", "Action", "Sci-Fi Thriller", "Dark Fantasy", "Romance"];
const languages = ["All", "English", "Spanish", "French"];
const formats = ["All", "2D", "3D", "IMAX", "4DX"];

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesLanguage = selectedLanguage === "All" || movie.language === selectedLanguage;
    const matchesFormat = selectedFormat === "All" || movie.format.includes(selectedFormat);
    
    return matchesSearch && matchesGenre && matchesLanguage && matchesFormat;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cinemaHeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="font-cinematic text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-primary animate-glow-pulse">
                TAP2SEAT
              </h1>
              <p className="text-2xl text-muted-foreground mb-8 font-display">
                Experience Cinema Like Never Before
              </p>
              <div className="flex items-center justify-center gap-2 text-accent-glow mb-8">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Now Showing Near You</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for movies, theaters, or showtimes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg glass-card border-primary/30 focus:border-primary"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="cinema" size="lg" className="neon-glow">
                Book Now
              </Button>
              <Button variant="cinemaSecondary" size="lg">
                View Showtimes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card/50 backdrop-blur-md border-y border-border">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-primary-glow">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-40 glass-card">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 glass-card">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-40 glass-card">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map(format => (
                  <SelectItem key={format} value={format}>{format}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedGenre("All");
                setSelectedLanguage("All");
                setSelectedFormat("All");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-cinematic text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-primary">
              Now Showing
            </h2>
            <p className="text-center text-muted-foreground text-lg">
              Discover the latest blockbusters and exclusive premieres
            </p>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-xl">No movies match your current filters</p>
              <Button 
                variant="cinema" 
                className="mt-4"
                onClick={() => {
                  setSelectedGenre("All");
                  setSelectedLanguage("All");
                  setSelectedFormat("All");
                  setSearchTerm("");
                }}
              >
                Show All Movies
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMovies.map((movie) => (
                <Card 
                  key={movie.id} 
                  className="glass-card group cursor-pointer transition-all duration-500 hover:neon-glow hover:scale-105"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="cinema" size="sm" className="w-full neon-glow">
                        Book Tickets
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-cinematic text-xl font-bold mb-2 text-primary-glow group-hover:text-accent-glow transition-colors">
                      {movie.title}
                    </h3>
                    
                    <div className="space-y-3">
                      <Badge variant="secondary" className="bg-secondary/20">
                        {movie.genre}
                      </Badge>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-medium">{movie.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{movie.duration}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="text-muted-foreground">Available in:</div>
                        <div className="font-medium text-primary-glow">{movie.format}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-glass border-t border-border py-12">
        <div className="container mx-auto px-8 text-center">
          <div className="font-cinematic text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-primary">
            TAP2SEAT
          </div>
          <p className="text-muted-foreground mb-6">
            Your premium cinema booking experience
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary-glow transition-colors">About Us</a>
            <a href="#" className="hover:text-primary-glow transition-colors">Support</a>
            <a href="#" className="hover:text-primary-glow transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-glow transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;