"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Send, Calendar, Clock } from "lucide-react";

interface LogFormProps {
  userId: string;
}

export default function LogForm({ userId }: LogFormProps) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0].substring(0, 5));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Combine date and time for server
      const combinedDateTime = new Date(`${date}T${time}:00`);
      
      const response = await axios.post("/api/logs", {
        userId,
        note,
        date: combinedDateTime.toISOString(),
      });
      
      console.log("Log saved:", response.data);
      
      setNote("");
      setDate(new Date().toISOString().split("T")[0]);
      setTime(new Date().toTimeString().split(" ")[0].substring(0, 5));
      router.refresh();
    } catch (error) {
      console.error("Error logging relapse:", error);
      setError("Failed to log relapse. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm font-medium animate-pulse">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive bg-zinc-800/50 text-foreground transition"
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive bg-zinc-800/50 text-foreground transition"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="note" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Send className="h-4 w-4 text-muted-foreground" />
            Note (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 border border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive bg-zinc-800/50 text-foreground transition"
            rows={3}
            placeholder="What triggered the relapse? What could you do differently next time?"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-destructive-foreground font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive/50 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? "Logging..." : "Log Relapse"}
        </button>
        
        <p className="text-sm text-muted-foreground mt-3 italic">
          You can log multiple relapses per day. Each log will track the specific time.
        </p>
      </form>
    </div>
  );
} 