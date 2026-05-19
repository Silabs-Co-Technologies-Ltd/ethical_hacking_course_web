import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const results = useSearch(query);
  const [, setLocation] = useLocation();

  const handleSelectResult = (moduleId: string, lessonId?: string) => {
    if (lessonId) {
      setLocation(`/module/${moduleId}`);
      // Store the lesson to navigate to after page loads
      sessionStorage.setItem('selectedLessonId', lessonId);
    } else {
      setLocation(`/module/${moduleId}`);
    }
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search lessons, topics..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map((result, idx) => (
            <button
              key={`${result.moduleId}-${result.lessonId || 'module'}-${idx}`}
              onClick={() => handleSelectResult(result.moduleId, result.lessonId)}
              className="w-full text-left p-3 hover:bg-secondary/50 border-b border-border last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs text-primary font-mono mt-0.5">
                  {result.type === 'lesson' ? '📚' : '📦'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-primary truncate">
                    {result.lessonName || result.moduleName}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {result.moduleName}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {result.description}
                  </div>
                  {result.topics && result.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-1.5 py-0.5 bg-secondary/50 text-secondary-foreground rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {result.topics.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{result.topics.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-4 text-center text-sm text-muted-foreground z-50">
          No results found for "{query}"
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
