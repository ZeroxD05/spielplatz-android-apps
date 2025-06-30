
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function RelaxationTimer() {
  const [time, setTime] = useState(300); // 5 Minuten default
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(300);

  const timeOptions = [
    { label: '5 Min', value: 300, emoji: '🌱' },
    { label: '10 Min', value: 600, emoji: '🌸' },
    { label: '15 Min', value: 900, emoji: '🌺' },
    { label: '20 Min', value: 1200, emoji: '🌻' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      // Zeige Benachrichtigung
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Entspannung beendet! 🧘‍♀️', {
          body: 'Zeit für eine Pause ist vorbei. Gut gemacht!',
          icon: '🧘‍♀️'
        });
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(selectedTime);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          ⏰ Entspannungs-Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Auswahl */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedTime === option.value ? "default" : "outline"}
              onClick={() => {
                setSelectedTime(option.value);
                if (!isRunning) setTime(option.value);
              }}
              className="h-16 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-sm">{option.label}</span>
            </Button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-800 mb-4 font-mono">
            {formatTime(time)}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={isRunning ? () => setIsRunning(false) : startTimer}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause ⏸️
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start ▶️
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset 🔄
            </Button>
          </div>
        </div>

        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-700">
            🧘‍♀️ Atme ruhig und entspanne dich
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
