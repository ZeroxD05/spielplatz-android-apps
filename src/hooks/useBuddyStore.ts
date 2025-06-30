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
  buddyType: string;
  clothing: string;
  feedCount: number;
  playCount: number;
  petCount: number;
  eggPetCount: number;
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
        createdAt: new Date(parsed.createdAt),
        buddyType: parsed.buddyType || 'default',
        clothing: parsed.clothing || 'none',
        feedCount: parsed.feedCount || 0,
        playCount: parsed.playCount || 0,
        petCount: parsed.petCount || 0,
        eggPetCount: parsed.eggPetCount || 0,
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
      lastFed: new Date(Date.now() - 4000000),
      lastPlayed: new Date(Date.now() - 2000000),
      lastPetted: new Date(Date.now() - 1000000),
      createdAt: new Date(),
      buddyType: 'default',
      clothing: 'none',
      feedCount: 0,
      playCount: 0,
      petCount: 0,
      eggPetCount: 0,
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
      lastCheckin: new Date(Date.now() - 86400000),
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
      lastFed: new Date(),
      feedCount: prev.feedCount + 1
    }));
    gainExperience(20);
  };

  const playWithBuddy = () => {
    setBuddy(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      health: Math.min(100, prev.health + 5),
      lastPlayed: new Date(),
      playCount: prev.playCount + 1
    }));
    gainExperience(30);
  };

  const petBuddy = () => {
    setBuddy(prev => {
      const newPetCount = prev.petCount + 1;
      const newEggPetCount = prev.eggPetCount + 1;
      
      // Ei schlüpft nach 3 Streicheleinheiten
      let newStage = prev.stage;
      if (prev.stage === 'egg' && newEggPetCount >= 3) {
        newStage = 'baby';
      }
      
      return {
        ...prev,
        happiness: Math.min(100, prev.happiness + 10),
        lastPetted: new Date(),
        petCount: newPetCount,
        eggPetCount: newEggPetCount,
        stage: newStage
      };
    });
    gainExperience(15);
  };

  const changeBuddyName = (newName: string) => {
    setBuddy(prev => ({
      ...prev,
      name: newName
    }));
  };

  const changeBuddyType = (newType: string) => {
    setBuddy(prev => ({
      ...prev,
      buddyType: newType
    }));
  };

  const changeBuddyClothing = (newClothing: string) => {
    setBuddy(prev => ({
      ...prev,
      clothing: newClothing
    }));
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

  // Daily notification system
  useEffect(() => {
    const checkDailyNotification = () => {
      const lastNotification = localStorage.getItem('last-buddy-notification');
      const now = new Date();
      const today = now.toDateString();
      
      if (lastNotification !== today) {
        const messages = [
          "Dein Buddy hat dich vermisst! 💕",
          "Zeit für eine Spielrunde! 🎾",
          "Dein Buddy braucht etwas Liebe! 🤗",
          "Vergiss nicht zu füttern! 🍎",
          "Dein Buddy wartet auf dich! ⭐",
          "Zusammen seid ihr unschlagbar! 💪"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(randomMessage, {
            body: `${buddy.name} freut sich auf dich!`,
            icon: '🐣'
          });
        }
        
        localStorage.setItem('last-buddy-notification', today);
      }
    };

    // Prüfe täglich um 9:00 Uhr
    const now = new Date();
    const next9AM = new Date();
    next9AM.setHours(9, 0, 0, 0);
    
    if (now.getHours() >= 9) {
      next9AM.setDate(next9AM.getDate() + 1);
    }
    
    const msUntil9AM = next9AM.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      checkDailyNotification();
      // Dann alle 24 Stunden wiederholen
      setInterval(checkDailyNotification, 24 * 60 * 60 * 1000);
    }, msUntil9AM);

    return () => clearTimeout(timeout);
  }, [buddy.name]);

  // Benachrichtigungserlaubnis anfordern
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

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
    completeAdventure,
    changeBuddyName,
    changeBuddyType,
    changeBuddyClothing
  };
}
