
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, Heart, Star, Calendar, Award } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { icon: Heart, label: "Mein Buddy", href: "/" },
    { icon: Star, label: "Abenteuer", href: "/adventures" },
    { icon: Calendar, label: "Streaks", href: "/streaks" },
    { icon: Award, label: "Erfolge", href: "/achievements" },
  ];

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white shadow-md border-purple-200">
            <MenuIcon className="h-5 w-5 text-purple-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gradient-to-b from-purple-50 to-pink-50">
          <div className="flex flex-col gap-4 mt-8">
            <div className="text-center pb-4 border-b border-purple-200">
              <div className="text-4xl mb-2">🐣</div>
              <h2 className="text-2xl font-bold text-purple-600">Buddy App</h2>
              <p className="text-sm text-purple-500">Dein süßer Begleiter</p>
            </div>
            
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start gap-3 h-12 text-purple-700 hover:bg-purple-100"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
            
            <div className="mt-auto p-4 bg-purple-100 rounded-lg">
              <p className="text-xs text-purple-700 text-center">
                "Vergiss nicht, dich um deinen Buddy zu kümmern! 💜"
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
