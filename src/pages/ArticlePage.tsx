import { useParams, Link } from 'react-router-dom';
import { useCommunityStore } from '@/stores/communityStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
export function ArticlePage() {
  const { articleId } = useParams();
  const articles = useCommunityStore((state) => state.articles);
  const article = articles.find(a => a.id === articleId);
  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p className="text-muted-foreground mt-2">The article you are looking for does not exist.</p>
          <Button asChild className="mt-4">
            <Link to="/community">Back to Community Hub</Link>
          </Button>
        </div>
      </div>
    );
  }
  const authorInitials = article.authorName.split(' ').map(n => n[0]).join('');
  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link to="/community">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community Hub
            </Link>
          </Button>
        </div>
        <article>
          <header className="space-y-4 mb-8">
            <Badge variant="outline" className="text-primary border-primary">{article.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
              {article.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={article.authorImageUrl} alt={article.authorName} />
                  <AvatarFallback>{authorInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{article.authorName}</p>
                  <p className="text-sm text-muted-foreground">
                    Published on {format(parseISO(article.publishedDate), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </header>
          <div className="aspect-video rounded-lg overflow-hidden mb-8 border">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 prose-p:leading-relaxed prose-headings:text-foreground">
            <p>{article.content}</p>
            {/* Adding some placeholder content for longer articles */}
            {article.id === '1' && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>}
            {article.id === '2' && <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p>}
          </div>
        </article>
      </div>
    </div>
  );
}