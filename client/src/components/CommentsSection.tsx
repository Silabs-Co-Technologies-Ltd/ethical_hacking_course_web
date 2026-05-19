import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, Trash2 } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  lessonId: string;
}

export function CommentsSection({ lessonId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const STORAGE_KEY = `comments_${lessonId}`;

  // Load comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    }
  }, [lessonId]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments, STORAGE_KEY]);

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      text: newComment,
      timestamp: Date.now(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setAuthorName('');
    setShowForm(false);
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 border-t border-border pt-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="text-2xl font-bold">Discussion ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          className="w-full gap-2"
        >
          <MessageCircle className="w-4 h-4" /> Add a Comment
        </Button>
      ) : (
        <Card className="bg-card border-border p-4 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 bg-secondary/50 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Share your thoughts, questions, or insights..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 bg-secondary/50 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-24 resize-none"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim() || !authorName.trim()}
              className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Post Comment
            </Button>
            <Button
              onClick={() => {
                setShowForm(false);
                setNewComment('');
                setAuthorName('');
              }}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-card border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-primary">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{comment.text}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
