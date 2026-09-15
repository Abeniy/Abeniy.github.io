import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import { themeBoot } from '@/lib/theme';
export const metadata: Metadata = { title: 'Abeniy · 杨静雯', description: '作品、探索与成长记录。', metadataBase: new URL('https://abeniy.github.io') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeBoot}} /></head><body><ThemeProvider><a className="skip" href="#main">跳到正文</a><Header />{children}</ThemeProvider></body></html>;
}
