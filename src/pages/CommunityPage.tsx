import { Sparkles } from 'lucide-react';
export function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-24 md:py-32 lg:py-40 text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-6">
            <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Community Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Coming Soon! This will be a space for articles, guided meditations, and live group events.
        </p>
      </div>
    </div>
  );
}