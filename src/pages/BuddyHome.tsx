
import { useState, useEffect } from 'react';
import { AppNavigation } from '@/components/AppNavigation';
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
    updateDailyStreak,
    changeBuddyName,
    changeBuddyType,
    changeBuddyClothing
  } = useBuddyStore();

  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    // Zeige täglich Motivation
    if (Math.random() > 0.7) {
      setShowMotivation(true);
    }
  }, []);

  const motivationalMessages = [
    "Du schaffst das! 🌟",
    "Heute wird ein toller Tag! ✨",
    "Dein Buddy glaubt an dich! 💖",
    "Kleine Schritte, große Erfolge! 🌱",
    "Du bist stark! 💪",
    "Vergiss nicht auf dich aufzupassen! 🌸"
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
            {buddy.stage === 'egg' ? 'Streichle dein Ei zum Schlüpfen!' : `Kümmere dich um ${buddy.name}!`}
          </p>
        </div>

        {/* Motivation Card */}
        {showMotivation && (
          <MotivationCard
            message={motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            onClose={() => setShowMotivation(false)}
          />
        )}

        {/* Tab Navigation */}
        <AppNavigation
          buddy={buddy}
          onFeed={feedBuddy}
          onPlay={playWithBuddy}
          onPet={petBuddy}
          onNameChange={changeBuddyName}
          onBuddyTypeChange={changeBuddyType}
          onClothingChange={changeBuddyClothing}
        />
      </div>
    </div>
  );
}
