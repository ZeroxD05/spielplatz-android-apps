
import { useState, useEffect } from 'react';
import { BuddyDisplay } from '@/components/BuddyDisplay';
import { CareActions } from '@/components/CareActions';
import { StatsPanel } from '@/components/StatsPanel';
import { DailyStreaks } from '@/components/DailyStreaks';
import { AdventurePanel } from '@/components/AdventurePanel';
import { MotivationCard } from '@/components/MotivationCard';
import { useBuddyStore } from '@/hooks/useBuddyStore';
import { MobileNav } from '@/components/ui/mobile-nav';

export default function BuddyHome() {
  const {
    buddy,
    streaks,
    currentAdventure,
    feedBuddy,
    playWithBuddy,
    petBuddy,
    startAdventure,
    completeAdventure,
    updateDailyStreak
  } = useBuddyStore();

  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    // Show daily motivation randomly
    if (Math.random() > 0.7) {
      setShowMotivation(true);
    }
  }, []);

  const motivationalMessages = [
    "Du schaffst das! 🌟",
    "Heute ist ein wundervoller Tag für neue Abenteuer! ✨",
    "Dein Buddy glaubt an dich! 💖",
    "Kleine Schritte führen zu großen Erfolgen! 🌱",
    "Du bist stärker als du denkst! 💪",
    "Vergiss nicht, auch auf dich selbst aufzupassen! 🌸"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <MobileNav />
      
      <div className="max-w-4xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Mein Buddy 🌟
          </h1>
          <p className="text-purple-600">
            Kümmere dich um deinen süßen Begleiter!
          </p>
        </div>

        {/* Motivation Card */}
        {showMotivation && (
          <MotivationCard
            message={motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            onClose={() => setShowMotivation(false)}
          />
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Buddy Display */}
          <div className="lg:col-span-2">
            <BuddyDisplay buddy={buddy} />
            <CareActions
              onFeed={() => feedBuddy()}
              onPlay={() => playWithBuddy()}
              onPet={() => petBuddy()}
              buddy={buddy}
            />
          </div>

          {/* Right Column - Stats and Features */}
          <div className="space-y-6">
            <StatsPanel buddy={buddy} />
            <DailyStreaks streaks={streaks} onUpdateStreak={updateDailyStreak} />
            <AdventurePanel
              buddy={buddy}
              currentAdventure={currentAdventure}
              onStartAdventure={startAdventure}
              onCompleteAdventure={completeAdventure}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
