import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { useCommunityStore } from '@/stores/communityStore';
import { AudioPlayerCard } from '@/components/AudioPlayerCard';
const mockMeditations = [
  { title: 'Morning Gratitude', author: 'Dr. Althea Sol', duration: 600 }, // 10 min
  { title: 'Body Scan for Deep Rest', author: 'Lena Petrova', duration: 1200 }, // 20 min
  { title: 'Connecting to Nature', author: 'Marcus Thorne', duration: 900 }, // 15 min
];
export function CommunityPage() {
  const articles = useCommunityStore((state) => state.articles);
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Community Hub</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A curated collection of wisdom, practices, and insights from our trusted practitioners.
            </p>
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search articles and meditations..." className="pl-12 h-12 text-base" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Guided Meditations Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Guided Meditations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Find your center with these audio practices led by our practitioners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMeditations.map((meditation, index) => (
              <AudioPlayerCard key={index} meditation={meditation} />
            ))}
          </div>
        </div>
      </section>
      {/* Featured Articles Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
            <Button variant="link" className="text-primary hidden sm:inline-flex">
              View All Articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
           <div className="mt-12 text-center sm:hidden">
             <Button variant="outline">View All Articles</Button>
           </div>
        </div>
      </section>
    </div>
  );
}