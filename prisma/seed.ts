import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed quotes
  const quotes = [
    {
      text: "Every day is a new opportunity to change your life.",
      author: "Unknown"
    },
    {
      text: "Fall down seven times, stand up eight.",
      author: "Japanese Proverb"
    },
    {
      text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
      author: "Socrates"
    },
    {
      text: "You don't have to be great to start, but you have to start to be great.",
      author: "Zig Ziglar"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would.",
      author: "Unknown"
    },
    {
      text: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu"
    },
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
    {
      text: "It's not about perfect. It's about effort. And when you bring that effort every single day, that's where transformation happens.",
      author: "Jillian Michaels"
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill"
    }
  ];

  for (const quote of quotes) {
    await prisma.quote.create({
      data: quote
    });
  }

  console.log(`Database has been seeded with ${quotes.length} quotes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 