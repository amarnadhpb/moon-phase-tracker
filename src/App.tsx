import React, { useState, useEffect } from 'react';
import { Moon, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { MoonCard } from './components/MoonCard';
import { StarField } from './components/StarField';
import { MeteorField } from './components/MeteorField';
import { calculateMoonPhase, getNext7Days, formatFullDate, type MoonPhaseInfo } from './utils/moonPhase';

function App() {
  const [todayMoon, setTodayMoon] = useState<MoonPhaseInfo | null>(null);
  const [showNext7Days, setShowNext7Days] = useState(false);
  const [next7DaysMoon, setNext7DaysMoon] = useState<MoonPhaseInfo[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const updateMoonData = () => {
      const now = new Date();
      setCurrentTime(now);
      setTodayMoon(calculateMoonPhase(now));
      setNext7DaysMoon(getNext7Days());
    };
    
    // Initial calculation
    updateMoonData();
    
    // Update every hour to ensure accuracy
    const interval = setInterval(updateMoonData, 60 * 60 * 1000);
    
    // Also update at midnight each day
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(() => {
      updateMoonData();
      // Set up daily updates
      const dailyInterval = setInterval(updateMoonData, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);
    
    return () => {
      clearInterval(interval);
      clearTimeout(midnightTimeout);
    };
  }, []);

  if (!todayMoon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Loading lunar data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Star Field Background */}
      <StarField />
      
      {/* Meteor Field Background */}
      <MeteorField number={40} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Moon className="w-8 h-8 text-cyan-300 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Lunar Tracker
              </h1>
            </div>
            <p className="text-cyan-200 text-lg md:text-xl">
              Real-time moon phase tracking
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-12">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Today's Moon Phase - Hero Section */}
            <section className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {formatFullDate(todayMoon.date)}
                </h2>
                <div className="text-blue-200 text-lg">
                  Current Moon Phase
                </div>
              </div>
              
              <div className="flex justify-center">
                <MoonCard moonInfo={todayMoon} isToday={true} size="large" />
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 max-w-md mx-auto shadow-2xl shadow-cyan-500/20">
                <div className="space-y-3 text-center">
                  <div className="text-white font-medium">
                    Moon Age: {todayMoon.age} days
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-1000 shadow-lg shadow-cyan-400/50"
                      style={{ width: `${todayMoon.phase * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-cyan-300">
                    <span>New Moon</span>
                    <span>Full Moon</span>
                    <span>New Moon</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Next 7 Days Toggle Button */}
            <section className="text-center">
              <button
                onClick={() => setShowNext7Days(!showNext7Days)}
                className="
                  inline-flex items-center gap-3 px-8 py-4 
                  bg-gradient-to-r from-slate-700/80 to-blue-800/80 
                  hover:from-slate-600 hover:to-blue-700
                  backdrop-blur-sm border border-cyan-500/30
                  text-white font-medium rounded-xl
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25
                  focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                "
              >
                <Calendar className="w-5 h-5" />
                <span>Next 7 Days</span>
                {showNext7Days ? (
                  <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                )}
              </button>
            </section>

            {/* Next 7 Days Grid - Expandable */}
            <div className={`
              transition-all duration-500 ease-in-out overflow-hidden
              ${showNext7Days ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white text-center">
                  Upcoming Moon Phases
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  {next7DaysMoon.map((moonInfo, index) => (
                    <div
                      key={index}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MoonCard 
                        moonInfo={moonInfo} 
                        size="small" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-cyan-300/70 text-sm border-t border-cyan-500/20">
          <div className="max-w-4xl mx-auto px-4 space-y-2">
            <p>Accurate lunar calculations • Updates automatically daily</p>
            <p className="text-xs">
              Last updated: {currentTime.toLocaleString()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;