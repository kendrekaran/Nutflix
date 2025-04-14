"use client"

import React from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight, Shield, Activity, LogIn, Send } from "lucide-react"
import { motion } from "framer-motion"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function HeroSection() {
  return (
    <div className="mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pb-4 flex justify-center"
      >
        <Link href="dashboard">
          <Button className="rounded-full px-5 py-1 text-xs bg-destructive/30 hover:bg-destructive/40 text-text-primary shadow-lg transition duration-300">
            View Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>

      <section id="hero" className="relative px-4 pb-32 text-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto z-10 relative"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl poppins-medium leading-tight mb-6"
          >
            <span className="block text-text-primary">Stay Strong, Stay Consistent</span>
            <span className="bg-gradient-to-r from-primary to-danger text-transparent bg-clip-text">
              Track Your Fapping Progress & Reach Your Pleasure Goals!
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-xs md:text-sm poppins-light text-text-secondary md:px-24 font-inter mb-10 max-w-2xl mx-auto"
          >
            Whether it's once a day or ten, NutFlix helps you stay consistent, avoid injury, and fap with pride. Yes,
            this is real. No, we're not judging.
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 font-poppins"
          >
            <SignedIn>
              <Link href="/logfap">
                <Button className="rounded-full w-48 h-12 sm:w-52 px-7 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                  <Send className="h-5 w-5 shrink-0" />
                  Log Relapse
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="rounded-full w-48 h-12 sm:w-52 px-7 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:bg-muted/20 shadow-sm transition-all"
                >
                  <Activity className="h-5 w-5 shrink-0" />
                  Dashboard
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="rounded-full w-48 h-12 sm:w-52 px-7 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                  <Shield className="h-5 w-5 shrink-0" />
                  Start Journey
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="rounded-full w-48 h-12 sm:w-52 px-7 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:bg-muted/20 shadow-sm transition-all"
                >
                  <LogIn className="h-5 w-5 shrink-0" />
                  Continue
                </Button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </motion.div>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-96 h-96 bg-danger/10 rounded-full blur-3xl z-0" />
      </section>
    </div>
  )
}
