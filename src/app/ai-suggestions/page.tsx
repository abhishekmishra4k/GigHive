import { AiSuggestionForm } from '@/components/ai-suggestion-form';
import { Bot } from 'lucide-react';

export default function AiSuggestionsPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
        <div className="mb-8 space-y-4 text-center">
          <div className="inline-block rounded-full bg-primary/20 p-3">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            AI Gig Suggestion Engine
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Let our smart assistant do the heavy lifting. Tell us about your skills and interests, and we&apos;ll generate a list of personalized gig ideas just for you.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-lg sm:p-8">
            <AiSuggestionForm />
        </div>
      </div>
    </div>
  );
}
