
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GamepadIcon, MapPinIcon, ClockIcon, UsersIcon, StarIcon, HeartIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const games = [
    {
      id: "memory",
      title: "Memory Spiel",
      description: "Trainiere dein Gedächtnis mit diesem klassischen Kartenspiel",
      difficulty: "Einfach",
      players: "1-2 Spieler",
      time: "5-10 Min",
      icon: "🧠"
    },
    {
      id: "puzzle",
      title: "Puzzle Challenge",
      description: "Löse knifflige Rätsel und Puzzle",
      difficulty: "Mittel",
      players: "1 Spieler",
      time: "10-15 Min",
      icon: "🧩"
    },
    {
      id: "quiz",
      title: "Wissens-Quiz",
      description: "Teste dein Wissen in verschiedenen Kategorien",
      difficulty: "Schwer",
      players: "1-4 Spieler",
      time: "15-20 Min",
      icon: "🤔"
    },
    {
      id: "drawing",
      title: "Mal-Spiel",
      description: "Zeichne und rate, was andere gemalt haben",
      difficulty: "Einfach",
      players: "2-6 Spieler",
      time: "10-15 Min",
      icon: "🎨"
    }
  ];

  const activities = [
    {
      id: "outdoor",
      title: "Outdoor Aktivitäten",
      description: "Spiele und Aktivitäten für draußen",
      items: ["Verstecken spielen", "Fangen", "Hüpfspiele", "Ball werfen"],
      icon: "🌳"
    },
    {
      id: "crafts",
      title: "Basteln & Kreativität",
      description: "Kreative Projekte und Bastelideen",
      items: ["Papier falten", "Malen", "Kneten", "Collage erstellen"],
      icon: "✂️"
    },
    {
      id: "learning",
      title: "Lernen & Entdecken",
      description: "Lehrreiche Aktivitäten für neugierige Kinder",
      items: ["Alphabet lernen", "Zahlen üben", "Farben entdecken", "Formen erkennen"],
      icon: "📚"
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      
      toast({
        title: prev.includes(id) ? "Aus Favoriten entfernt" : "Zu Favoriten hinzugefügt",
        description: "Deine Auswahl wurde gespeichert",
      });
      
      return newFavorites;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Einfach": return "bg-green-100 text-green-800";
      case "Mittel": return "bg-yellow-100 text-yellow-800";
      case "Schwer": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GamepadIcon className="h-8 w-8 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-800">Spielplatz App</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Entdecke spannende Spiele und Aktivitäten für Kinder jeden Alters. 
          Lernen, spielen und Spaß haben - alles in einer App!
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="p-4">
            <GamepadIcon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{games.length}</div>
            <div className="text-sm text-gray-600">Spiele</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <MapPinIcon className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{activities.length}</div>
            <div className="text-sm text-gray-600">Aktivitäten</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <HeartIcon className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
            <div className="text-sm text-gray-600">Favoriten</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <StarIcon className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold text-yellow-600">4.8</div>
            <div className="text-sm text-gray-600">Bewertung</div>
          </CardContent>
        </Card>
      </div>

      {/* Games Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <GamepadIcon className="h-8 w-8 text-purple-600" />
          Spiele
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{game.title}</CardTitle>
                      <CardDescription className="mt-1">{game.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(game.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <HeartIcon className={`h-5 w-5 ${favorites.includes(game.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3" />
                    {game.players}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {game.time}
                  </Badge>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Spiel starten
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MapPinIcon className="h-8 w-8 text-green-600" />
          Aktivitäten
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{activity.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {activity.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <StarIcon className="h-6 w-6" />
              Tipp des Tages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Spielzeit ist Lernzeit! Versuche jeden Tag mindestens 30 Minuten aktiv zu spielen. 
              Das hilft bei der Entwicklung von Kreativität, sozialen Fähigkeiten und körperlicher Fitness.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-8">
        <p className="mb-2">© 2024 Spielplatz App - Entwickelt für Kinder und Familien</p>
        <p className="text-sm">Version 1.0.0 | Sicher, lehrreich und macht Spaß!</p>
      </footer>
    </div>
  );
};

export default Index;
