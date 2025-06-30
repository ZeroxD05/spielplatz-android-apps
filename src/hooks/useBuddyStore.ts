
import { useState, useEffect } from 'react';

interface Buddy {
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  happiness: number;
  health: number;
  stage: 'egg' | 'baby' | 'child' | 'teen' | 'adult';
  color: string;
  lastFed: Date;
  lastPlayed: Date;
  lastPetted: Date;
  createdAt: Date;
}

interface Streaks {
  current: number;
  longest: number;
  lastCheckin: Date;
  totalDays: number;
}

interface Adventure {
  id: string;
  name: string;
  description: string;
  duration: number;
  startTime: Date;
  reward: number;
  emoji: string;
}

export function useBuddyStore() {
  const [buddy, setBuddy] = useState<Buddy>(() => {
    const saved = localStorage.getItem('buddy-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        lastFed: new Date(parsed.lastFed),
        lastPlayed: new Date(parsed.lastPlayed),
        lastPetted: new Date(parsed.lastPetted),
        createdAt: new Date(parsed.createdAt)
      };
    }
    
    return {
      name: 'Buddy',
      level: 1,
      experience: 0,
      experienceToNext: 100,
      happiness: 75,
      health: 100,
      stage: 'egg' as const,
      color: Math.floor(Math.random() * 360).toString(),
      lastFed: new Date(Date.now() - 4000000), // 1+ hour ago
      lastPlayed: new Date(Date.now() - 2000000), // 30+ minutes ago
      lastPetted: new Date(Date.now() - 1000000), // 15+ minutes ago
      createdAt: new Date()
    };
  });

  const [streaks, setStreaks] = useState<Streaks>(() => {
    const saved = localStorage.getItem('buddy-streaks');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        lastCheckin: new Date(parsed.lastCheckin)
      };
    }
    
    return {
      current: 0,
      longest: 0,
      lastCheckin: new Date(Date.now() - 86400000), // 1 day ago
      totalDays: 0
    };
  });

  const [currentAdventure, setCurrentAdventure] = useState<Adventure | null>(() => {
    const saved = localStorage.getItem('buddy-adventure');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        startTime: new Date(parsed.startTime)
      };
    }
    return null;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('buddy-data', JSON.stringify(buddy));
  }, [buddy]);

  useEffect(() => {
    localStorage.setItem('buddy-streaks', JSON.stringify(streaks));
  }, [streaks]);

  useEffect(() => {
    if (currentAdventure) {
      localStorage.setItem('buddy-adventure', JSON.stringify(currentAdventure));
    } else {
      localStorage.removeItem('buddy-adventure');
    }
  }, [currentAdventure]);

  const gainExperience = (amount: number) => {
    setBuddy(prev => {
      let newExp = prev.experience + amount;
      let newLevel = prev.level;
      let newExpToNext = prev.experienceToNext;
      let newStage = prev.stage;

      // Level up logic
      while (newExp >= newExpToNext) {
        newExp -= newExpToNext;
        newLevel++;
        newExpToNext = Math.floor(newExpToNext * 1.5);

        // Stage progression
        if (newLevel >= 25) newStage = 'adult';
        else if (newLevel >= 15) newStage = 'teen';
        else if (newLevel >= 8) newStage = 'child';
        else if (newLevel >= 3) newStage = 'baby';
      }

      return {
        ...prev,
        experience: newExp,
        level: newLevel,
        experienceToNext: newExpToNext,
        stage: newStage
      };
    });
  };

  const feedBuddy = () => {
    setBuddy(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      health: Math.min(100, prev.health + 10),
      lastFed: new Date()
    }));
    gainExperience(20);
  };

  const playWithBuddy = () => {
    setBuddy(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      health: Math.min(100, prev.health + 5),
      lastPlayed: new Date()
    }));
    gainExperience(30);
  };

  const petBuddy = () => {
    setBuddy(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      lastPetted: new Date()
    }));
    gainExperience(15);
  };

  const updateDailyStreak = () => {
    setStreaks(prev => {
      const newCurrent = prev.current + 1;
      const newLongest = Math.max(prev.longest, newCurrent);
      
      return {
        current: newCurrent,
        longest: newLongest,
        lastCheckin: new Date(),
        totalDays: prev.totalDays + 1
      };
    });
    gainExperience(50);
  };

  const startAdventure = (adventureData: any) => {
    const adventure: Adventure = {
      ...adventureData,
      startTime: new Date()
    };
    setCurrentAdventure(adventure);
  };

  const completeAdventure = () => {
    if (currentAdventure) {
      gainExperience(currentAdventure.reward);
      setBuddy(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20)
      }));
    }
    setCurrentAdventure(null);
  };

  // Gradual stat decay (optional - makes it more realistic)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuddy(prev => {
        const now = new Date();
        const hoursSinceLastFed = (now.getTime() - prev.lastFed.getTime()) / (1000 * 60 * 60);
        const hoursSinceLastPlayed = (now.getTime() - prev.lastPlayed.getTime()) / (1000 * 60 * 60);
        
        let newHappiness = prev.happiness;
        let newHealth = prev.health;

        // Gradual decay
        if (hoursSinceLastFed > 4) {
          newHealth = Math.max(20, newHealth - 1);
        }
        if (hoursSinceLastPlayed > 2) {
          newHappiness = Math.max(10, newHappiness - 1);
        }

        return {
          ...prev,
          happiness: newHappiness,
          health: newHealth
        };
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    buddy,
    streaks,
    currentAdventure,
    feedBuddy,
    playWithBuddy,
    petBuddy,
    updateDailyStreak,
    startAdventure,
    completeAdventure
  };
}
