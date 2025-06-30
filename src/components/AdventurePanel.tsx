
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdventurePanelProps {
  buddy: {
    level: number;
    happiness: number;
    health: number;
  };
  currentAdventure: {
    id: string;
    name: string;
    description: string;
    duration: number;
    startTime: Date;
    reward: number;
    emoji: string;
  } | null;
  onStartAdventure: (adventure: any) => void;
  onCompleteAdventure: () => void;
}

export function AdventurePanel({ buddy, currentAdventure, onStartAdventure, onCompleteAdventure }: AdventurePanelProps) {
  const { toast } = useToast();

  const adventures = [
    {
      id: 'forest',
      name: 'Waldspaziergang',
      description: 'Ein friedlicher Spaziergang durch den verzauberten Wald',
      duration: 30, // minutes
      reward: 50,
      emoji: '🌳',
      requirements: { level: 1, happiness: 30 }
    },
    {
      id: 'meadow',
      name: 'Blumenwiese',
      description: 'Sammle bunte Blumen auf der sonnigen Wiese',
      duration: 45,
      reward: 75,
      emoji: '🌸',
      requirements: { level: 3, happiness: 50 }
    },
    {
      id: 'mountain',
      name: 'Bergwanderung',
      description: 'Erklimme die Gipfel und genieße die Aussicht',
      duration: 90,
      reward: 150,
      emoji: '🏔️',
      requirements: { level: 5, happiness: 70 }
    },
    {
      id: 'ocean',
      name: 'Meeresabenteuer',
      description: 'Entdecke die Geheimnisse des blauen Ozeans',
      duration: 120,
      reward: 200,
      emoji: '🌊',
      requirements: { level: 8, happiness: 80 }
    }
  ];

  const getAdventureProgress = () => {
    if (!currentAdventure) return 0;
    
    const now = new Date().getTime();
    const start = new Date(currentAdventure.startTime).getTime();
    const duration = currentAdventure.duration * 60 * 1000; // convert to milliseconds
    const elapsed = now - start;
    
    return Math.min((elapsed / duration) * 100, 100);
  };

  const canCompleteAdventure = () => {
    return currentAdventure && getAdventureProgress() >= 100;
  };

  const canStartAdventure = (adventure: any) => {
    return buddy.level >= adventure.requirements.level && 
           buddy.happiness >= adventure.requirements.happiness;
  };

  const handleStartAdventure = (adventure: any) => {
    if (!canStartAdventure(adventure)) {
      toast({
        title: "Abenteuer nicht verfügbar! 🚫",
        description: `Dein Buddy braucht Level ${adventure.requirements.level} und ${adventure.requirements.happiness}% Glück.`,
      });
      return;
    }

    onStartAdventure(adventure);
    toast({
      title: "Abenteuer gestartet! 🎒",
      description: `${adventure.name} - Dein Buddy ist unterwegs!`,
    });
  };

  const handleCompleteAdventure = () => {
    if (!canCompleteAdventure()) {
      toast({
        title: "Abenteuer läuft noch! ⏰",
        description: "Dein Buddy ist noch unterwegs...",
      });
      return;
    }

    const reward = currentAdventure!.reward;
    onCompleteAdventure();
    toast({
      title: "Abenteuer abgeschlossen! 🎉",
      description: `Dein Buddy hat ${reward} XP verdient!`,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Star className="w-5 h-5" />
          Abenteuer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentAdventure ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{currentAdventure.emoji}</div>
              <h3 className="font-bold text-blue-800">{currentAdventure.name}</h3>
              <p className="text-sm text-blue-600">{currentAdventure.description}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-700">Fortschritt</span>
                <span className="text-sm text-blue-600">
                  {Math.floor(getAdventureProgress())}%
                </span>
              </div>
              <Progress value={getAdventureProgress()} className="h-3" />
            </div>

            <Button
              onClick={handleCompleteAdventure}
              disabled={!canCompleteAdventure()}
              className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold disabled:opacity-50"
            >
              {canCompleteAdventure() ? `Belohnung einsammeln! (+${currentAdventure.reward} XP)` : 'Abenteuer läuft...'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-blue-700 text-center mb-4">
              Wähle ein Abenteuer für deinen Buddy!
            </p>
            
            {adventures.map((adventure) => (
              <div key={adventure.id} className="p-3 border rounded-lg bg-white/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{adventure.emoji}</span>
                    <div>
                      <h4 className="font-medium text-blue-800">{adventure.name}</h4>
                      <p className="text-xs text-blue-600">{adventure.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {adventure.duration}min
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      +{adventure.reward} XP
                    </Badge>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleStartAdventure(adventure)}
                    disabled={!canStartAdventure(adventure)}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                  >
                    Start
                  </Button>
                </div>
                
                {!canStartAdventure(adventure) && (
                  <p className="text-xs text-red-500 mt-1">
                    Benötigt: Level {adventure.requirements.level}, {adventure.requirements.happiness}% Glück
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
