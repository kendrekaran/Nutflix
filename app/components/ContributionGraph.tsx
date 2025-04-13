import React from "react";
import { format, eachDayOfInterval, subMonths, startOfDay, parseISO } from "date-fns";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

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
    if (count === 0) return "bg-[#1A1F2C] border border-[#222222]/20";
    if (count < 3) return "bg-[#0E4429] border border-[#222222]/20";
    if (count < 6) return "bg-[#006D32] border border-[#222222]/20";
    if (count < 9) return "bg-[#26A641] border border-[#222222]/20";
    return "bg-[#39D353] border border-[#222222]/20";
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
    <div className="max-w-full overflow-x-auto p-4">
      <div className="flex flex-col">
        <div className="flex mb-1 text-xs text-gray-400">
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
          <div className="flex flex-col mr-2 text-xs text-gray-400 justify-around h-[124px]">
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
                              "w-3 h-3 rounded-sm transition-colors duration-200",
                              getContributionLevel(count)
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="bg-gray-800 text-white text-xs py-1 px-2 rounded-md shadow-md"
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
        
        <div className="flex items-center mt-4 text-xs text-gray-400">
          <span className="mr-2">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#1A1F2C] border border-[#222222]/20"></div>
            <div className="w-3 h-3 rounded-sm bg-[#0E4429] border border-[#222222]/20"></div>
            <div className="w-3 h-3 rounded-sm bg-[#006D32] border border-[#222222]/20"></div>
            <div className="w-3 h-3 rounded-sm bg-[#26A641] border border-[#222222]/20"></div>
            <div className="w-3 h-3 rounded-sm bg-[#39D353] border border-[#222222]/20"></div>
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph; 