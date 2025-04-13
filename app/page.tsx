import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "./components/ui/button"; // Assuming Button uses theme colors
import {
  Timer,
  ArrowRight,
  BookOpen,
  Shield,
  Activity,
  Trophy,
  LogIn,
  Send,
} from "lucide-react";
import { getOrCreateUser } from "./lib/serverUtils";
import Navbar from "./components/Navbar"; // Assuming Navbar uses theme colors

export default async function Home() {
  const { userId } = await auth();
  let userData = null;
  let isAuthenticated = false;

  if (userId) {
    isAuthenticated = true;
    try {
      userData = await getOrCreateUser(userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error appropriately, maybe show a message
    }
  }

  return (
    // Use background colors from palette
    <main className="min-h-screen overflow-hidden text-text-primary bg-gradient-to-b from-background to-surface">
      {/* Navbar */}
      <Navbar />

      {/* CTA Button - Using primary color */}
      <div className="container mx-auto px-4 mt-16 flex justify-center">
        <Link href="/logfap">
          <Button className="rounded-full px-3 py-1 text-xs bg-destructive/30 hover:bg-destructive/40 text-text-primary shadow-lg transition duration-300">
            Log Your Relapse
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 text-center">
        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sora font-extrabold leading-tight mb-6">
            {/* Use text-primary */}
            <span className="block text-text-primary">Your Hand's Been Working Overtime.</span>
            {/* Use primary/danger gradient for accent */}
            <span className="bg-gradient-to-r from-primary to-danger text-transparent bg-clip-text">
              Let's Give It a Promotion.
            </span>
          </h1>

          {/* Use text-secondary */}
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Whether it's once a day or ten, NutFlix helps you stay consistent,
            avoid injury, and fap with pride. Yes, this is real. No, we're not judging.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                {/* Default button likely uses primary bg and contrasting text */}
                <Button className="rounded-full px-8 py-4 text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Your Dashboard
                </Button>
              </Link>
              <Link href="/logfap">
                 {/* Use border-border and text-secondary for outline */}
                <Button variant="outline" className="rounded-full px-8 py-4 text-lg flex items-center gap-2 border-border text-text-secondary hover:bg-surface/50 hover:text-text-primary">
                  <Send className="h-5 w-5" />
                  Log Relapse
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                 {/* Default button likely uses primary bg and contrasting text */}
                <Button className="rounded-full px-8 py-4 text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Start Your Journey
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                {/* Use border-border and text-secondary for outline */}
                <Button variant="outline" className="rounded-full px-8 py-4 text-lg flex items-center gap-2 border-border text-text-secondary hover:bg-surface/50 hover:text-text-primary">
                  <LogIn className="h-5 w-5" />
                  Continue Progress
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Glowing blobs - Use palette colors with alpha */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-96 h-96 bg-danger/10 rounded-full blur-3xl z-0" />
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              // Use primary for Activity
              icon: <Activity className="h-6 w-6 text-primary" />,
              title: "Track Your Streak",
              desc: "Monitor your progress and stay motivated every day.",
            },
            {
              // Use success for BookOpen (learning)
              icon: <BookOpen className="h-6 w-6 text-success" />,
              title: "Learn From Setbacks",
              desc: "Log relapses with notes to track triggers and patterns.",
            },
            {
              // Use secondary (yellow) for Timer (daily motivation)
              icon: <Timer className="h-6 w-6 text-secondary" />,
              title: "Daily Motivation",
              desc: "Get insights, quotes, and celebrate every small win.",
            },
          ].map((item, i) => (
            <div
              key={i}
              // Use bg-surface and border-border
              className="bg-surface border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              {/* Use bg-background */}
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-background rounded-full">
                {item.icon}
              </div>
              {/* Use text-primary */}
              <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
              {/* Use text-secondary */}
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Community Leaderboard Section */}
        {/* Use bg-surface and border-border */}
        <div className="mt-16 text-center bg-surface p-10 rounded-xl border border-border">
           {/* Icon uses text-primary */}
          <ArrowRight className="h-8 w-8 mx-auto text-primary mb-4" />
          {/* Use text-primary */}
          <h2 className="text-2xl font-bold mb-2 text-text-primary">Community Leaderboard</h2>
          {/* Use text-secondary */}
          <p className="text-text-secondary mb-6">
            Get inspired by people on the same journey as you.
          </p>
          <Link href="/leaderboard">
            {/* Default button likely uses primary bg */}
            <Button className="rounded-full px-8 py-3 text-lg">View Leaderboard</Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
       {/* Use bg-surface and border-border */}
      <section className="container mx-auto px-4 py-16 text-center bg-surface rounded-xl border border-border">
         {/* Use text-primary */}
        <h2 className="text-3xl font-bold text-text-primary mb-4">Take Control of Your Life Again</h2>
         {/* Use text-secondary */}
        <p className="text-text-secondary mb-6">
          Join thousands who've overcome urges and rediscovered self-control, confidence, and clarity.
        </p>
        <div className="flex justify-center">
          <SignedOut>
            <SignUpButton mode="modal">
               {/* Default button likely uses primary bg */}
              <Button className="rounded-full px-8 py-3 text-lg">Start Your Journey Today</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
               {/* Default button likely uses primary bg */}
              <Button className="rounded-full px-8 py-3 text-lg">Go to Dashboard</Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
       {/* Use border-border and bg-surface */}
      <footer className="mt-20 border-t border-border py-8 bg-surface">
        {/* Use text-secondary for copyright */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-text-secondary">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
             {/* Use bg-primary */}
            <div className="bg-primary p-2 rounded-md">
              {/* Use text-primary (white) for contrast on primary bg */}
              <Shield className="h-5 w-5 text-text-primary" />
            </div>
             {/* Use text-primary for logo text */}
            <span className="font-semibold text-text-primary">NutFlix</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} NutFlix. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}