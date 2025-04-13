import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { calculateStreak, getOrCreateUser } from '../../lib/serverUtils';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { note, date } = body;
    const dateObj = new Date(date);
    
    // Get user from database
    const user = await getOrCreateUser(userId);
    
    // Create new log
    const log = await prisma.log.create({
      data: {
        note,
        date: dateObj,
        time: dateObj, // Use the same dateObj for time
        userId: user.id
      }
    });
    
    // Calculate and update streak
    const { currentStreak, longestStreak } = await calculateStreak(userId, dateObj);
    
    return NextResponse.json({ 
      success: true,
      log,
      currentStreak,
      longestStreak
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating log:', error);
    return NextResponse.json({ error: 'Failed to create log', details: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user from database
    const user = await getOrCreateUser(userId);
    
    // Get all logs for the user
    const logs = await prisma.log.findMany({
      where: { userId: user.id },
      orderBy: [
        { date: 'desc' },
        { time: 'desc' }
      ]
    });
    
    return NextResponse.json({ logs }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs', details: error.message }, { status: 500 });
  }
} 