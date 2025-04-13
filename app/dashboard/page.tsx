import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StreakCard from "../components/StreakCard";
import LogForm from "../components/LogForm";
import HistoryTimeline from "../components/HistoryTimeline";
import MotivationalQuote from "../components/MotivationalQuote";
import Leaderboard from "../components/Leaderboard";

import { getServerSideConfig, getLeaderboardData } from "../lib/serverUtils";
import { format } from "date-fns";
import Link from "next/link";

// Helper to count logs per day
function getDailyActivityStats(logs: any[]) {
  const counts: Record<string, number> = {};
  
  logs.forEach(log => {
    const dateKey = format(new Date(log.date), 'yyyy-MM-dd');
    counts[dateKey] = (counts[dateKey] || 0) + 1;
  });
  
  return Object.entries(counts)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .slice(0, 7) // last 7 days with activity
    .map(([date, count]) => ({
      date,
      count,
      formattedDate: format(new Date(date), 'MMM d')
    }));
}

// Helper to format logs for contribution graph
function getContributionData(logs: any[]) {
  const counts: Record<string, number> = {};
  
  logs.forEach(log => {
    const dateKey = format(new Date(log.date), 'yyyy-MM-dd');
    counts[dateKey] = (counts[dateKey] || 0) + 1;
  });
  
  return Object.entries(counts).map(([dateStr, count]) => ({
    date: new Date(dateStr),
    count
  }));
}

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }
  
  const { user, logs, quote } = await getServerSideConfig(userId);
  const recentActivityStats = getDailyActivityStats(logs);

  const leaderboardData = await getLeaderboardData();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">Fap Tracker</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-text-secondary hover:text-primary transition-colors">
                Leaderboard
              </Link>
            </nav>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Your Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StreakCard 
              currentStreak={user.currentStreak} 
              longestStreak={user.longestStreak} 
              lastLogDate={user.lastLogDate} 
            />
            
            <MotivationalQuote quote={quote} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-surface rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Activity Heatmap</h3>
                <p className="text-xs text-text-secondary mt-2">Visualization of your relapses over time. Darker colors indicate more relapses on that day.</p>
              </div>
              
              {recentActivityStats.length > 0 && (
                <div className="bg-surface rounded-lg shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Recent Activity</h3>
                  <div className="overflow-x-auto">
                    <div className="flex space-x-1 md:space-x-2 min-w-full py-2">
                      {recentActivityStats.map(stat => (
                        <div key={stat.date} className="flex flex-col items-center min-w-16">
                          <div className="text-sm text-text-secondary">{stat.formattedDate}</div>
                          <div className="mt-1 bg-danger/20 w-full max-w-12 rounded-md py-1 text-center">
                            <span className="text-danger font-semibold">{stat.count}x</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-2">Shows number of relapses per day for your most recent activity days.</p>
                </div>
              )}
            </div>
            
            <div className="col-span-1">
              <Leaderboard 
                daily={leaderboardData.daily}
                weekly={leaderboardData.weekly}
                monthly={leaderboardData.monthly}
              />
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-primary mb-4">Log a Relapse</h3>
            <LogForm userId={userId} />
          </div>
          
          <div className="bg-surface rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Your History</h3>
            <HistoryTimeline logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
} 