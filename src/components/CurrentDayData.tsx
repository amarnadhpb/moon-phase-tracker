import React from 'react';
import { Calendar, Clock, Percent, Moon } from 'lucide-react';
import { MoonPhaseInfo, formatFullDate } from '../utils/moonPhase';

interface CurrentDayDataProps {
  moonInfo: MoonPhaseInfo;
}

export function CurrentDayData({ moonInfo }: CurrentDayDataProps) {
  const getNextPhase = () => {
    const phase = moonInfo.phase;
    if (phase < 0.125) return { name: 'First Quarter', days: Math.round((0.25 - phase) * 29.53) };
    if (phase < 0.375) return { name: 'Full Moon', days: Math.round((0.5 - phase) * 29.53) };
    if (phase < 0.625) return { name: 'Third Quarter', days: Math.round((0.75 - phase) * 29.53) };
    if (phase < 0.875) return { name: 'New Moon', days: Math.round((1 - phase) * 29.53) };
    return { name: 'First Quarter', days: Math.round((1.25 - phase) * 29.53) };
  };

  const nextPhase = getNextPhase();

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        Today's Lunar Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Date</span>
            </div>
            <span className="text-white font-medium">
              {formatFullDate(moonInfo.date)}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Phase</span>
            </div>
            <span className="text-white font-medium">
              {moonInfo.phaseName}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Illumination</span>
            </div>
            <span className="text-white font-medium">
              {moonInfo.illumination}%
            </span>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Moon Age</span>
            </div>
            <span className="text-white font-medium">
              {moonInfo.age} days
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Next Phase</span>
            </div>
            <span className="text-white font-medium">
              {nextPhase.name}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Days Until</span>
            </div>
            <span className="text-white font-medium">
              {nextPhase.days} days
            </span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar for Lunar Cycle */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Lunar Cycle Progress</span>
          <span>{Math.round(moonInfo.phase * 100)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${moonInfo.phase * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>New Moon</span>
          <span>Full Moon</span>
          <span>New Moon</span>
        </div>
      </div>
    </div>
  );
}