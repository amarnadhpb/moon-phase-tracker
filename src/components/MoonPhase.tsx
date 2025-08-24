import React from 'react';

interface MoonPhaseProps {
  phase: number; // 0-1, where 0 is new moon, 0.5 is full moon
  size?: 'small' | 'medium' | 'large';
}

export function MoonPhase({ phase, size = 'large' }: MoonPhaseProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'medium': return 'w-20 h-20';
      case 'large': return 'w-32 h-32';
      default: return 'w-32 h-32';
    }
  };
  
  const sizeClass = getSizeClasses();
  
  // Calculate the visible portion of the moon
  const getVisiblePortion = () => {
    let visiblePercent: number;
    let isWaxing: boolean;
    
    if (phase <= 0.5) {
      // Waxing phase (0 to 0.5)
      visiblePercent = phase * 2; // 0 to 1
      isWaxing = true;
    } else {
      // Waning phase (0.5 to 1)
      visiblePercent = (1 - phase) * 2; // 1 to 0
      isWaxing = false;
    }
    
    return { visiblePercent, isWaxing };
  };

  const { visiblePercent, isWaxing } = getVisiblePortion();
  
  // Create the clip path for the lit portion
  const getLitClipPath = () => {
    if (visiblePercent === 0) {
      return 'circle(0% at 50% 50%)';
    }
    
    if (visiblePercent === 1) {
      return 'circle(50% at 50% 50%)';
    }
    
    // For partial phases, create an ellipse
    if (phase < 0.5) {
      // Waxing - light comes from the right
      const ellipseWidth = visiblePercent * 50;
      return `ellipse(${ellipseWidth}% 50% at ${100 - ellipseWidth}% 50%)`;
    } else {
      // Waning - light comes from the left
      const ellipseWidth = visiblePercent * 50;
      return `ellipse(${ellipseWidth}% 50% at ${ellipseWidth}% 50%)`;
    }
  };

  return (
    <div className={`relative ${sizeClass} mx-auto`}>
      {/* Moon base - dark background */}
      <div className={`${sizeClass} rounded-full bg-slate-900 border border-slate-700 relative overflow-hidden shadow-2xl`}>
        
        {/* Lit portion of the moon */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-50 to-slate-100 rounded-full"
          style={{
            clipPath: getLitClipPath(),
          }}
        />
        
        {/* Moon surface texture overlay */}
        <div className="absolute inset-0 rounded-full opacity-30">
          {size !== 'small' && (
            <>
              <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-slate-600 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-slate-600 rounded-full opacity-40"></div>
              <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-slate-600 rounded-full opacity-50"></div>
            </>
          )}
        </div>
        
        {/* Inner shadow for depth */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      
      {/* Outer glow effect */}
      <div 
        className={`absolute inset-0 rounded-full ${sizeClass} pointer-events-none`}
        style={{
          boxShadow: `0 0 ${size === 'large' ? '20px' : size === 'medium' ? '15px' : '10px'} rgba(34, 211, 238, ${visiblePercent * 0.3})`,
        }}
      />
    </div>
  );
}