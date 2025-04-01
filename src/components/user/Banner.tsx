import React, { useState, useEffect } from 'react';
import { Event } from '../../types';

interface BannerProps {
  events: Event[];
}

const Banner: React.FC<BannerProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [events.length]);

  const currentEvent = events[currentIndex];

  return (
    <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${currentEvent.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-900/30"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center px-6 md:px-10">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">{currentEvent.title}</h2>
        <p className="text-white/90 mb-4 max-w-2xl">{currentEvent.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentEvent.date} • {currentEvent.time}
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentEvent.location}
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentEvent.category}
          </span>
        </div>
        <button className="mt-4 bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors w-fit">
          Register Now
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;