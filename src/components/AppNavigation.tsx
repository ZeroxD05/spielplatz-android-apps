
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, BarChart3, Timer, Settings } from 'lucide-react';
import { BuddyDisplay } from './BuddyDisplay';
import { CareActions } from './CareActions';
import { StatsPanel } from './StatsPanel';
import { BuddyCustomization } from './BuddyCustomization';
import { RelaxationTimer } from './RelaxationTimer';

interface AppNavigationProps {
  buddy: any;
  onFeed: () => void;
  onPlay: () => void;
  onPet: () => void;
  onNameChange: (newName: string) => void;
  onBuddyTypeChange: (newType: string) => void;
  onClothingChange: (newClothing: string) => void;
}

export function AppNavigation({ 
  buddy, 
  onFeed, 
  onPlay, 
  onPet, 
  onNameChange,
  onBuddyTypeChange,
  onClothingChange 
}: AppNavigationProps) {
  return (
    <Tabs defaultValue="care" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="care" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Pflege</span> 💖
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Stats</span> 📊
        </TabsTrigger>
        <TabsTrigger value="timer" className="flex items-center gap-2">
          <Timer className="w-4 h-4" />
          <span className="hidden sm:inline">Timer</span> ⏰
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Style</span> 👔
        </TabsTrigger>
      </TabsList>

      <TabsContent value="care" className="space-y-6">
        <BuddyDisplay buddy={buddy} onNameChange={onNameChange} />
        <CareActions
          onFeed={onFeed}
          onPlay={onPlay}
          onPet={onPet}
          buddy={buddy}
        />
      </TabsContent>

      <TabsContent value="stats" className="space-y-6">
        <StatsPanel buddy={buddy} />
      </TabsContent>

      <TabsContent value="timer" className="space-y-6">
        <RelaxationTimer />
      </TabsContent>

      <TabsContent value="custom" className="space-y-6">
        <BuddyCustomization
          buddy={buddy}
          onBuddyTypeChange={onBuddyTypeChange}
          onClothingChange={onClothingChange}
        />
      </TabsContent>
    </Tabs>
  );
}
