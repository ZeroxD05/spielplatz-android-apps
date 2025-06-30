
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

interface ActivityCardProps {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export function ActivityCard({ title, description, items, icon }: ActivityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-102">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">{icon}</div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant="outline" 
          className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700"
        >
          Aktivität starten
        </Button>
      </CardContent>
    </Card>
  );
}
