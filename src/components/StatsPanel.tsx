
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Star, Scale, Ruler, Clock } from 'lucide-react';

interface StatsPanelProps {
  buddy: {
    name: string;
    level: number;
    stage: string;
    happiness: number;
    health: number;
    experience: number;
    createdAt: Date;
    lastFed: Date;
    lastPlayed: Date;
    feedCount?: number;
    playCount?: number;
    petCount?: number;
  };
}

export function StatsPanel({ buddy }: StatsPanelProps) {
  const getStageEmoji = () => {
    switch (buddy.stage) {
      case 'egg': return '🥚';
      case 'baby': return '🐣';
      case 'child': return '🐥';
      case 'teen': return '🐦';
      case 'adult': return '🦋';
      default: return '🌟';
    }
  };

  const getAgeInDays = () => {
    const now = new Date();
    const created = new Date(buddy.createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBuddySize = () => {
    // Größe basiert auf Level und Aktivitäten
    const baseSize = 10 + (buddy.level * 2);
    const activityBonus = (buddy.feedCount || 0) * 0.5 + (buddy.playCount || 0) * 0.3;
    return Math.round(baseSize + activityBonus);
  };

  const getBuddyWeight = () => {
    // Gewicht basiert auf Fütterung und Level
    const baseWeight = 0.5 + (buddy.level * 0.3);
    const feedBonus = (buddy.feedCount || 0) * 0.1;
    return Math.round((baseWeight + feedBonus) * 10) / 10;
  };

  const getTotalScore = () => {
    return buddy.level * 100 + buddy.experience + buddy.happiness + buddy.health;
  };

  const getLastActivityText = () => {
    const now = new Date();
    const lastFed = new Date(buddy.lastFed);
    const lastPlayed = new Date(buddy.lastPlayed);
    
    const hoursSinceFed = Math.floor((now.getTime() - lastFed.getTime()) / (1000 * 60 * 60));
    const hoursSincePlayed = Math.floor((now.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60));
    
    return {
      fed: hoursSinceFed < 1 ? 'Gerade eben 🍎' : `Vor ${hoursSinceFed}h 🍎`,
      played: hoursSincePlayed < 1 ? 'Gerade eben 🎾' : `Vor ${hoursSincePlayed}h 🎾`
    };
  };

  const activities = getLastActivityText();

  return (
    <div className="space-y-6">
      {/* Haupt-Stats Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Star className="w-5 h-5" />
            📊 Buddy-Statistiken
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">{getStageEmoji()}</div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {buddy.stage} - Level {buddy.level}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-800">{getAgeInDays()}</div>
              <div className="text-sm text-purple-600">Tage alt 🎂</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-800">{getTotalScore().toLocaleString()}</div>
              <div className="text-sm text-purple-600">Punkte 🏆</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Körper-Stats */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Scale className="w-5 h-5" />
            📏 Körper-Daten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <Ruler className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold text-green-800">{getBuddySize()} cm</div>
              <div className="text-sm text-green-600">Größe 📏</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg border">
              <Scale className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-blue-800">{getBuddyWeight()} kg</div>
              <div className="text-sm text-blue-600">Gewicht ⚖️</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aktivitäts-Stats */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Clock className="w-5 h-5" />
            📈 Aktivitäten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm font-medium text-yellow-700">Gefüttert</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {buddy.feedCount || 0}x - {activities.fed}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm font-medium text-yellow-700">Gespielt</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {buddy.playCount || 0}x - {activities.played}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm font-medium text-yellow-700">Gestreichelt</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {buddy.petCount || 0}x 🤗
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivations-Text */}
      <div className="p-4 bg-purple-100 rounded-lg text-center">
        <p className="text-sm text-purple-700">
          "Dein {buddy.name} ist in {getAgeInDays()} Tagen so groß geworden! 💜"
        </p>
      </div>
    </div>
  );
}
