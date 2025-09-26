import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Calendar, Users, Settings, Moon, Sun } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Navigation({ currentPage, onPageChange, isDarkMode, onToggleDarkMode }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-primary font-medium">RScheduler</h1>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onPageChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon size={16} />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sun size={16} className="text-muted-foreground" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={onToggleDarkMode}
          />
          <Moon size={16} className="text-muted-foreground" />
        </div>
      </div>
    </nav>
  );
}