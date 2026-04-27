import { ReactNode } from 'react';

interface ProseContentProps {
  children: ReactNode;
}

export function ProseContent({ children }: ProseContentProps) {
  return (
    <div className="prose prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-primary
      prose-h1:text-3xl prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-primary prose-a:underline hover:prose-a:text-accent
      prose-strong:text-primary prose-strong:font-bold
      prose-code:bg-secondary/50 prose-code:text-accent prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
      prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border prose-pre:rounded prose-pre:p-4 prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
      prose-li:mb-2
      prose-table:border-collapse prose-table:w-full prose-table:mb-4
      prose-th:bg-secondary/50 prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-border
      prose-td:p-3 prose-td:border prose-td:border-border
    ">
      {children}
    </div>
  );
}
