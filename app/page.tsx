import Navbar from "./components/Navbar"
import HeroSection from "./components/hero-section"
import ContentSections from "./components/content-sections"

export default function Home() {
  return (
    <main className="min-h-screen text-text-primary bg-gradient-to-b from-background to-surface">
      <Navbar />
      <HeroSection />
      <ContentSections />
    </main>
  )
}
