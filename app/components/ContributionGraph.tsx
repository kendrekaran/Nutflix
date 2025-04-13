import React from "react";
import { format, eachDayOfInterval, subMonths, startOfDay } from "date-fns";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { LineChart, Circle } from "lucide-react";

// Interface for contribution data
interface Contribution {
  date: Date | string;
  count: number;
}

interface ContributionGraphProps {
  contributions: Contribution[];
  monthsToShow?: number;
}

const ContributionGraph = ({
  contributions,
  monthsToShow = 12,
}: ContributionGraphProps) => {
  const today = startOfDay(new Date());
  const startDate = subMonths(today, monthsToShow - 1);
  
  // Generate all days from start date to today
  const allDays = eachDayOfInterval({ start: startDate, end: today });
  
  // Map contributions to a dictionary for quick lookup, ensuring dates are properly parsed
  const contributionMap = new Map<string, number>();
  contributions.forEach((contribution) => {
    // Ensure date is a Date object
    const date = contribution.date instanceof Date 
      ? contribution.date 
      : typeof contribution.date === 'string' 
        ? new Date(contribution.date)
        : new Date();
    
    const dateKey = format(date, "yyyy-MM-dd");
    contributionMap.set(dateKey, contribution.count);
  });
  
  // Group days by week for the grid layout
  const weeks: Date[][] = [];
  
  // Calculate the first day of the first week (should be Sunday)
  const firstDayOfWeek = new Date(startDate);
  const dayOfWeek = firstDayOfWeek.getDay();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayOfWeek); // Go back to Sunday
  
  // Generate all weeks
  let currentDate = new Date(firstDayOfWeek);
  while (currentDate <= today) {
    const week: (Date | null)[] = [];
    
    // Add 7 days to the week (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      
      // Only include days that are within our date range
      if (day >= startDate && day <= today) {
        week.push(day);
      } else {
        week.push(null);
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    weeks.push(week as Date[]);
  }
  
  // Get contribution level based on count
  const getContributionLevel = (count: number): string => {
    if (count === 0) return "bg-zinc-800/40 border border-zinc-700/20";
    if (count < 3) return "bg-destructive/20 border border-destructive/10";
    if (count < 6) return "bg-destructive/40 border border-destructive/20";
    if (count < 9) return "bg-destructive/60 border border-destructive/30";
    return "bg-destructive border border-destructive/50";
  };

  // Get visible months for the header
  const visibleMonths: string[] = [];
  let currentMonth = "";
  
  allDays.forEach((day) => {
    const month = format(day, "MMM");
    if (month !== currentMonth) {
      visibleMonths.push(month);
      currentMonth = month;
    }
  });

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 transform transition duration-500 hover:scale-[1.02]">
      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <LineChart className="w-6 h-6 text-primary/60" />
        Activity Heatmap
      </h3>
      
      <div className="max-w-full overflow-x-auto p-2">
        <div className="flex flex-col">
          <div className="flex mb-1 text-xs text-muted-foreground">
            <div className="w-6" /> {/* Spacer for alignment */}
            {visibleMonths.map((month, index) => (
              <div
                key={`month-${index}`}
                className="flex-grow text-center"
                style={{ minWidth: "4rem" }}
              >
                {month}
              </div>
            ))}
          </div>
          
          <div className="flex">
            <div className="flex flex-col mr-2 text-xs text-muted-foreground justify-around h-[124px]">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            
            <div className="grid grid-flow-col auto-cols-min gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
                    const day = week[dayOfWeek];
                    if (!day) return <div key={`empty-${dayOfWeek}`} className="w-3 h-3" />;
                    
                    const dateKey = format(day, "yyyy-MM-dd");
                    const count = contributionMap.get(dateKey) || 0;
                    
                    return (
                      <TooltipProvider key={dateKey}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "w-3 h-3 rounded-sm transition-colors duration-200 hover:scale-125",
                                getContributionLevel(count)
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="bg-zinc-800 text-white text-xs py-1.5 px-3 rounded-md shadow-md border border-zinc-700/50"
                          >
                            {count} contribution{count !== 1 ? "s" : ""} on {format(day, "MMMM do, yyyy")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center mt-6 text-xs text-muted-foreground">
            <span className="mr-2">Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-zinc-800/40 border border-zinc-700/20"></div>
              <div className="w-3 h-3 rounded-sm bg-destructive/20 border border-destructive/10"></div>
              <div className="w-3 h-3 rounded-sm bg-destructive/40 border border-destructive/20"></div>
              <div className="w-3 h-3 rounded-sm bg-destructive/60 border border-destructive/30"></div>
              <div className="w-3 h-3 rounded-sm bg-destructive border border-destructive/50"></div>
            </div>
            <span className="ml-2">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph; 