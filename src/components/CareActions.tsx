
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CareActionsProps {
  onFeed: () => void;
  onPlay: () => void;
  onPet: () => void;
  buddy: {
    happiness: number;
    health: number;
    lastFed: Date;
    lastPlayed: Date;
    lastPetted: Date;
  };
}

export function CareActions({ onFeed, onPlay, onPet, buddy }: CareActionsProps) {
  const { toast } = useToast();

  const canFeed = () => {
    const now = new Date();
    const lastFed = new Date(buddy.lastFed);
    return now.getTime() - lastFed.getTime() > 3600000; // 1 hour
  };

  const canPlay = () => {
    const now = new Date();
    const lastPlayed = new Date(buddy.lastPlayed);
    return now.getTime() - lastPlayed.getTime() > 1800000; // 30 minutes
  };

  const canPet = () => {
    const now = new Date();
    const lastPetted = new Date(buddy.lastPetted);
    return now.getTime() - lastPetted.getTime() > 900000; // 15 minutes
  };

  const handleFeed = () => {
    if (!canFeed()) {
      toast({
        title: "Noch nicht hungrig! 🍽️",
        description: "Dein Buddy ist noch satt von der letzten Mahlzeit.",
      });
      return;
    }
    onFeed();
    toast({
      title: "Lecker! 😋",
      description: "Dein Buddy hat das Essen geliebt!",
    });
  };

  const handlePlay = () => {
    if (!canPlay()) {
      toast({
        title: "Zu müde zum Spielen! 😴",
        description: "Dein Buddy braucht noch etwas Ruhe.",
      });
      return;
    }
    onPlay();
    toast({
      title: "Spielzeit! 🎮",
      description: "Dein Buddy hatte großen Spaß!",
    });
  };

  const handlePet = () => {
    if (!canPet()) {
      toast({
        title: "Schon genug gestreichelt! 🥰",
        description: "Dein Buddy genießt noch die letzten Streicheleinheiten.",
      });
      return;
    }
    onPet();
    toast({
      title: "So liebevoll! 💕",
      description: "Dein Buddy fühlt sich geliebt!",
    });
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">
          Kümmere dich um deinen Buddy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleFeed}
            disabled={!canFeed()}
            className="h-16 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg shadow-lg disabled:opacity-50"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🍎</span>
              <span>Füttern</span>
            </div>
          </Button>

          <Button
            onClick={handlePlay}
            disabled={!canPlay()}
            className="h-16 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg shadow-lg disabled:opacity-50"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🎾</span>
              <span>Spielen</span>
            </div>
          </Button>

          <Button
            onClick={handlePet}
            disabled={!canPet()}
            className="h-16 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold text-lg shadow-lg disabled:opacity-50"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🤗</span>
              <span>Streicheln</span>
            </div>
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-purple-600">
          <p>Jede Aktion gibt deinem Buddy Erfahrung und Glück! ✨</p>
        </div>
      </CardContent>
    </Card>
  );
}
