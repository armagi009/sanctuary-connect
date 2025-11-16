import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { Article } from '@shared/types';
interface ArticleCardProps {
  article: Article;
}
export function ArticleCard({ article }: ArticleCardProps) {
  const authorInitials = article.authorName.split(' ').map(n => n[0]).join('');
  return (
    <Link to={`/community/${article.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border-transparent hover:border-primary">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <Badge variant="outline" className="mb-2 text-primary border-primary">{article.category}</Badge>
            <h3 className="text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm line-clamp-3">
              {article.excerpt}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={article.authorImageUrl} alt={article.authorName} />
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{article.authorName}</p>
                <p className="text-xs text-muted-foreground">{format(parseISO(article.publishedDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Read More</span>
                <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}