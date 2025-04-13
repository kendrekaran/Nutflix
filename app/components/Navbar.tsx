// src/components/Navbar.jsx
"use client"; // Add this if using App Router and hooks like useState/usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import for active link detection
import { useState } from "react"; // Import for mobile menu state
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Shield, Menu, X } from "lucide-react"; // Import Menu and X icons
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Assuming you have clsx + tailwind-merge setup as per shadcn/ui docs
import SmoothLink from "./SmoothLink";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";

  const navItems = [
    { 
      href: isHomePage ? "#hero" : "/", 
      label: "Home",
      isAnchor: isHomePage
    },

    { 
        href: "/logfap", 
        label: "Log Relapse",
        isAnchor: false
    },

    { 
      href: isHomePage ? "/leaderboard" : "/leaderboard", 
      label: "Leaderboard",
      isAnchor: isHomePage
    },
    { 
      href: "/dashboard", 
      label: "Dashboard",
      isAnchor: false
    },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Render Link or SmoothLink based on if it's an anchor
  const NavLink = ({ item, isMobile = false }: { item: { href: string; label: string; isAnchor: boolean }, isMobile?: boolean }) => {
    const baseStyles = isMobile 
      ? "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      : "text-sm font-medium transition-colors hover:text-primary";
    
    const activeStyles = isMobile
      ? "bg-accent text-accent-foreground" // Active mobile style
      : "text-primary"; // Active desktop style
    
    const inactiveStyles = isMobile
      ? "text-muted-foreground" // Inactive mobile style
      : "text-muted-foreground"; // Inactive desktop style
    
    if (item.isAnchor) {
      return (
        <SmoothLink
          href={item.href}
          className={cn(
            baseStyles,
            pathname === item.href ? activeStyles : inactiveStyles
          )}
          onClick={closeMobileMenu}
          duration={1.2}
          offset={-100} // Offset to account for sticky header
        >
          {item.label}
        </SmoothLink>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          baseStyles,
          pathname === item.href ? activeStyles : inactiveStyles
        )}
        onClick={closeMobileMenu}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <div className="bg-primary rounded-lg p-1.5 sm:p-2"> {/* Slightly smaller padding on mobile */}
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" /> {/* Use primary-foreground for text on primary bg */}
          </div>
          <span className="text-lg sm:text-xl font-sora font-bold text-primary">NutFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-inter">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} isMobile={false} />
          ))}
        </nav>

        {/* Authentication & Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4 font-poppins">
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
          <nav className="flex flex-col space-y-2 px-4 py-4 font-inter">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} isMobile={true} />
            ))}
            {/* Mobile Auth Buttons - Optional: You might rely on UserButton only when signed in */}
            <div className="pt-4 border-t mt-2 font-poppins">
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