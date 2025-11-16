import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { NewSessionNote } from '@/stores/sessionNotesStore';
interface SessionNoteFormProps {
  sessionId: string;
  practitionerId: string;
  seekerId: string; // In a real app, this would be part of the session object
  onSubmit: (note: NewSessionNote) => void;
}
export function SessionNoteForm({ sessionId, practitionerId, seekerId, onSubmit }: SessionNoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit({
        sessionId,
        practitionerId,
        seekerId,
        title,
        content,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="note-title">Note Title</Label>
        <Input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Post-Session Reflections"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="note-content">Content & Resources</Label>
        <Textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share key takeaways, recommended practices, or links to resources..."
          rows={6}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Share Note with Seeker
      </Button>
    </form>
  );
}