import React from 'react';

export function StarField() {
  // Generate random stars with different sizes and colors
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    animationDelay: Math.random() * 4,
    animationDuration: Math.random() * 3 + 2,
    color: Math.random() > 0.8 ? 'text-cyan-200' : Math.random() > 0.6 ? 'text-blue-200' : 'text-white',
    brightness: Math.random() > 0.7 ? 'brightness-150' : 'brightness-100',
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-twinkle ${star.color} ${star.brightness}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
}