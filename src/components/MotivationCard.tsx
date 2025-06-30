
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Heart, Star, Sparkles } from 'lucide-react';

interface MotivationCardProps {
  message: string;
  onClose: () => void;
}

export function MotivationCard({ message, onClose }: MotivationCardProps) {
  return (
    <Card className="mb-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-2 border-pink-200 shadow-lg animate-fade-in">
      <CardContent className="p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 text-purple-600 hover:text-purple-800"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>
          
          <h3 className="text-xl font-bold text-purple-800 mb-2">
            Persönliche Nachricht für dich! 💌
          </h3>
          
          <p className="text-lg text-purple-700 font-medium">
            {message}
          </p>
          
          <div className="mt-4 text-sm text-purple-600">
            <p>Dein Buddy glaubt an dich! 🌟</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
