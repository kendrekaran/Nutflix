import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import LogForm from "../components/LogForm";
import HistoryTimeline from "../components/HistoryTimeline";
import { getServerSideConfig } from "../lib/serverUtils";

export default async function LogFapPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const { user, logs, quote } = await getServerSideConfig(userId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
          <Send className="h-7 w-7 text-destructive" />
          Log Your Relapse
        </h1>
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Log Form Section */}
          <div>
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 mb-6">
              <LogForm userId={userId} />
            </div>
            
            <div className="bg-surface/40 border border-border rounded-xl p-6 mt-8">
              <h3 className="text-lg font-medium mb-4">Tips for Tracking</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Be honest with yourself - accuracy helps identify patterns</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Include notes about triggers to better understand your habits</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Track emotions, location, and time of day to identify patterns</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Remember this is a tool for awareness, not shame or judgment</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* History Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Recent History</h2>
            <HistoryTimeline logs={logs.slice(0, 10)} />
            
            {logs.length > 10 && (
              <div className="mt-6 text-center">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center px-4 py-2 bg-surface hover:bg-surface/70 text-foreground rounded-lg border border-border/50 transition-colors"
                >
                  View Complete History
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 