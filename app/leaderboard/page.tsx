import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Leaderboard from "../components/Leaderboard";
import { getLeaderboardData } from "../lib/serverUtils";

export default async function LeaderboardPage() {
  const { userId } = await auth();
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
              <Link href="/dashboard" className="text-text-secondary hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-primary font-medium">
                Leaderboard
              </Link>
            </nav>
          </div>
          {userId && <UserButton afterSignOutUrl="/" />}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Community Leaderboard</h2>
            <p className="text-text-secondary">See who's been tracking the most in the community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">About the Leaderboard</h3>
              <p className="text-text-secondary mb-4">
                The leaderboard tracks and displays users with the most logged relapses across different time periods.
                This feature is designed to help identify patterns and encourage community engagement.
              </p>
              <p className="text-text-secondary">
                <span className="font-medium text-primary">Remember:</span> This is a tool for awareness and understanding, 
                not a competition. The goal is ultimately to reduce these numbers over time.
              </p>
            </div>
            
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Tracking Periods</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="inline-block w-20 font-medium text-primary">Daily</span>
                  <span>Shows logs recorded today only</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-20 font-medium text-primary">Weekly</span>
                  <span>Shows logs from the current week (Sunday to Saturday)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-20 font-medium text-primary">Monthly</span>
                  <span>Shows logs from the current calendar month</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mx-auto max-w-2xl">
            <Leaderboard 
              daily={leaderboardData.daily}
              weekly={leaderboardData.weekly}
              monthly={leaderboardData.monthly}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-5 py-2.5 bg-primary text-text-primary rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-surface py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Fap Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 