import { LiveEpoch } from "@/components/live-epoch";
import { EpochToDate } from "@/components/epoch-to-date";
import { DateToEpoch } from "@/components/date-to-epoch";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden p-4 sm:p-8">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-primary/10 absolute top-0 left-1/2 h-125 w-200 max-w-full -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="bg-secondary/10 absolute right-0 bottom-0 h-125 w-125 max-w-full rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 w-full max-w-4xl space-y-6 duration-1000 sm:mt-0 sm:space-y-8">
          <LiveEpoch />

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            <EpochToDate />
            <DateToEpoch />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-8">
        <ThemeToggle />
      </div>
    </main>
  );
}
