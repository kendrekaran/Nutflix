import { Quote } from "lucide-react";

interface QuoteType {
  text: string;
  author?: string;
}

interface MotivationalQuoteProps {
  quote: QuoteType;
}

export default function MotivationalQuote({ quote }: MotivationalQuoteProps) {
  return (
    <div className="bg-surface rounded-lg shadow-sm p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold text-primary mb-4">Daily Motivation</h3>
      
      <div className="flex-1 flex items-center">
        <div className="relative">
          <Quote className="w-10 h-10 text-accent/20 absolute -top-6 -left-4" />
          <blockquote className="text-lg italic text-text-primary relative z-10">
            {quote.text}
            
            {quote.author && (
              <footer className="mt-2 text-sm text-text-secondary not-italic">
                — {quote.author}
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </div>
  );
} 