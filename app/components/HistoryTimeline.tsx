import { format } from "date-fns";

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
      <div className="text-center py-8">
        <p className="text-text-secondary">No logs yet. Your history will appear here.</p>
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
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800"></div>
      
      <ul className="space-y-8">
        {Object.entries(groupedLogs).map(([dateKey, dayLogs]) => (
          <li key={dateKey} className="relative pl-10">
            <div className="absolute left-0 top-1.5 w-8 h-8 bg-danger/20 rounded-full flex items-center justify-center">
              <span className="w-3 h-3 bg-danger rounded-full"></span>
            </div>
            
            <div>
              <time className="block text-sm font-medium text-text-secondary">
                {format(new Date(dateKey), "PPP")}
              </time>
              
              <div className="mt-2 space-y-3">
                {dayLogs.map(log => (
                  <div key={log.id} className="bg-background p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <p className="text-text-primary">
                        {log.note ? log.note : "No note added"}
                      </p>
                      <span className="text-xs font-medium bg-surface px-2 py-1 rounded ml-2">
                        {format(new Date(log.time), "p")}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-text-secondary">
                      Logged on {format(new Date(log.createdAt), "PPP 'at' p")}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-1 text-xs font-medium text-danger">
                {dayLogs.length} {dayLogs.length === 1 ? 'time' : 'times'} on this day
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 