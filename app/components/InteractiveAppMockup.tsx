"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Shield, Play, Pause, MoreVertical, Clock, Lock } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

// Define types for user data
interface UserData {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string | Date;
}

interface InteractiveAppMockupProps {
  userData?: UserData | null;
  isAuthenticated: boolean;
}

export default function InteractiveAppMockup({ userData, isAuthenticated }: InteractiveAppMockupProps) {
  // Initialize streak from user data or default to 7
  const [streak, setStreak] = useState(userData?.currentStreak || 7);
  const [longestStreak, setLongestStreak] = useState(userData?.longestStreak || 7);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // Update streak when userData changes
  useEffect(() => {
    if (userData) {
      setStreak(userData.currentStreak);
      setLongestStreak(userData.longestStreak);
    }
  }, [userData]);
  
  // Format timer to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format date
  const formatDate = (dateString: string | Date): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);
  
  // Handle timer controls
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };
  
  // Streak controls
  const incrementStreak = () => {
    if (!isAuthenticated) return; // Only allow if authenticated
    setStreak((prev) => prev + 1);
    
    // Update longest streak if applicable
    if (streak + 1 > longestStreak) {
      setLongestStreak(streak + 1);
    }
  };
  
  const resetStreak = () => {
    if (!isAuthenticated) return; // Only allow if authenticated
    setStreak(0);
  };
  
  return (
    <div className="relative">
      <div className="bg-surface/90 rounded-3xl p-8 shadow-2xl max-w-sm animate-float">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-1">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold">
              Fap<span className="text-primary">Tracker</span>
            </span>
          </div>
        </div>
        
        {showControls ? (
          <div className="animate-in fade-in duration-200">
            <div className="mb-4 text-center">
              <h3 className="text-text-primary text-lg font-medium mb-3">
                {isAuthenticated ? 'Streak Controls' : 'Login to Track'}
              </h3>
              {isAuthenticated ? (
                <div className="flex justify-center gap-3">
                  <Button onClick={incrementStreak} className="rounded-full">
                    +1 Day
                  </Button>
                  <Button onClick={resetStreak} variant="destructive" className="rounded-full">
                    Reset
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-text-secondary mb-3">Sign in to track your progress and save your streak.</p>
                  <SignInButton mode="modal">
                    <Button className="rounded-full">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
            
            <div className="mb-4 text-center">
              <h3 className="text-text-primary text-lg font-medium mb-3">Stopwatch</h3>
              <div className="text-2xl font-mono mb-2">{formatTime(timer)}</div>
              <div className="flex justify-center gap-3">
                <Button onClick={toggleTimer} className="rounded-full">
                  {isRunning ? "Pause" : "Start"}
                </Button>
                <Button onClick={resetTimer} variant="secondary" className="rounded-full">
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                className="rounded-full mt-3"
                onClick={() => setShowControls(false)}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div 
              className={`relative flex justify-center items-center my-8 group ${isAuthenticated ? 'cursor-pointer' : ''}`} 
              onClick={isAuthenticated ? incrementStreak : undefined}
            >
              <div className={`w-32 h-32 rounded-full border-4 ${isAuthenticated ? 'border-background group-hover:border-primary' : 'border-background'} flex items-center justify-center transition-colors`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{streak}</div>
                  <div className="text-sm text-text-secondary">day streak</div>
                  {userData && (
                    <div className="text-xs text-text-secondary mt-1">best: {longestStreak}</div>
                  )}
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 rounded-full">
                  <Lock className="h-6 w-6 text-text-secondary" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-red-500"></div>
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                  <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                  <div className="w-1 h-1 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              {userData && (
                <div className="absolute bottom-[-25px] text-xs text-text-secondary">
                  Last updated: {formatDate(userData.lastLogDate)}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-background/50 hover:bg-primary/20"
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-background/50 hover:bg-primary/20"
                onClick={resetTimer}
              >
                <Clock className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-background/50 hover:bg-primary/20"
                onClick={() => setShowControls(true)}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
      
      {/* Hint text */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-text-secondary text-sm px-4 py-2 bg-surface/60 rounded-full">
        <span className="animate-pulse">
          {isAuthenticated 
            ? "Try clicking the streak circle or buttons!" 
            : "Sign in to track your real streak!"}
        </span>
      </div>
    </div>
  );
} 