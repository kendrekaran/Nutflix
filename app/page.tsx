import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { Timer, ArrowRight, BookOpen, Shield, Activity, Trophy, LogIn } from "lucide-react";
import { getOrCreateUser } from "./lib/serverUtils";
import InteractiveAppMockup from "./components/InteractiveAppMockup";

export default async function Home() {
  // Get the user's authentication status and streak data
  const { userId } = await auth();
  let userData = null;
  let isAuthenticated = false;
  
  // If user is authenticated, get their streak data
  if (userId) {
    isAuthenticated = true;
    try {
      userData = await getOrCreateUser(userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <main className="min-h-screen  text-white">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <Shield className="h-5 w-5 text-text-primary" />
          </div>
          <span className="text-xl font-bold text-primary">FapTracker</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/leaderboard" className="text-text-secondary hover:text-primary transition">
            Leaderboard
          </Link>
          <a href="dashboard" className="text-text-secondary hover:text-primary transition">
            Dashboard
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-text-secondary hover:text-primary rounded-full">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-full">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="rounded-full">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Feature Button */}
      <div className="container mx-auto px-4 mt-8 flex justify-center">
        <Link href="/leaderboard">
          <Button variant="secondary" className="rounded-full bg-surface/60 hover:bg-surface/80 text-text-primary">
            View Community Leaderboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

       {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-background/95 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-text-primary block mb-2">Your Hand's Been Working Overtime.</span>
              <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                Let's Give It a Promotion.
              </span>
            </h1>
            
            <p className="text-base md:text-lg mt-6 mb-10 text-text-secondary max-w-2xl mx-auto">
              Whether it's once a day or ten, NutFlix helps you stay consistent, avoid injury, and fap with pride. Yes, this is real. No, we're not judging.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto mb-3 sm:mb-0">
                    <Activity className="h-5 w-5 mr-2" />
                    Your Dashboard
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="outline" className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                    <Trophy className="h-5 w-5 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto mb-3 sm:mb-0">
                    <Shield className="h-5 w-5 mr-2" />
                    Start Your Journey
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto mb-3 sm:mb-0">
                    <LogIn className="h-5 w-5 mr-2" />
                    Continue Progress
                  </Button>
                </SignInButton>
                <Link href="/leaderboard">
                  <Button variant="secondary" className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                    <Trophy className="h-5 w-5 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
          
          {/* Add the interactive app mockup component here */}
          <div className="mt-16 flex justify-center">
            <InteractiveAppMockup userData={userData} isAuthenticated={isAuthenticated} />
          </div>
          
          {/* Optional decorative elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-surface/40 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-800">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center mb-4 mx-auto">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary text-center">Track Your Streak</h3>
            <p className="text-text-secondary text-center">Monitor your current and longest streaks with visual progress tracking to stay motivated every day.</p>
          </div>

          <div className="p-6 bg-surface/40 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-800">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary text-center">Learn From Setbacks</h3>
            <p className="text-text-secondary text-center">Record relapses with detailed notes to identify triggers, patterns, and develop personalized strategies.</p>
          </div>

          <div className="p-6 bg-surface/40 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-800">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center mb-4 mx-auto">
              <Timer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary text-center">Get Daily Motivation</h3>
            <p className="text-text-secondary text-center">Access personalized insights, quotes, and visualize your progress over time to celebrate every victory.</p>
          </div>

          <div className="p-6 bg-surface/40 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-800 md:col-span-3">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center mb-4 mx-auto">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary text-center">Community Leaderboard</h3>
            <p className="text-text-secondary text-center mb-4">
              View patterns and get inspired by others on the same journey.
            </p>
            <div className="flex justify-center">
              <Link href="/leaderboard">
                <Button className="rounded-full">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-surface/40 p-8 rounded-xl mb-16">
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">Take Control of Your Life Again</h2>
          <p className="text-text-secondary mb-6 text-center">
            Join thousands who have successfully broken free from addiction and reclaimed their confidence, focus, and well-being.
          </p>
          <div className="flex justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="rounded-full px-6 py-3">
                  Start Your Journey Today
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="rounded-full px-6 py-3">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>

      <footer className="w-full py-8 bg-surface/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className="bg-primary rounded-lg p-1.5">
                  <Shield className="h-4 w-4 text-text-primary" />
                </div>
                <span className="font-bold text-primary">FapTracker</span>
              </div>
              <p className="text-sm text-text-secondary text-center md:text-left">
                &copy; {new Date().getFullYear()} FapTracker. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-primary">About</a>
              <a href="#" className="text-text-secondary hover:text-primary">Privacy</a>
              <a href="#" className="text-text-secondary hover:text-primary">Terms</a>
              <a href="#" className="text-text-secondary hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}