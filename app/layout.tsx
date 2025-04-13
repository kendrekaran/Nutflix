import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter, Poppins, Sora } from 'next/font/google'
import './globals.css'
import LenisProvider from './components/LenisProvider'
import ScrollToTopButton from './components/ScrollToTopButton'
import ScrollAnimationInitializer from './components/ScrollAnimationInitializer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // optional: enables Tailwind integration
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NutFlix - Break Free, Rebuild, Thrive',
  description: 'Track your journey to overcome addiction, build healthier habits, and regain control of your life.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${poppins.variable} ${sora.variable}`}>
        <body className={`font-sans ${inter.variable} ${poppins.variable} ${sora.variable}`}>
          <LenisProvider>
            <ScrollAnimationInitializer>
              {children}
            </ScrollAnimationInitializer>
            <ScrollToTopButton />
          </LenisProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}