import { format, formatDistanceToNow } from "date-fns";
import { CalendarDays, Trophy, Clock } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: Date;
}

export default function StreakCard({ currentStreak, longestStreak, lastLogDate }: StreakCardProps) {
  const formattedDate = format(new Date(lastLogDate), "PPP");
  const timeAgo = formatDistanceToNow(new Date(lastLogDate), { addSuffix: true });
  
  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Your Streak</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/20 p-2 rounded-lg">
            <CalendarDays className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Current Streak</p>
            <p className="text-2xl font-bold text-text-primary">{currentStreak} days</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-accent/20 p-2 rounded-lg">
            <Trophy className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Longest Streak</p>
            <p className="text-2xl font-bold text-text-primary">{longestStreak} days</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-background p-2 rounded-lg">
            <Clock className="w-6 h-6 text-text-secondary" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Last update</p>
            <p className="font-medium text-text-primary">{formattedDate}</p>
            <p className="text-sm text-text-secondary">{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 