# Fap Tracker

A full-stack application to help users track their journey to break free from addiction. Track streaks, log relapses, and stay motivated.

## Features

- **User Authentication**: Secure authentication using Clerk
- **Streak Tracking**: Monitor current and longest streaks
- **Relapse Logging**: Record relapses with optional notes
- **History Timeline**: View past logs in chronological order
- **Motivational Quotes**: Get daily motivation to stay on track

## Tech Stack

- **Frontend**: Next.js with App Router, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (Atlas or local)
- Clerk account for authentication

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/fap-tracker.git
cd fap-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following:
```
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/fap-tracker?retryWrites=true&w=majority"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
CLERK_SECRET_KEY=sk_test_your-secret-key

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

4. Generate Prisma client
```bash
npx prisma generate
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Clerk Authentication

1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Get your API keys from the Clerk dashboard
4. Add the keys to your `.env` file

### MongoDB Database

1. Create a MongoDB database (Atlas or local)
2. Get your connection string
3. Add the connection string to your `.env` file
4. Run migrations: `npx prisma db push`

## Deployment

The easiest way to deploy this application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

## License

[MIT](LICENSE)
