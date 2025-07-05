import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";
import ImageTest from "@/components/ImageTest";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">      {/* Direct background test */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${cinemaHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      ></div>
      
      {/* Simple dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Enhanced background with cinema elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Film strip decorative elements */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
        
        {/* Floating cinema orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-xl animate-pulse floating-orb"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-xl animate-pulse delay-1000 floating-orb-reverse"></div>
        <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse delay-2000 floating-orb-slow"></div>
        
        {/* Cinema spotlight effects */}
        <div className="absolute top-0 left-1/2 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full transform -translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-radial from-accent/10 to-transparent rounded-full animate-pulse delay-1500"></div>
        
        {/* Film reel decorations */}
        <div className="absolute top-20 right-20 w-16 h-16 border-4 border-dashed border-accent/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-4 border-dashed border-secondary/30 rounded-full animate-spin-slow animate-reverse"></div>
      </div>
      
      <div className="text-center glass-card p-12 rounded-2xl neon-glow relative z-10 max-w-2xl mx-8">
        <ImageTest />
        {/* Cinema-themed 404 */}
        <div className="font-cinematic text-8xl font-bold mb-6 text-primary-glow neon-text relative">
          404
          {/* Film frame decoration */}
          <div className="absolute -inset-4 border-2 border-dashed border-accent/30 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            🎬 Scene Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-md mx-auto">
            The page you're looking for has been edited out of this production. 
            Let's get you back to the main feature!
          </p>
          
          {/* Cinema-themed error details */}
          <div className="bg-secondary/10 rounded-lg p-4 mb-6 border border-secondary/20">
            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-bold">Director's Note:</span> This scene ({location.pathname}) 
              doesn't exist in our current screenplay.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground font-bold rounded-lg hover:scale-105 transition-all duration-300 neon-glow group"
          >
            <span className="text-xl">�</span>
            <span>Back to Cinema</span>
            <div className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
              →
            </div>
          </a>
          <a 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary/20 text-secondary-glow border border-secondary/30 rounded-lg hover:bg-secondary/30 transition-all duration-300 creative-border group"
          >
            <span className="text-xl">�</span>
            <span>Browse Movies</span>
            <div className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
              →
            </div>
          </a>
        </div>
        
        {/* Fun cinema fact */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-card-glass rounded-full px-4 py-2 text-sm text-muted-foreground">
            <span className="text-accent">🎥 Did you know?</span> The first 404 error was like a missing film reel!
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
