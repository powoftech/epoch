"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { format, formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Unit = "auto" | "seconds" | "milliseconds";

export function EpochToDate() {
  const [input, setInput] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("auto");
  const [date, setDate] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [inferredUnit, setInferredUnit] = React.useState<
    "seconds" | "milliseconds" | null
  >(null);

  React.useEffect(() => {
    if (!input.trim()) {
      setDate(null);
      setError(null);
      setInferredUnit(null);
      return;
    }

    const num = Number(input);
    if (isNaN(num)) {
      setError("Please enter a valid number");
      setDate(null);
      setInferredUnit(null);
      return;
    }

    setError(null);

    let finalNum = num;
    let currentInferredUnit: "seconds" | "milliseconds" = "seconds";

    if (unit === "auto") {
      if (num > 20000000000) {
        currentInferredUnit = "milliseconds";
      } else {
        currentInferredUnit = "seconds";
      }
    } else {
      currentInferredUnit = unit;
    }

    setInferredUnit(currentInferredUnit);

    if (currentInferredUnit === "seconds") {
      finalNum = finalNum * 1000;
    }

    const parsedDate = new Date(finalNum);
    if (isNaN(parsedDate.getTime())) {
      setError("Invalid date generated");
      setDate(null);
    } else {
      setDate(parsedDate);
    }
  }, [input, unit]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Card className="bg-card border-border/50 dark:bg-card/40 w-full shadow-lg dark:shadow-none dark:backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Epoch to Date</CardTitle>
        <CardDescription>
          Convert a timestamp into human-readable formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="e.g. 1735740000"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`h-12 font-mono text-lg transition-colors ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {error && (
              <AlertCircle className="text-destructive absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs defaultValue="auto">
              <TabsList>
                <TabsTrigger value="auto" onClick={() => setUnit("auto")}>
                  Auto
                </TabsTrigger>
                <TabsTrigger value="seconds" onClick={() => setUnit("seconds")}>
                  Seconds
                </TabsTrigger>
                <TabsTrigger
                  value="milliseconds"
                  onClick={() => setUnit("milliseconds")}
                >
                  Miliseconds
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {input && !error && unit === "auto" && inferredUnit && (
              <span className="text-muted-foreground animate-in fade-in slide-in-from-right-2 text-xs font-medium">
                Auto-detected as{" "}
                <strong className="text-foreground">{inferredUnit}</strong>
              </span>
            )}
          </div>
        </div>

        <div className="border-border/40 space-y-3 border-t pt-4">
          {!date || error ? (
            <div className="space-y-3">
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <ResultBox
                label="Local Time"
                value={format(date, "EEEE, MMMM d, yyyy 'at' h:mm:ss a zzz")}
                onCopy={() =>
                  copyToClipboard(
                    format(date, "EEEE, MMMM d, yyyy 'at' h:mm:ss a zzz"),
                    "Local Time",
                  )
                }
              />
              <ResultBox
                label="ISO 8601"
                value={date.toISOString()}
                onCopy={() => copyToClipboard(date.toISOString(), "ISO 8601")}
              />
              <ResultBox
                label="RFC 3339"
                value={format(date, "yyyy-MM-dd'T'HH:mm:ssXXX")}
                onCopy={() =>
                  copyToClipboard(
                    format(date, "yyyy-MM-dd'T'HH:mm:ssXXX"),
                    "RFC 3339",
                  )
                }
              />
              <ResultBox
                label="Relative Time"
                value={`${formatDistanceToNow(date)} ${date.getTime() > Date.now() ? "from now" : "ago"}`}
                onCopy={() =>
                  copyToClipboard(
                    `${formatDistanceToNow(date)} ${date.getTime() > Date.now() ? "from now" : "ago"}`,
                    "Relative Time",
                  )
                }
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ResultBox({
  label,
  value,
  onCopy,
  className = "",
}: {
  label: string;
  value: string;
  onCopy: () => void;
  className?: string;
}) {
  return (
    <div
      className={`group border-border/50 bg-background/50 hover:bg-muted/30 relative flex flex-col rounded-xl border p-3 transition-colors hover:cursor-pointer ${className}`}
      onClick={onCopy}
    >
      <span className="text-muted-foreground mb-1 text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <span className="text-foreground truncate text-sm font-medium">
          {value}
        </span>
      </div>
    </div>
  );
}
