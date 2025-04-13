import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StreakCard from "../components/StreakCard";
import HistoryTimeline from "../components/HistoryTimeline";
import MotivationalQuote from "../components/MotivationalQuote";
import Leaderboard from "../components/Leaderboard"; 
import Navbar from "../components/Navbar";       

import { getServerSideConfig, getLeaderboardData } from "../lib/serverUtils";


function getDailyActivityStats(logs: any[]) {
  const counts: Record<string, number> = {};
  logs.forEach(log => {
    const dateKey = format(new Date(log.date), 'yyyy-MM-dd');
    counts[dateKey] = (counts[dateKey] || 0) + 1;
  });
  return Object.entries(counts)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .slice(0, 7) 
    .map(([date, count]) => ({
      date,
      count,
      formattedDate: format(new Date(date), 'MMM d')
    }));
}


function getContributionData(logs: any[]) {
  
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
    
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8"> 
          Welcome back! 
        </h1>

        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

          
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            
            <StreakCard
              currentStreak={user.currentStreak}
              longestStreak={user.longestStreak}
              lastLogDate={user.lastLogDate}
            />
             
            <MotivationalQuote quote={quote} />
            
            {recentActivityStats.length > 0 && (
              <Card className="sm:col-span-2 shadow-lg border border-border/50 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold tracking-tight">
                    Recent Relapse Activity
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Relapses per day from the last 7 active days.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                <div className="space-y-4">
                  {recentActivityStats.map((stat) => (
                    <div key={stat.date} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-12 rounded-full ${stat.count > 0 ? 'bg-destructive' : 'bg-emerald-500'}`}></div>
                        <div>
                          <p className="font-medium text-sm">{stat.formattedDate}</p>
                          <p className="text-xs text-muted-foreground">
                            {stat.count > 0 ? `${stat.count} occurrence${stat.count !== 1 ? 's' : ''}` : 'No occurrences'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`text-sm font-bold ${stat.count > 0 ? 'text-destructive' : 'text-emerald-500'}`}>
                          {stat.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
  
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Total occurrences</p>
                    <p className="text-lg font-bold text-destructive">
                      {recentActivityStats.reduce((total, stat) => total + stat.count, 0)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

             <Card className="sm:col-span-2"> 
              <CardHeader>
                <CardTitle>Your History</CardTitle>
                 <CardDescription>Timeline of your logged relapses.</CardDescription>
              </CardHeader>
              <CardContent>
                <HistoryTimeline logs={logs} />
              </CardContent>
            </Card>

          </div> 

          
          <div className="lg:col-span-1 flex flex-col gap-6 lg:gap-8">
            
            <Leaderboard
              daily={leaderboardData.daily}
              weekly={leaderboardData.weekly}
              monthly={leaderboardData.monthly}
            />
            
          </div> 

        </div> 
      </main>
    </div>
  );
}