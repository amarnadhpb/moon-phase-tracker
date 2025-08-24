// Moon phase calculation utilities

export interface MoonPhaseInfo {
  phase: number; // 0-1 where 0 is new moon, 0.5 is full moon
  phaseName: string;
  illumination: number; // 0-100 percentage
  date: Date;
  age: number; // Days since new moon
}

// Known new moon date for reference (January 6, 2000 at 18:14 UTC)
const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00.000Z');
const LUNAR_CYCLE_DAYS = 29.530588853; // Average lunar cycle length in days

export function calculateMoonPhase(date: Date): MoonPhaseInfo {
  // Calculate days since known new moon
  const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate current position in lunar cycle
  const cyclePosition = daysSinceNewMoon % LUNAR_CYCLE_DAYS;
  const normalizedCycle = cyclePosition < 0 ? cyclePosition + LUNAR_CYCLE_DAYS : cyclePosition;
  
  // Convert to 0-1 phase (0 = new moon, 0.5 = full moon)
  const phase = normalizedCycle / LUNAR_CYCLE_DAYS;
  
  // Calculate illumination percentage (0-100)
  let illumination: number;
  if (phase <= 0.5) {
    // Waxing: from 0% to 100%
    illumination = Math.round(phase * 200);
  } else {
    // Waning: from 100% to 0%
    illumination = Math.round((1 - phase) * 200);
  }
  
  // Ensure illumination is within bounds
  illumination = Math.max(0, Math.min(100, illumination));
  
  // Determine phase name
  const phaseName = getPhaseName(phase);
  
  return {
    phase,
    phaseName,
    illumination,
    date: new Date(date),
    age: Math.round(normalizedCycle * 10) / 10
  };
}

function getPhaseName(phase: number): string {
  const phasePercent = phase * 100;
  
  if (phasePercent < 1 || phasePercent > 99) return 'New Moon';
  if (phasePercent < 12.5) return 'Waxing Crescent';
  if (phasePercent < 37.5) return 'First Quarter';
  if (phasePercent < 62.5) return 'Waxing Gibbous';
  if (phasePercent < 87.5) return 'Full Moon';
  if (phasePercent < 75) return 'Waning Gibbous';
  if (phasePercent < 62.5) return 'Third Quarter';
  return 'Waning Crescent';
}

export function getNext7Days(): MoonPhaseInfo[] {
  const phases: MoonPhaseInfo[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    phases.push(calculateMoonPhase(date));
  }
  
  return phases;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}