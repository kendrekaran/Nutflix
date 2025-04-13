"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-danger/20 text-danger rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-text-primary mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-text-primary"
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-text-primary mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-text-primary"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-text-primary mb-1">
          Note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 border border-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-text-primary"
          rows={3}
          placeholder="What triggered the relapse? What could you do differently next time?"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-danger hover:bg-opacity-90 text-text-primary font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger transition disabled:opacity-50"
      >
        {isLoading ? "Logging..." : "Log Relapse"}
      </button>
      
      <p className="text-sm text-text-secondary mt-2">
        You can log multiple relapses per day. Each log will track the specific time.
      </p>
    </form>
  );
} 