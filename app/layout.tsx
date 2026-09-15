import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Abeniy · 杨静雯', description: '作品、探索与成长记录。', metadataBase: new URL('https://abeniy.github.io') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><a className="skip" href="#main">跳到正文</a>{children}</body></html>;
}
