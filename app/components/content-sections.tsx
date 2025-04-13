"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  Award,
  BarChart2,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  Heart,
  LineChart,
  List,
  MessageCircle,
  Target,
  Zap,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
}

const fadeLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
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

export default function ContentSections() {
  return (
    <>
      {/* Why Track Section with improved styling */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background z-0"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-danger text-transparent bg-clip-text">
              Why Track Your Habits?
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto text-lg">
              Tracking your habits isn't just about counting days. It's about building a healthier, more mindful
              relationship with your impulses. Understand yourself, identify patterns, and make positive changes.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeRight}
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">The Power of Consistency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">
                    The Fap Tracker helps you visualize your journey. Consistency is key to achieving your goals, and
                    celebrating even the smallest victories can build unstoppable momentum. Track your progress and
                    watch yourself grow stronger each day.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeLeft}
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Log Your Streaks:</span> Track each successful day with our
                        intuitive calendar.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Set Personal Goals:</span> Challenge yourself daily, weekly, or
                        monthly with customizable targets.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Track Triggers:</span> Record when and why you face urges to
                        better understand your patterns.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Get Insights:</span> Receive tailored tips and resources based on
                        your personal journey!
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth & Community Section */}
      <section className="py-24 bg-muted/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeRight}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Achieving Personal Growth</h3>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  This journey is about taking control of your mind and body. Track your progress, understand your
                  motivations, and celebrate how far you've come.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg shadow-sm">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Track Time</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg shadow-sm">
                    <BarChart2 className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">View Progress</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg shadow-sm">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Set Goals</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg shadow-sm">
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Stay Motivated</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeLeft}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-6">A Supportive Community</h3>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  You're never alone! Share your journey, connect with others, and lift each other up in a welcoming,
                  non-judgmental community focused on self-improvement.
                </p>
                <div className="bg-background/50 rounded-lg p-6 shadow-sm border border-border/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">JD</span>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 flex-1">
                      <p className="text-sm">
                        "This app has completely changed how I view my habits. The community support is incredible!"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">SK</span>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 flex-1">
                      <p className="text-sm">
                        "I've tried many trackers, but this one actually helps me understand my triggers and make real
                        progress."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Powerful Features</h3>
            <p className="text-text-secondary max-w-3xl mx-auto text-lg">
              Everything you need to track, understand, and improve your habits in one place.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <List className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Simple Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Easy-to-use dashboard that makes tracking your habits effortless and intuitive.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Multiple Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Daily, weekly, and monthly views to track your progress at different time scales.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Motivational Quotes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Personalized motivational quotes to keep you inspired on your journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Compass className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Trigger Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Identify and track what triggers your urges to better understand your patterns.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Goal Setting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Set and track personal goals with customizable targets and achievements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="border border-border/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Detailed Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Visualize your progress with detailed charts and insights about your habits.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-24 bg-muted/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Frequently Asked Questions</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Get answers to the most common questions about tracking your habits and using our platform.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="bg-background/50 rounded-xl p-6 shadow-md"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border/30">
                <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                  How do I know if I'm making progress?
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-4">
                  It's not just about streaks! Improvement shows through consistency, mindset, and understanding your
                  habits. Our platform provides detailed analytics and insights to help you see your progress over
                  time, even when it feels like you're not moving forward. Small improvements add up to significant
                  changes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border/30">
                <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                  Can I reset my progress?
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-4">
                  Absolutely. Reset anytime you feel ready for a fresh start. We understand that everyone's journey
                  has ups and downs. You can reset your streak counter while still keeping your historical data for
                  insights, or you can start completely fresh. Remember, resetting isn't failing - it's part of the
                  process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                  How can I stay motivated?
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-4">
                  Stay connected to your goals, track your triggers, and celebrate every small win. You're stronger
                  than you think! Our platform provides daily motivational quotes, community support, and achievement
                  badges to keep you engaged. Setting smaller, achievable goals can also help maintain motivation as
                  you work toward larger objectives.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-t border-border/30">
                <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                  Is my data private and secure?
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-4">
                  Yes, absolutely. We take your privacy very seriously. All your personal data and tracking
                  information is encrypted and securely stored. We never share your information with third parties,
                  and you have complete control over what you share with the community. Your journey is yours alone.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  )
}
