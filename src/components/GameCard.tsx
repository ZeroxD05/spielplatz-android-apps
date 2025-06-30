
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, PlayIcon, UsersIcon, ClockIcon } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  players: string;
  time: string;
  icon: string;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function GameCard({ 
  id, 
  title, 
  description, 
  difficulty, 
  players, 
  time, 
  icon, 
  onFavorite, 
  isFavorite 
}: GameCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Einfach": return "bg-green-100 text-green-800";
      case "Mittel": return "bg-yellow-100 text-yellow-800";
      case "Schwer": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Hier würde normalerweise das Spiel gestartet
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">{icon}</div>
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFavorite(id)}
            className="text-red-500 hover:text-red-600"
          >
            <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <UsersIcon className="h-3 w-3" />
            {players}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {time}
          </Badge>
        </div>
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50" 
          onClick={handlePlay}
          disabled={isPlaying}
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          {isPlaying ? "Spiel lädt..." : "Spiel starten"}
        </Button>
      </CardContent>
    </Card>
  );
}
