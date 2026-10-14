'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './Header.module.css';
const links = [['/','首页'],['/works/','作品'],['/experience/','经历'],['/about/','关于我']];
export default function Header() {
  const path = usePathname(); const preview=path.startsWith('/camp-preview'); const content=path!=='/'&&!preview; const {theme,mode,setMode} = useTheme();
  const [menu,setMenu] = useState(false); const [settings,setSettings] = useState(false);
  const header = useRef<HTMLElement>(null); const menuButton = useRef<HTMLButtonElement>(null); const settingsButton = useRef<HTMLButtonElement>(null);
  useEffect(()=>{setMenu(false);setSettings(false);},[path]);
  useEffect(()=>{const dismiss=(event:PointerEvent)=>{if(!header.current?.contains(event.target as Node)){setMenu(false);setSettings(false);}};document.addEventListener('pointerdown',dismiss);return()=>document.removeEventListener('pointerdown',dismiss);},[]);
  return <header ref={header} className={`${styles.header} ${preview?styles.preview:''} ${content?styles.content:''} ${path==='/'?styles.home:''}`} onKeyDown={e=>{if(e.key==='Escape'){if(settings){setSettings(false);settingsButton.current?.focus();}else{setMenu(false);menuButton.current?.focus();}}}}>
    <Link href="/" className={styles.brand} aria-label="ABENIY 首页">ABENIY<span className={styles.dot}>.</span></Link>
    <nav id="site-nav" aria-label="主导航" className={`${styles.nav} ${menu?styles.open:''}`}>
      {links.map(([href,label])=><Link key={href} href={href} aria-current={(href==='/'?path==='/':path.startsWith(href.slice(0,-1)))?'page':undefined}>{label}</Link>)}
    </nav>
    <div className={styles.controls}>
      {!preview&&<><button className={styles.iconButton} aria-label={theme==='day'?'切换到夜晚':'切换到白天'} onClick={()=>setMode(theme==='day'?'night':'day')}><span className={styles.sun} aria-hidden="true">☼</span><span className={styles.moon} aria-hidden="true">☾</span></button>
      <button ref={settingsButton} className={styles.settingsButton} aria-label="主题设置" aria-expanded={settings} aria-controls="theme-settings" onClick={()=>{setSettings(!settings);setMenu(false);}}>⌄</button></>}
      <button ref={menuButton} className={`${styles.iconButton} ${styles.menuButton}`} aria-label={menu?'关闭导航':'打开导航'} aria-expanded={menu} aria-controls="site-nav" onClick={()=>{setMenu(!menu);setSettings(false);}}>{menu?'×':'☰'}</button>
    </div>
    {settings&&<div id="theme-settings" className={styles.settings} role="group" aria-label="主题设置">{([['auto','跟随当地时间'],['day','白天'],['night','夜晚']] as const).map(([value,label])=><button key={value} aria-pressed={mode===value} onClick={()=>{setMode(value);setSettings(false);settingsButton.current?.focus();}}>{label}<span aria-hidden="true">{mode===value?'✓':''}</span></button>)}</div>}
  </header>;
}
