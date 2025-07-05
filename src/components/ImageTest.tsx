import React from 'react';
import theaterSeatsBg from '@/assets/theater-seats-bg.jpg';
import cinemaHeroBg from '@/assets/cinema-hero-bg.jpg';

const ImageTest: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 p-4 rounded-lg">
      <h3 className="text-white text-sm mb-2">Image Test</h3>
      <div className="flex gap-2">
        <img 
          src={theaterSeatsBg} 
          alt="Theater Seats" 
          className="w-16 h-16 object-cover rounded border"
        />
        <img 
          src={cinemaHeroBg} 
          alt="Cinema Hero" 
          className="w-16 h-16 object-cover rounded border"
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Theater: {theaterSeatsBg}<br/>
        Cinema: {cinemaHeroBg}
      </p>
    </div>
  );
};

export default ImageTest;
