import React from 'react';
import { cn } from '@/lib/utils';

interface CinematicBackgroundProps {
  className?: string;
  variant?: 'subtle' | 'prominent' | 'animated';
}

const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ 
  className, 
  variant = 'subtle' 
}) => {
  const patterns = {
    subtle: (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    ),
    prominent: (
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
    ),    animated: (
      <div className="absolute inset-0 overflow-hidden opacity-25">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        
        {/* Cinema curtain effect */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-accent/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>
        
        {/* Floating orbs with cinema theme */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full blur-3xl animate-pulse floating-orb"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000 floating-orb-reverse"></div>
        <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse delay-2000 floating-orb-slow"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-full blur-3xl animate-pulse delay-3000 floating-orb-reverse"></div>
        
        {/* Film strip decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent transform translate-y-2"></div>
        
        {/* Shooting stars with cinema glow */}
        <div className="absolute top-12 left-0 w-2 h-1 bg-gradient-to-r from-accent to-transparent rounded-full shooting-star shadow-accent-glow"></div>
        <div className="absolute top-32 left-0 w-2 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full shooting-star delay-5000 shadow-glow"></div>
        <div className="absolute top-52 left-0 w-2 h-1 bg-gradient-to-r from-primary to-transparent rounded-full shooting-star delay-8000 shadow-accent-glow"></div>
        
        {/* Spotlight effects */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-radial from-accent/5 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-gradient-radial from-secondary/5 to-transparent rounded-full animate-pulse delay-2000"></div>
      </div>
    )
  };

  return (
    <div className={cn('pointer-events-none', className)}>
      {patterns[variant]}
    </div>
  );
};

export default CinematicBackground;
