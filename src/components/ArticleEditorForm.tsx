import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCommunityStore, NewArticle } from '@/stores/communityStore';
import { toast } from 'sonner';
interface ArticleEditorFormProps {
  onSave: () => void;
}
export function ArticleEditorForm({ onSave }: ArticleEditorFormProps) {
  const addArticle = useCommunityStore((state) => state.addArticle);
  const [article, setArticle] = useState<NewArticle>({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop', // Placeholder image
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addArticle(article);
    toast.success('Article published!', {
      description: 'Your new article is now available in the Community Hub.',
    });
    onSave();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input id="title" name="title" value={article.title} onChange={handleInputChange} placeholder="e.g., The Art of Mindful Living" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" value={article.category} onChange={handleInputChange} placeholder="e.g., Mindfulness" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" value={article.excerpt} onChange={handleInputChange} placeholder="A short summary to grab the reader's attention." required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Full Content</Label>
        <Textarea id="content" name="content" value={article.content} onChange={handleInputChange} rows={8} placeholder="Write your full article here. You can use Markdown." required />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Publish Article</Button>
      </div>
    </form>
  );
}