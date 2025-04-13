"use client";

import { Award, Trophy, Calendar, Star, LineChart, Crown } from "lucide-react";
import React from "react";

// Remove all shadcn/ui component imports as we're not using them anymore

type LeaderboardEntry = {
  userId: string;
  userName: string;
  count: number;
};

type LeaderboardProps = {
  daily: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
};

// Helper to get medal color based on rank
const getMedalColor = (rank: number): string | null => {
  switch (rank) {
    case 1: return "text-yellow-400"; // Gold
    case 2: return "text-zinc-300";   // Silver
    case 3: return "text-amber-600";  // Bronze
    default: return null;
  }
};

export default function Leaderboard({ daily, weekly, monthly }: LeaderboardProps) {
  // State to track the active tab
  const [activeTab, setActiveTab] = React.useState<"daily" | "weekly" | "monthly">("daily");

  const leaderboards = {
    daily,
    weekly,
    monthly,
  };

  const tabIcons = {
    daily: <Calendar className="h-4 w-4" />,
    weekly: <LineChart className="h-4 w-4" />,
    monthly: <Star className="h-4 w-4" />,
  };

  const tabLabels = {
    daily: "Today",
    weekly: "This Week",
    monthly: "This Month"
  };

  const renderLeaderboardTable = (data: LeaderboardEntry[]) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-12 px-4 bg-zinc-800/20 rounded-lg border border-zinc-700/30">
          <Trophy className="h-10 w-10 text-zinc-600 mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground font-medium">No data available for this period.</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later!</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700/50 bg-zinc-800/30">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm w-[70px]">Rank</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">User</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground text-sm">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const rank = index + 1;
              const medalColor = getMedalColor(rank);
              
              return (
                <tr 
                  key={entry.userId} 
                  className={`border-b border-zinc-700/30 hover:bg-zinc-800/70 transition-all duration-200 
                    ${rank <= 3 ? 'bg-zinc-800/40' : ''}`}
                >
                  <td className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-2">
                      {rank === 1 ? (
                        <div className="relative">
                          <Crown className="h-5 w-5 text-yellow-400" />
                          <div className="absolute inset-0 animate-ping opacity-20">
                            <Crown className="h-5 w-5 text-yellow-400" />
                          </div>
                        </div>
                      ) : medalColor ? (
                        <Award className={`h-5 w-5 ${medalColor}`} />
                      ) : (
                        <span className="inline-block w-5 text-center text-xs text-zinc-500">{rank}</span>
                      )}
                      <span className={`font-semibold ${rank <= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${rank <= 3 ? 'text-foreground' : ''}`}>
                      {entry.userName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold text-sm py-1 px-2.5 rounded-full ${
                      rank === 1 ? 'bg-yellow-400/10 text-yellow-400' :
                      rank === 2 ? 'bg-zinc-300/10 text-zinc-300' :
                      rank === 3 ? 'bg-amber-600/10 text-amber-600' :
                      'bg-zinc-800 text-foreground'
                    }`}>
                      {entry.count}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 h-full transform transition duration-500 hover:scale-[1.02] border border-zinc-700/30">
      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-primary/60" />
        Leaderboard
      </h3>

      <div className="flex space-x-1 border-b border-zinc-700/50 mb-5">
        {Object.entries(tabLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as "daily" | "weekly" | "monthly")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-t-lg 
              ${activeTab === key
                ? "bg-zinc-800/80 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-zinc-800/20"
              }`}
          >
            {tabIcons[key as keyof typeof tabIcons]} {label}
          </button>
        ))}
      </div>

      <div className="mt-2 transition-all duration-300 ease-in-out">
        {renderLeaderboardTable(leaderboards[activeTab])}
      </div>
      
      <div className="mt-5 pt-4 border-t border-zinc-700/30">
        <p className="text-xs text-muted-foreground italic">
          Top participants for {tabLabels[activeTab].toLowerCase()} are highlighted.
        </p>
      </div>
    </div>
  );
}