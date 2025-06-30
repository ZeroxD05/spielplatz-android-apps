
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Star, Sparkles } from 'lucide-react';

interface BuddyDisplayProps {
  buddy: {
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
  };
}

export function BuddyDisplay({ buddy }: BuddyDisplayProps) {
  const getBuddyEmoji = () => {
    switch (buddy.stage) {
      case 'egg': return '🥚';
      case 'baby': return '🐣';
      case 'child': return '🐥';
      case 'teen': return '🐦';
      case 'adult': return '🦋';
      default: return '🥚';
    }
  };

  const getStageDescription = () => {
    switch (buddy.stage) {
      case 'egg': return 'Dein Buddy schlüpft bald!';
      case 'baby': return 'So süß und winzig!';
      case 'child': return 'Voller Energie und Neugier!';
      case 'teen': return 'Bereit für große Abenteuer!';
      case 'adult': return 'Weise und wunderschön!';
      default: return '';
    }
  };

  const getHappinessColor = () => {
    if (buddy.happiness >= 80) return 'text-green-500';
    if (buddy.happiness >= 60) return 'text-yellow-500';
    if (buddy.happiness >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <Card className="mb-6 overflow-hidden bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-lg">
      <CardContent className="p-8 text-center">
        {/* Buddy Display */}
        <div className="relative mb-6">
          <div 
            className="text-8xl mb-4 animate-bounce"
            style={{ 
              filter: `hue-rotate(${buddy.color}deg)`,
              textShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
            }}
          >
            {getBuddyEmoji()}
          </div>
          
          {/* Sparkles Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Sparkles className="absolute top-4 left-8 text-yellow-400 animate-pulse" size={20} />
            <Sparkles className="absolute top-8 right-6 text-pink-400 animate-pulse" size={16} />
            <Sparkles className="absolute bottom-12 left-6 text-blue-400 animate-pulse" size={18} />
          </div>
        </div>

        {/* Buddy Info */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">{buddy.name}</h2>
          <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-700">
            Level {buddy.level} {buddy.stage}
          </Badge>
          <p className="text-purple-600 mt-2">{getStageDescription()}</p>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-700">Erfahrung</span>
              <span className="text-sm text-purple-600">
                {buddy.experience} / {buddy.experienceToNext}
              </span>
            </div>
            <Progress 
              value={(buddy.experience / buddy.experienceToNext) * 100} 
              className="h-3"
            />
          </div>

          {/* Happiness */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${getHappinessColor()}`} fill="currentColor" />
                <span className="text-sm font-medium text-purple-700">Glück</span>
              </div>
              <span className="text-sm text-purple-600">{buddy.happiness}%</span>
            </div>
            <Progress 
              value={buddy.happiness} 
              className="h-3"
            />
          </div>

          {/* Health */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-500" fill="currentColor" />
                <span className="text-sm font-medium text-purple-700">Gesundheit</span>
              </div>
              <span className="text-sm text-purple-600">{buddy.health}%</span>
            </div>
            <Progress 
              value={buddy.health} 
              className="h-3"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
