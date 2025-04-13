import { format, formatDistanceToNow } from "date-fns";
import { CalendarDays, Trophy, Clock } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: Date | string;
}

export default function StreakCard({ currentStreak, longestStreak, lastLogDate }: StreakCardProps) {
  // Ensure lastLogDate is a Date object
  const validDate = typeof lastLogDate === 'string' ? new Date(lastLogDate) : lastLogDate;

  // Handle invalid date case gracefully
  const formattedDate = validDate.toString() !== "Invalid Date" ? format(validDate, "PPP") : "N/A";
  const timeAgo = validDate.toString() !== "Invalid Date"
    ? formatDistanceToNow(validDate, { addSuffix: true })
    : "Never";

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 h-full transform transition duration-500 hover:scale-[1.02]">
      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <CalendarDays className="w-6 h-6 text-primary/60" />
        Your Streak
      </h3>

      <div className="space-y-6 mt-4">
        {/* Current Streak Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-foreground">
              {currentStreak ?? 0} days
            </p>
          </div>
        </div>

        {/* Longest Streak Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Trophy className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Longest Streak</p>
            <p className="text-2xl font-bold text-foreground">
              {longestStreak ?? 0} days
            </p>
          </div>
        </div>

        {/* Last Update Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted/20">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Last Relapse Logged</p>
            {validDate.toString() !== "Invalid Date" ? (
              <>
                <p className="text-base font-medium text-foreground">{formattedDate}</p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </>
            ) : (
              <p className="text-base font-medium text-muted-foreground">{timeAgo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}