import { useState } from 'react';
import { useCommunityStore } from '@/stores/communityStore';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArticleEditorForm } from './ArticleEditorForm';
import { format, parseISO } from 'date-fns';
import type { Article } from '@shared/types';
import { toast } from 'sonner';
export function PractitionerContent() {
  const articles = useCommunityStore((state) => state.articles);
  const deleteArticle = useCommunityStore((state) => state.deleteArticle);
  const user = useAuthStore((state) => state.user);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<Article | undefined>(undefined);
  const practitionerArticles = articles.filter(article => article.authorName === user?.name);
  const handleEdit = (article: Article) => {
    setArticleToEdit(article);
    setIsEditorOpen(true);
  };
  const handleNew = () => {
    setArticleToEdit(undefined);
    setIsEditorOpen(true);
  };
  const handleDelete = (articleId: string) => {
    deleteArticle(articleId);
    toast.success('Article deleted successfully.');
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Content</CardTitle>
            <CardDescription>Manage your articles for the Community Hub.</CardDescription>
          </div>
          <Button onClick={handleNew}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Article
          </Button>
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
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your article.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>You haven't published any articles yet.</p>
              <Button variant="link" className="mt-2" onClick={handleNew}>
                Write your first article
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{articleToEdit ? 'Edit Article' : 'Create New Article'}</DialogTitle>
          </DialogHeader>
          <ArticleEditorForm
            articleToEdit={articleToEdit}
            onSave={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}