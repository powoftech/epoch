"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-muted/50 z-50 flex h-11 w-30 items-center gap-1 rounded-full border p-1 backdrop-blur-sm" />
    );
  }

  return (
    <div className="bg-muted/50 z-50 flex items-center gap-1 rounded-full border p-1 backdrop-blur-sm">
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
          theme === "system"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
        )}
        title="System theme"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </button>
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
          theme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
        )}
        title="Light theme"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
          theme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
        )}
        title="Dark theme"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </button>
    </div>
  );
}
