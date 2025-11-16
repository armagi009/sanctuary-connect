import { useState } from 'react';
import { useCommunityStore } from '@/stores/communityStore';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArticleEditorForm } from './ArticleEditorForm';
import { format, parseISO } from 'date-fns';
export function PractitionerContent() {
  const allArticles = useCommunityStore((state) => state.articles);
  const user = useAuthStore((state) => state.user);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  // In a real app, articles would be fetched based on the practitioner's ID.
  // Here, we filter by the logged-in user's name for demo purposes.
  const practitionerArticles = allArticles.filter(article => article.authorName === user?.name);
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Content</CardTitle>
            <CardDescription>Manage your articles for the Community Hub.</CardDescription>
          </div>
          <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Article</DialogTitle>
              </DialogHeader>
              <ArticleEditorForm onSave={() => setIsEditorOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {practitionerArticles.length > 0 ? (
            <div className="space-y-4">
              {practitionerArticles.map(article => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                  <div>
                    <h4 className="font-semibold">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Published on {format(parseISO(article.publishedDate), 'PPP')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" disabled>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" disabled>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>You haven't published any articles yet.</p>
              <Button variant="link" className="mt-2" onClick={() => setIsEditorOpen(true)}>
                Write your first article
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}