import { format } from "date-fns";
import { History, Clock, MessageSquare, Calendar } from "lucide-react";

interface Log {
  id: string;
  date: Date;
  time: Date;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface HistoryTimelineProps {
  logs: Log[];
}

export default function HistoryTimeline({ logs }: HistoryTimelineProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 h-full transform transition duration-500 hover:scale-[1.02]">
        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <History className="w-6 h-6 text-primary/60" />
          Your History
        </h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No logs yet. Your history will appear here.</p>
        </div>
      </div>
    );
  }

  // Group logs by date
  const groupedLogs: Record<string, Log[]> = {};
  logs.forEach(log => {
    const dateKey = format(new Date(log.date), 'yyyy-MM-dd');
    if (!groupedLogs[dateKey]) {
      groupedLogs[dateKey] = [];
    }
    groupedLogs[dateKey].push(log);
  });

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 h-full transform transition duration-500 hover:scale-[1.02]">
      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <History className="w-6 h-6 text-primary/60" />
        Your History
      </h3>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700/50"></div>
        
        <ul className="space-y-8">
          {Object.entries(groupedLogs).map(([dateKey, dayLogs]) => (
            <li key={dateKey} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center border border-destructive/30 shadow-sm">
                <span className="w-3 h-3 bg-destructive rounded-full"></span>
              </div>
              
              <div>
                <time className="block text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(dateKey), "PPP")}
                </time>
                
                <div className="mt-3 space-y-3">
                  {dayLogs.map(log => (
                    <div 
                      key={log.id} 
                      className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50 shadow-sm hover:bg-zinc-800/70 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <p className="text-foreground flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <span>{log.note ? log.note : "No note added"}</span>
                        </p>
                        <span className="text-xs font-medium bg-zinc-900/80 px-2.5 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                          <Clock className="h-3 w-3" />
                          {format(new Date(log.time), "p")}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground pl-6">
                        Logged on {format(new Date(log.createdAt), "PPP 'at' p")}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-2 text-xs font-medium text-destructive flex items-center gap-1 pl-2">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive/10 text-destructive">
                    {dayLogs.length}
                  </span>
                  {dayLogs.length === 1 ? 'time' : 'times'} on this day
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 