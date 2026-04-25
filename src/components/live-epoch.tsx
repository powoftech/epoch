"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export function LiveEpoch() {
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (now === null) {
    return (
      <Card className="bg-primary/5 border-primary/20 relative w-full overflow-hidden">
        <CardHeader className="pb-3 text-center">
          <CardTitle className="text-primary flex items-center justify-center gap-2">
            Live Epoch Time
          </CardTitle>
          <CardDescription>
            Current timestamp in seconds and milliseconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 h-18 animate-pulse rounded-xl" />
          <div className="bg-primary/10 h-18 animate-pulse rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  const seconds = Math.floor(now / 1000).toString();
  const milliseconds = now.toString();

  return (
    <Card className="bg-card border-border/50 dark:bg-card/40 relative w-full overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl dark:shadow-none dark:backdrop-blur-xl">
      <div className="from-primary/10 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-50" />
      <CardHeader className="relative z-10 pb-3 text-center">
        <CardTitle className="text-primary flex items-center justify-center gap-2">
          Live Epoch Time
        </CardTitle>
        <CardDescription>
          Current timestamp in seconds and milliseconds
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div
          className="group border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 relative flex flex-col items-center justify-center rounded-xl border p-4 backdrop-blur-sm transition-all hover:cursor-pointer"
          onClick={() => copyToClipboard(seconds, "Epoch seconds")}
        >
          <span className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
            Seconds
          </span>
          <div className="flex items-center gap-3">
            <span className="text-foreground font-mono text-4xl font-bold tracking-tight tabular-nums">
              {seconds}
            </span>
          </div>
        </div>

        <div
          className="group border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 relative flex flex-col items-center justify-center rounded-xl border p-4 backdrop-blur-sm transition-all hover:cursor-pointer"
          onClick={() => copyToClipboard(milliseconds, "Epoch milliseconds")}
        >
          <span className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
            Milliseconds
          </span>
          <div className="flex items-center gap-3">
            <span className="text-foreground font-mono text-4xl font-bold tracking-tight tabular-nums">
              {milliseconds}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
