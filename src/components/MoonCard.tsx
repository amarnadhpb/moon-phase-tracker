import React from 'react';
import { MoonPhase } from './MoonPhase';
import { MoonPhaseInfo, formatDate } from '../utils/moonPhase';

interface MoonCardProps {
  moonInfo: MoonPhaseInfo;
  isToday?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function MoonCard({ moonInfo, isToday = false, size = 'medium' }: MoonCardProps) {
  return (
    <div className={`
      bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30 
      hover:border-cyan-400/50 transition-all duration-300
      hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20
      ${isToday ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/30' : ''}
      ${size === 'small' ? 'p-3' : size === 'large' ? 'p-6' : 'p-4'}
    `}>
      <div className="text-center space-y-3">
        {isToday && (
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm rounded-full font-medium shadow-lg shadow-cyan-500/30">
            Today
          </div>
        )}
        
        <MoonPhase phase={moonInfo.phase} size={size} />
        
        <div className="space-y-1">
          <h3 className={`font-semibold text-white ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
            {moonInfo.phaseName}
          </h3>
          <p className="text-cyan-200 text-sm">
            {formatDate(moonInfo.date)}
          </p>
          <p className="text-cyan-300/70 text-xs">
            {moonInfo.illumination}% illuminated
          </p>
        </div>
      </div>
    </div>
  );
}