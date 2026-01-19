'use client';

import React, { useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border my-6 shadow-sm", className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {filename ? (
              <>
                <Terminal className="w-4 h-4" />
                <span className="font-medium text-foreground">{filename}</span>
              </>
            ) : (
                <span className="font-medium text-foreground">{language}</span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors p-1 rounded-md hover:bg-background/50"
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      
      <Highlight
        theme={theme === 'dark' ? themes.github : themes.github} 
        code={code.trim()}
        language={language as Language}
      >
        {({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" 
            style={{ 
               ...style, 
               backgroundColor: 'var(--sh-bg)',
               color: 'var(--sh-text)'
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                   <span key={key} {...getTokenProps({ token })} style={{
                     color: token.types.includes('comment') ? 'var(--sh-token-comment)' :
                            token.types.includes('string') ? 'var(--sh-token-string)' :
                            token.types.includes('punctuation') ? 'var(--sh-token-punctuation)' :
                            token.types.includes('keyword') || token.types.includes('operator') ? 'var(--sh-token-keyword)' :
                            token.types.includes('function') ? 'var(--sh-token-function)' :
                            undefined
                   }} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
