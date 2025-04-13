import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

// Motivational quotes for recovery
const MOTIVATIONAL_QUOTES = [
  {
    text: "Every time you resist the urge, somewhere a sock breathes a sigh of relief.",
    author: "Wise Sock"
  },
  {
    text: "Your hand deserves a break — it's not a full-time job.",
    author: "Lefty the Philosopher"
  },
  {
    text: "Rome wasn't built in a day, but your willpower can be — one 'not today' at a time.",
    author: "Emperor NoFapicus"
  },
  {
    text: "Remember: it's not about quitting forever, just winning today's battle.",
    author: "Captain NoNuts"
  },
  {
    text: "Your browser history doesn't need to be a horror story.",
    author: "Incognito Mode Survivor"
  },
  {
    text: "Keep calm and zip it up.",
    author: "British Monk"
  },
  {
    text: "One day you'll laugh about this. Just not while doing it.",
    author: "Future You"
  },
  {
    text: "You're stronger than your urges. And definitely stronger than your internet connection.",
    author: "WiFi Monk"
  },
  {
    text: "Don't let five seconds of pleasure ruin your god-level streak.",
    author: "Sensei Semen"
  },
  {
    text: "Avoid the hand-to-gland combat. Channel the energy elsewhere!",
    author: "Master of Restraint"
  }
];


export async function getOrCreateUser(clerkId: string) {
  try {
    // Get user data from Clerk using the newer API
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      throw new Error("No authenticated user found");
    }
    
    // Check if user exists in our DB
    let user = await prisma.user.findUnique({
      where: { clerkId }
    });
    
    // If user doesn't exist, create a new one
    if (!user) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      
      if (!email) {
        throw new Error("User email not found");
      }
      
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : 'Anonymous',
          currentStreak: 0,
          longestStreak: 0,
          lastLogDate: new Date(),
        }
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error getting or creating user:', error);
    throw error;
  }
}

export async function getServerSideConfig(userId: string) {
  try {
    // Get the clerk user
    const user = await getOrCreateUser(userId);
    
    // Get user logs ordered by date (most recent first)
    const logs = await prisma.log.findMany({
      where: { userId: user.id },
      orderBy: [
        { date: 'desc' },
        { time: 'desc' }
      ]
    });
    
    // Get a random motivational quote
    const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    
    return { user, logs, quote };
  } catch (error) {
    console.error('Error getting server side config:', error);
    throw error;
  }
}

export async function calculateStreak(userId: string, newLogDate: Date) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // Format dates to compare days only (not time)
    const lastLogDay = new Date(user.lastLogDate).setHours(0, 0, 0, 0);
    const newLogDay = new Date(newLogDate).setHours(0, 0, 0, 0);
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    // Calculate if this is a consecutive day
    let currentStreak = user.currentStreak;
    
    // If this is the first log or the streak was previously 0
    if (currentStreak === 0) {
      currentStreak = 1; // Start with 1 for the current log
    }
    // If the new log is from the same day, streak stays the same
    else if (lastLogDay === newLogDay) {
      // No change to streak for same day
    } 
    // If the new log is exactly one day after the last log, increment streak
    else if (newLogDay - lastLogDay === oneDayInMs) {
      currentStreak += 1;
    } 
    // If new log is from a future day but not consecutive, reset streak
    else if (newLogDay > lastLogDay) {
      currentStreak = 1; // Start with 1 for the current log
    }
    // If new log is from a past day, don't update streak
    else {
      // Keep current streak unchanged for past entries
    }
    
    // Update longest streak if current is higher
    const longestStreak = Math.max(user.longestStreak, currentStreak);
    
    // Update user streak data
    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak,
        longestStreak,
        lastLogDate: newLogDate,
      }
    });
    
    return { currentStreak, longestStreak };
  } catch (error) {
    console.error('Error calculating streak:', error);
    throw error;
  }
}

export async function getLeaderboardData() {
  try {
    const now = new Date();
    
    // Get the start of today
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    
    // Get the start of the week (considering Sunday as first day)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go to the start of the week
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Get the start of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    // Get all logs within this month
    const logsThisMonth = await prisma.log.findMany({
      where: {
        date: {
          gte: startOfMonth
        }
      },
      include: {
        user: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });
    
    // Group the logs by user and day, week, month
    const dailyLogsByUser = new Map();
    const weeklyLogsByUser = new Map();
    const monthlyLogsByUser = new Map();
    
    logsThisMonth.forEach(log => {
      // Skip logs with no user data
      if (!log.user) return;
      
      const userId = log.user.id;
      const userName = log.user.name || 'Anonymous';
      const logDate = new Date(log.date);
      
      // Process daily logs
      if (logDate >= startOfToday) {
        if (!dailyLogsByUser.has(userId)) {
          dailyLogsByUser.set(userId, { userId, userName, count: 0 });
        }
        dailyLogsByUser.get(userId).count += 1;
      }
      
      // Process weekly logs
      if (logDate >= startOfWeek) {
        if (!weeklyLogsByUser.has(userId)) {
          weeklyLogsByUser.set(userId, { userId, userName, count: 0 });
        }
        weeklyLogsByUser.get(userId).count += 1;
      }
      
      // Process monthly logs
      if (!monthlyLogsByUser.has(userId)) {
        monthlyLogsByUser.set(userId, { userId, userName, count: 0 });
      }
      monthlyLogsByUser.get(userId).count += 1;
    });
    
    // Convert maps to arrays and sort by count (descending)
    const dailyLeaderboard = Array.from(dailyLogsByUser.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
      
    const weeklyLeaderboard = Array.from(weeklyLogsByUser.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
      
    const monthlyLeaderboard = Array.from(monthlyLogsByUser.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
    
    return {
      daily: dailyLeaderboard,
      weekly: weeklyLeaderboard,
      monthly: monthlyLeaderboard
    };
  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    // Return empty arrays instead of throwing an error
    return {
      daily: [],
      weekly: [],
      monthly: []
    };
  }
} 