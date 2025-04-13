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
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col h-full transform transition duration-500 hover:scale-[1.02]">
      <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
        <Quote className="w-6 h-6 text-accent/60" />
        Daily Motivation
      </h3>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <Quote className="w-12 h-12 text-accent/10 absolute -top-6 -left-6 rotate-180" />
          <blockquote className="text-xl md:text-2xl font-medium italic  text-zinc-100 relative z-10 leading-relaxed">
            “{quote.text}”
            {quote.author && (
              <footer className="mt-4 text-sm text-zinc-400 not-italic text-right">
                — {quote.author}
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
