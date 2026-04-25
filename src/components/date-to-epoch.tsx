"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import * as React from "react";
import { toast } from "sonner";

export function DateToEpoch() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);

  const handleSetNow = React.useCallback(() => {
    const now = new Date();
    setDate(now);
    // Format for datetime-local: YYYY-MM-DDThh:mm:ss
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - tzOffset)
      .toISOString()
      .slice(0, -1);
    setInputValue(localISOTime.slice(0, 19));
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
    handleSetNow();
  }, [handleSetNow]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setDate(null);
      return;
    }
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    } else {
      setDate(null);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Card className="bg-card border-border/50 dark:bg-card/40 w-full shadow-lg dark:shadow-none dark:backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Date to Epoch</CardTitle>
        <CardDescription>
          Convert a local date and time into a timestamp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="datetime-local"
            step="1"
            value={inputValue}
            onChange={handleInputChange}
            className="h-12 flex-1 cursor-pointer font-mono text-base"
          />
          <Button
            onClick={handleSetNow}
            variant="default"
            className="h-12 px-6"
          >
            Now
          </Button>
        </div>

        <div className="border-border/40 space-y-3 border-t pt-4">
          {!isMounted || !date ? (
            <div className="space-y-3">
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
              <Skeleton className="h-17 w-full rounded-xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <ResultBox
                label="Epoch Seconds"
                value={Math.floor(date.getTime() / 1000).toString()}
                onCopy={() =>
                  copyToClipboard(
                    Math.floor(date.getTime() / 1000).toString(),
                    "Epoch Seconds",
                  )
                }
              />
              <ResultBox
                label="Epoch Milliseconds"
                value={date.getTime().toString()}
                onCopy={() =>
                  copyToClipboard(
                    date.getTime().toString(),
                    "Epoch Milliseconds",
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
      className={`group border-border/50 bg-background/50 hover:bg-muted/30 relative flex flex-col rounded-xl border p-3 transition-colors hover:cursor-pointer ${className} `}
      onClick={onCopy}
    >
      <span className="text-muted-foreground mb-1 text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <span className="text-foreground truncate text-sm font-medium">
          {value}
        </span>
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onCopy}
          title={`Copy ${label}`}
        >
          <Copy className="h-3 w-3" />
        </Button> */}
      </div>
    </div>
  );
}
