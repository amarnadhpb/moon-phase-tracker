import React, { useEffect, useState } from 'react';

interface Meteor {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: 'fast' | 'medium' | 'slow';
  delay: number;
}

export function MeteorField({ 
  number = 20
}: { 
  number?: number;
}) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    // Create initial meteors
    const createMeteors = () => {
      const newMeteors: Meteor[] = [];
      
      for (let i = 0; i < number; i++) {
        // Random speed variation for natural effect
        const speedVariation = Math.random() > 0.8 ? 'fast' : Math.random() > 0.4 ? 'medium' : 'slow';
        newMeteors.push({
          id: i,
          x: Math.random() * 120 - 10, // Start off-screen
          y: Math.random() * 60 - 30,  // Start from top area
          size: Math.random() * 3 + 1,
          speed: speedVariation,
          delay: Math.random() * 4,
        });
      }
      
      setMeteors(newMeteors);
    };

    createMeteors();

    // Recreate meteors every 8 seconds for continuous effect
    const interval = setInterval(createMeteors, 8000);

    return () => clearInterval(interval);
  }, [number]);

  const getSpeedClass = (speed: string) => {
    switch (speed) {
      case 'fast': return 'animate-meteor-fast';
      case 'slow': return 'animate-meteor-slow';
      default: return 'animate-meteor';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className={`absolute ${getSpeedClass(meteor.speed)}`}
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            width: `${meteor.size}px`,
            height: `${meteor.size}px`,
            animationDelay: `${meteor.delay}s`,
          }}
        >
          {/* Meteor body */}
          <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 rounded-full shadow-lg shadow-cyan-400/70" />
          
          {/* Meteor glow */}
          <div className="absolute inset-0 w-full h-full bg-cyan-300 rounded-full blur-sm opacity-60" />
          
          {/* Meteor trail */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent rounded-full opacity-40" />
        </div>
      ))}
    </div>
  );
}
