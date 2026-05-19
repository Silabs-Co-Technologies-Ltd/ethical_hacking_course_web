import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextExtendedType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContextExtended = createContext<ThemeContextExtendedType | undefined>(undefined);

export function ThemeProviderExtended({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme('dark');
    }
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContextExtended.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContextExtended.Provider>
  );
}

export function useThemeExtended() {
  const context = useContext(ThemeContextExtended);
  if (!context) {
    throw new Error('useThemeExtended must be used within ThemeProviderExtended');
  }
  return context;
}
