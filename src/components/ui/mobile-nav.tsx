
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, HomeIcon, GamepadIcon, MapPinIcon, SettingsIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { icon: HomeIcon, label: "Startseite", href: "/" },
    { icon: GamepadIcon, label: "Spiele", href: "/games" },
    { icon: MapPinIcon, label: "Aktivitäten", href: "/activities" },
    { icon: SettingsIcon, label: "Einstellungen", href: "/settings" },
  ];

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white shadow-md">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col gap-4 mt-8">
            <div className="text-center pb-4 border-b">
              <h2 className="text-2xl font-bold text-purple-600">Spielplatz</h2>
              <p className="text-sm text-gray-600">Deine Spiele-App</p>
            </div>
            
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start gap-3 h-12"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
