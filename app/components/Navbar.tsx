// src/components/Navbar.jsx
"use client"; // Add this if using App Router and hooks like useState/usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import for active link detection
import { useState } from "react"; // Import for mobile menu state
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Shield, Menu, X } from "lucide-react"; // Import Menu and X icons
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Assuming you have clsx + tailwind-merge setup as per shadcn/ui docs

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const navItems = [
    { href: "/logfap", label: "Log Relapse" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/dashboard", label: "Dashboard" },
    // Add more nav items here if needed
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <div className="bg-primary rounded-lg p-1.5 sm:p-2"> {/* Slightly smaller padding on mobile */}
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" /> {/* Use primary-foreground for text on primary bg */}
          </div>
          <span className="text-lg sm:text-xl font-bold text-primary">NutFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary" // Active link style
                  : "text-muted-foreground" // Inactive link style (common shadcn style)
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Authentication & Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="rounded-full hidden sm:inline-flex"> {/* Hide on xs screens if needed */}
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="rounded-full">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* Removed redundant Dashboard button, UserButton is enough */}
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                avatarBox: "h-8 w-8" // Consistent size with buttons
              }
            }}/>
          </SignedIn>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu" // Accessibility improvement
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-40 bg-background border-b md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground" // Active mobile style
                    : "text-muted-foreground" // Inactive mobile style
                )}
                onClick={closeMobileMenu} // Close menu on navigation
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Auth Buttons - Optional: You might rely on UserButton only when signed in */}
            <div className="pt-4 border-t mt-2">
               <SignedOut>
                 <div className="flex flex-col space-y-2">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full" onClick={closeMobileMenu}>
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full" onClick={closeMobileMenu}>
                        Sign Up
                      </Button>
                    </SignUpButton>
                 </div>
               </SignedOut>
               {/* You might not need anything here for SignedIn if UserButton is sufficient */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}