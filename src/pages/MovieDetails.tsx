import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Star, Calendar } from "lucide-react";
import movieNeonDreams from "@/assets/movie-neon-dreams.jpg";
import movieShadowRealm from "@/assets/movie-shadow-realm.jpg";
import movieQuantumStrike from "@/assets/movie-quantum-strike.jpg";
import movieStarlightRomance from "@/assets/movie-starlight-romance.jpg";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";

const movies = {
  "neon-dreams": {
    title: "Neon Dreams",
    poster: movieNeonDreams,
    rating: "4.8",
    duration: "2h 15m",
    genre: "Sci-Fi Thriller",
    description: "In a world where reality and digital dreams collide, a hacker discovers the ultimate conspiracy that threatens both worlds.",
    showtimes: ["10:30 AM", "2:15 PM", "6:00 PM", "9:45 PM"]
  },
  "shadow-realm": {
    title: "Shadow Realm",
    poster: movieShadowRealm,
    rating: "4.6",
    duration: "1h 58m",
    genre: "Dark Fantasy",
    description: "Ancient shadows awaken to reclaim a world that has forgotten their power and terror.",
    showtimes: ["11:00 AM", "3:30 PM", "7:15 PM", "10:30 PM"]
  },
  "quantum-strike": {
    title: "Quantum Strike",
    poster: movieQuantumStrike,
    rating: "4.7",
    duration: "2h 8m",
    genre: "Action",
    description: "Elite agents must prevent a quantum weapon from destroying the fabric of reality itself.",
    showtimes: ["10:45 AM", "2:30 PM", "6:15 PM", "9:30 PM"]
  },
  "starlight-romance": {
    title: "Starlight Romance",
    poster: movieStarlightRomance,
    rating: "4.5",
    duration: "1h 52m",
    genre: "Romance",
    description: "Two souls find love under the starlight, defying time and space to be together.",
    showtimes: ["11:15 AM", "3:00 PM", "6:45 PM", "9:15 PM"]
  }
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  
  const movie = movies[movieId as keyof typeof movies];
  
  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Movie not found</div>;
  }
  return (
    <div className="min-h-screen relative">      {/* Cinema hall background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${theaterSeatsBg})`,
          filter: 'blur(1px) grayscale(20%)',
          opacity: 0.4
        }}
      ></div>
      
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/60 z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="relative h-full flex items-end p-8">
          <div className="max-w-4xl">
            <h1 className="font-cinematic text-6xl font-bold mb-4 text-primary-glow neon-text">
              {movie.title}
            </h1>
            <div className="flex items-center gap-6 mb-6 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{movie.duration}</span>
              </div>
              <span className="px-3 py-1 bg-primary/20 rounded-full text-primary-glow">
                {movie.genre}
              </span>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              {movie.description}
            </p>
            
            <div className="flex gap-4">
              <Button variant="cinema" size="lg" className="neon-glow">
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </Button>
              <Button 
                variant="cinemaSecondary" 
                size="lg"
                onClick={() => navigate(`/theater/${movieId}`)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-8 py-12">
        <Tabs defaultValue="showtimes" className="w-full">
          <TabsList className="glass-card mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
            <TabsTrigger value="trailer">Trailer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Movie Overview</h3>
                <p className="text-muted-foreground leading-7">
                  {movie.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="showtimes">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.showtimes.map((time, index) => (
                <Card key={index} className="glass-card hover:neon-glow cursor-pointer transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary-glow mb-2">{time}</div>
                    <Button 
                      variant="cinema" 
                      className="w-full"
                      onClick={() => navigate(`/theater/${movieId}?time=${time}`)}
                    >
                      Select Time
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trailer">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <p className="text-lg text-muted-foreground">Trailer Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>        </Tabs>
      </div>
      </div>
    </div>
  );
};

export default MovieDetails;