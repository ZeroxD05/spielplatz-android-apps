
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyStreaksProps {
  streaks: {
    current: number;
    longest: number;
    lastCheckin: Date;
    totalDays: number;
  };
  onUpdateStreak: () => void;
}

export function DailyStreaks({ streaks, onUpdateStreak }: DailyStreaksProps) {
  const { toast } = useToast();

  const canCheckin = () => {
    const now = new Date();
    const lastCheckin = new Date(streaks.lastCheckin);
    const timeDiff = now.getTime() - lastCheckin.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= 1;
  };

  const handleCheckin = () => {
    if (!canCheckin()) {
      toast({
        title: "Heute schon eingecheckt! ✅",
        description: "Komm morgen wieder für deinen nächsten Streak!",
      });
      return;
    }

    onUpdateStreak();
    toast({
      title: "Streak verlängert! 🔥",
      description: `Fantastisch! Du bist jetzt bei ${streaks.current + 1} Tagen!`,
    });
  };

  const getStreakEmoji = () => {
    if (streaks.current >= 30) return '🏆';
    if (streaks.current >= 14) return '🌟';
    if (streaks.current >= 7) return '🔥';
    if (streaks.current >= 3) return '✨';
    return '💫';
  };

  const getMotivationalMessage = () => {
    if (streaks.current >= 30) return "Unglaublich! Du bist ein wahrer Champion! 🏆";
    if (streaks.current >= 14) return "Zwei Wochen stark! Du bist großartig! 🌟";
    if (streaks.current >= 7) return "Eine ganze Woche! Du machst das toll! 🔥";
    if (streaks.current >= 3) return "Schon 3 Tage! Du bist auf dem richtigen Weg! ✨";
    return "Jeder Tag zählt! Du schaffst das! 💫";
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Calendar className="w-5 h-5" />
          Tägliche Streaks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-6xl mb-2">{getStreakEmoji()}</div>
          <div className="text-3xl font-bold text-orange-800 mb-1">
            {streaks.current}
          </div>
          <p className="text-sm text-orange-600">Tage in Folge</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-orange-700">Längster Streak</span>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              {streaks.longest} Tage
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-orange-700">Gesamt-Tage</span>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {streaks.totalDays} Tage
            </Badge>
          </div>
        </div>

        <Button
          onClick={handleCheckin}
          disabled={!canCheckin()}
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold disabled:opacity-50"
        >
          {canCheckin() ? 'Heute einchecken! ✅' : 'Heute schon erledigt! 🎉'}
        </Button>

        <div className="p-3 bg-orange-100 rounded-lg">
          <p className="text-xs text-orange-700 text-center">
            {getMotivationalMessage()}
          </p>
        </div>

        <div className="text-center text-xs text-orange-600">
          <p>Checke täglich ein, um deinen Streak zu halten! 🌟</p>
        </div>
      </CardContent>
    </Card>
  );
}
