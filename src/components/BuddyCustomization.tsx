
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BuddyCustomizationProps {
  buddy: any;
  onBuddyTypeChange: (newType: string) => void;
  onClothingChange: (newClothing: string) => void;
}

export function BuddyCustomization({ buddy, onBuddyTypeChange, onClothingChange }: BuddyCustomizationProps) {
  const buddyTypes = [
    { id: 'default', name: 'Classic', emoji: '🐣', color: 'yellow' },
    { id: 'cat', name: 'Katze', emoji: '🐱', color: 'orange' },
    { id: 'dog', name: 'Hund', emoji: '🐶', color: 'brown' },
    { id: 'bunny', name: 'Hase', emoji: '🐰', color: 'pink' },
    { id: 'panda', name: 'Panda', emoji: '🐼', color: 'black' },
  ];

  const clothingOptions = [
    { id: 'none', name: 'Natürlich', emoji: '✨' },
    { id: 'hat', name: 'Hut', emoji: '🎩' },
    { id: 'bow', name: 'Schleife', emoji: '🎀' },
    { id: 'glasses', name: 'Brille', emoji: '🤓' },
    { id: 'scarf', name: 'Schal', emoji: '🧣' },
    { id: 'crown', name: 'Krone', emoji: '👑' },
  ];

  return (
    <div className="space-y-6">
      {/* Buddy Typ Auswahl */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            🦋 Buddy-Typ wählen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {buddyTypes.map((type) => (
              <Button
                key={type.id}
                variant={buddy.buddyType === type.id ? "default" : "outline"}
                onClick={() => onBuddyTypeChange(type.id)}
                className="h-20 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{type.emoji}</span>
                <span className="text-sm">{type.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kleidung Auswahl */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            👔 Kleidung & Accessoires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {clothingOptions.map((item) => (
              <Button
                key={item.id}
                variant={buddy.clothing === item.id ? "default" : "outline"}
                onClick={() => onClothingChange(item.id)}
                className="h-16 flex flex-col items-center gap-1"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-sm">{item.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aktuelle Auswahl */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-orange-800 mb-2">
              Dein Buddy 🌟
            </h3>
            <div className="text-6xl mb-2">
              {buddyTypes.find(t => t.id === buddy.buddyType)?.emoji || '🐣'}
              {buddy.clothing !== 'none' && clothingOptions.find(c => c.id === buddy.clothing)?.emoji}
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {buddy.name} - {buddyTypes.find(t => t.id === buddy.buddyType)?.name || 'Classic'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
