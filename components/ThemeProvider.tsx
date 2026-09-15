'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { resolveTheme, type Theme, type ThemeMode } from '@/lib/theme';
const Context = createContext<{theme: Theme; mode: ThemeMode; setMode: (mode: ThemeMode) => void}>({theme:'night',mode:'auto',setMode:()=>{}});
export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [mode, updateMode] = useState<ThemeMode>('auto');
  const [theme, updateTheme] = useState<Theme>('night');
  useEffect(() => {
    const value = document.documentElement.dataset.mode;
    updateMode(value === 'day' || value === 'night' ? value : 'auto');
    updateTheme(document.documentElement.dataset.theme === 'day' ? 'day' : 'night');
  }, []);
  const setMode = useCallback((next: ThemeMode) => {
    updateMode(next); updateTheme(resolveTheme(next));
    document.documentElement.dataset.mode = next;
    document.documentElement.dataset.theme = resolveTheme(next);
    try { localStorage.setItem('abeniy-theme', next); } catch { /* Keep this visit's preference in memory. */ }
  }, []);
  useEffect(() => {
    const refresh = () => { if (mode === 'auto') { const next = resolveTheme(mode); updateTheme(next); document.documentElement.dataset.theme = next; } };
    const timer = window.setInterval(refresh, 15000);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', refresh); };
  }, [mode]);
  return <Context.Provider value={{theme,mode,setMode}}>{children}</Context.Provider>;
}
export const useTheme = () => useContext(Context);
