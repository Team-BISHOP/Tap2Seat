import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Calendar, MapPin, Star, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import CinematicBackground from './CinematicBackground';

interface CinematicHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  showQuickActions?: boolean;
  featuredMovie?: {
    title: string;
    genre: string;
    rating: string;
    poster: string;
  };
  onBookNow?: () => void;
  onViewShowtimes?: () => void;
  onFindTheaters?: () => void;
}

const CinematicHero: React.FC<CinematicHeroProps> = ({
  title,
  subtitle,
  description,
  className,
  showQuickActions = true,
  featuredMovie,
  onBookNow,
  onViewShowtimes,
  onFindTheaters
}) => {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}>
      {/* Background Effects */}
      <CinematicBackground variant="animated" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-cinematic text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-primary-glow neon-text animate-pulse">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-3 sm:mb-4">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>        {/* Featured Movie Preview */}
        {featuredMovie && (
          <div className="mb-8 glass-card p-6 rounded-2xl max-w-md mx-auto neon-glow relative overflow-hidden group">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 rounded-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="absolute inset-0.5 bg-background/90 rounded-2xl"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="relative">
                <img 
                  src={featuredMovie.poster} 
                  alt={featuredMovie.title}
                  className="w-16 h-20 rounded-lg object-cover shadow-lg"
                />
                {/* Film strip decoration */}
                <div className="absolute -top-1 -left-1 w-2 h-22 bg-gradient-to-b from-accent/50 to-transparent rounded-l-lg"></div>
                <div className="absolute -top-1 -right-1 w-2 h-22 bg-gradient-to-b from-secondary/50 to-transparent rounded-r-lg"></div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground mb-1">{featuredMovie.title}</h3>
                <Badge variant="secondary" className="mb-2 bg-secondary/20 text-secondary-glow border border-secondary/30">{featuredMovie.genre}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium text-accent-glow">{featuredMovie.rating}</span>
                  <span className="text-xs ml-2 text-muted-foreground">★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Button 
              variant="cinema" 
              size="lg" 
              className="group hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={onBookNow}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">Book Now</span>
            </Button>
            <Button 
              variant="cinemaSecondary" 
              size="lg"
              className="group hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={onViewShowtimes}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">View Showtimes</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={onFindTheaters}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">Discover Movies</span>
            </Button>
          </div>
        )}

        {/* Cinema Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="glass-card p-3 sm:p-4 rounded-lg text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary-glow">500+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Movies</div>
          </div>
          <div className="glass-card p-3 sm:p-4 rounded-lg text-center">
            <div className="text-lg sm:text-2xl font-bold text-accent-glow">50+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Theaters</div>
          </div>
          <div className="glass-card p-3 sm:p-4 rounded-lg text-center">
            <div className="text-lg sm:text-2xl font-bold text-secondary-glow">1M+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="glass-card p-3 sm:p-4 rounded-lg text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary-glow">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>      {/* Scroll Indicator with Cinema Theme */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative">
          {/* Cinema camera aperture design */}
          <div className="w-8 h-12 border-2 border-accent/50 rounded-full flex justify-center relative bg-background/20 backdrop-blur-sm">
            <div className="w-1.5 h-4 bg-gradient-to-b from-accent to-secondary rounded-full mt-2 animate-pulse shadow-accent-glow"></div>
            {/* Aperture blades */}
            <div className="absolute top-1 left-1/2 w-1 h-1 bg-accent/30 rounded-full transform -translate-x-1/2"></div>            <div className="absolute bottom-1 left-1/2 w-1 h-1 bg-accent/30 rounded-full transform -translate-x-1/2"></div>
          </div>
          {/* Scroll hint text */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
