import React from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const CinematicLoader: React.FC<CinematicLoaderProps> = ({ 
  className, 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Cinema Film Strip Animation */}
      <div className="relative">
        {/* Outer glowing ring */}
        <div className={cn(
          'rounded-full animate-spin relative overflow-hidden',
          sizeClasses[size]
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute inset-1 bg-background rounded-full"></div>
          
          {/* Film perforations */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-accent/40 animate-spin animate-reverse">
            {/* Film strip holes */}
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-accent/60 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-accent/60 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-1 h-1 bg-accent/60 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-1 h-1 bg-accent/60 rounded-full transform -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Center cinema logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-accent to-secondary animate-pulse shadow-lg"></div>
      </div>
      
      {/* Loading text with cinema theme */}
      <div className="text-center">
        <p className="text-muted-foreground animate-pulse font-cinematic tracking-wide">{text}</p>
        <div className="flex gap-1 justify-center mt-2">
          <div className="w-2 h-2 bg-gradient-to-r from-accent to-secondary rounded-full animate-bounce shadow-accent-glow"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full animate-bounce delay-100 shadow-glow"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-bounce delay-200 shadow-accent-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default CinematicLoader;
