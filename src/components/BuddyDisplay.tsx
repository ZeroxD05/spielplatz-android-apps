
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Heart, Star, Sparkles, Edit2, Check, X } from 'lucide-react';

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
    buddyType?: string;
    clothing?: string;
  };
  onNameChange: (newName: string) => void;
}

export function BuddyDisplay({ buddy, onNameChange }: BuddyDisplayProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(buddy.name);

  const getBuddyEmoji = () => {
    if (buddy.stage === 'egg') return '🥚';
    
    const typeEmojis = {
      'cat': '🐱',
      'dog': '🐶', 
      'bunny': '🐰',
      'panda': '🐼',
      'default': '🐣'
    };
    
    const baseEmoji = typeEmojis[buddy.buddyType as keyof typeof typeEmojis] || '🐣';
    
    // Füge Kleidung hinzu
    const clothingEmojis = {
      'hat': '🎩',
      'bow': '🎀',
      'glasses': '🤓',
      'scarf': '🧣',
      'crown': '👑'
    };
    
    const clothing = buddy.clothing && buddy.clothing !== 'none' 
      ? clothingEmojis[buddy.clothing as keyof typeof clothingEmojis] || ''
      : '';
    
    return baseEmoji + clothing;
  };

  const getStageDescription = () => {
    switch (buddy.stage) {
      case 'egg': return 'Streichle mich zum Schlüpfen! 🥚✨';
      case 'baby': return 'So süß und winzig! 🍼';
      case 'child': return 'Voller Energie! ⚡';
      case 'teen': return 'Bereit für Abenteuer! 🌟';
      case 'adult': return 'Weise und stark! 💪';
      default: return '';
    }
  };

  const handleNameSave = () => {
    if (newName.trim()) {
      onNameChange(newName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setNewName(buddy.name);
    setIsEditingName(false);
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
          {isEditingName ? (
            <div className="flex items-center justify-center gap-2 mb-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-2xl font-bold text-purple-800 bg-transparent border-b-2 border-purple-300 text-center focus:outline-none focus:border-purple-500"
                maxLength={20}
              />
              <Button size="sm" onClick={handleNameSave} className="bg-green-500 hover:bg-green-600">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleNameCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-purple-800">{buddy.name}</h2>
              <Button size="sm" variant="ghost" onClick={() => setIsEditingName(true)}>
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-700">
            Level {buddy.level} {buddy.stage === 'egg' ? '🥚' : '⭐'}
          </Badge>
          <p className="text-purple-600 mt-2">{getStageDescription()}</p>
        </div>

        {/* Stats nur anzeigen wenn nicht mehr Ei */}
        {buddy.stage !== 'egg' && (
          <div className="space-y-4">
            {/* Experience */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-purple-700">XP ⭐</span>
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
                  <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                  <span className="text-sm font-medium text-purple-700">Glück</span>
                </div>
                <span className="text-sm text-purple-600">{buddy.happiness}% 😊</span>
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
                <span className="text-sm text-purple-600">{buddy.health}% 💪</span>
              </div>
              <Progress 
                value={buddy.health} 
                className="h-3"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
