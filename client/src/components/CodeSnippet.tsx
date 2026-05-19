import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeSnippet({ code, language = 'bash', title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-secondary/50 border border-border rounded-lg overflow-hidden">
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 rounded">
                {language}
              </span>
            )}
            {title && <span className="text-sm text-muted-foreground">{title}</span>}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}
