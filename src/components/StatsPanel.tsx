
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Star } from 'lucide-react';

interface StatsPanelProps {
  buddy: {
    name: string;
    level: number;
    stage: string;
    happiness: number;
    health: number;
    experience: number;
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

  const getTotalScore = () => {
    return buddy.level * 100 + buddy.experience + buddy.happiness + buddy.health;
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Star className="w-5 h-5" />
          Buddy Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">{getStageEmoji()}</div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {buddy.stage} - Level {buddy.level}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700">Gesamtpunkte</span>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              {getTotalScore().toLocaleString()}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700">Erfahrung</span>
            <span className="text-sm text-purple-600">{buddy.experience} XP</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700">Glück</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-purple-600">{buddy.happiness}%</span>
              <div className="text-lg">
                {buddy.happiness >= 80 ? '😊' : buddy.happiness >= 60 ? '🙂' : buddy.happiness >= 40 ? '😐' : '😢'}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700">Gesundheit</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-purple-600">{buddy.health}%</span>
              <div className="text-lg">
                {buddy.health >= 80 ? '💪' : buddy.health >= 60 ? '👍' : buddy.health >= 40 ? '🤲' : '🏥'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            "Dein Buddy ist stolz auf dich! Zusammen seid ihr ein tolles Team! 💜"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
