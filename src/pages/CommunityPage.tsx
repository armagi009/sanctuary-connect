import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mic, Headphones, ArrowRight } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/mockData';
export function CommunityPage() {
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
      {/* Featured Articles Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
            <Button variant="link" className="text-primary hidden sm:inline-flex">
              View All Articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
           <div className="mt-12 text-center sm:hidden">
             <Button variant="outline">View All Articles</Button>
           </div>
        </div>
      </section>
      {/* Guided Meditations Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Headphones className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Guided Meditations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Find your center with these audio practices led by our practitioners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mock Meditation Cards */}
            <Card className="p-6">
              <CardContent className="flex flex-col items-center text-center p-0">
                <Mic className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold">Morning Gratitude</h3>
                <p className="text-sm text-muted-foreground mt-1">with Dr. Althea Sol</p>
                <p className="text-sm text-muted-foreground mt-4">10 min</p>
                <Button className="mt-4 w-full">Play</Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex flex-col items-center text-center p-0">
                <Mic className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold">Body Scan for Deep Rest</h3>
                <p className="text-sm text-muted-foreground mt-1">with Lena Petrova</p>
                <p className="text-sm text-muted-foreground mt-4">20 min</p>
                <Button className="mt-4 w-full">Play</Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex flex-col items-center text-center p-0">
                <Mic className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold">Connecting to Nature</h3>
                <p className="text-sm text-muted-foreground mt-1">with Marcus Thorne</p>
                <p className="text-sm text-muted-foreground mt-4">15 min</p>
                <Button className="mt-4 w-full">Play</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}