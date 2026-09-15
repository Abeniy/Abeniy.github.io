'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useTheme} from './ThemeProvider';
import styles from './Camp.module.css';
import type {createCamp} from '@/lib/camp-scene';
export default function Camp(){
 const {theme}=useTheme();const canvas=useRef<HTMLCanvasElement>(null);const fireLink=useRef<HTMLAnchorElement>(null);const personLink=useRef<HTMLAnchorElement>(null);const engine=useRef<ReturnType<typeof createCamp>|null>(null);const [ready,setReady]=useState(false);const [paused,setPaused]=useState(false);const [staticMode,setStaticMode]=useState(false);
 useEffect(()=>{let cancelled=false;let cleanup:()=>void=()=>{};const media=matchMedia('(prefers-reduced-motion: reduce)');
   const fallback=()=>{if(cancelled)return;setStaticMode(true);setReady(false);const previous=engine.current;engine.current=null;previous?.dispose();};
   const boot=async()=>{if(media.matches){fallback();return;}try{const {createCamp}=await import('@/lib/camp-scene');if(cancelled||!canvas.current||engine.current)return;engine.current=createCamp(canvas.current,()=>{if(!cancelled)setReady(true);},()=>queueMicrotask(fallback),points=>{[fireLink,personLink].forEach((ref,i)=>{if(ref.current){ref.current.style.left=points[i].x+'%';ref.current.style.top=points[i].y+'%';}});});engine.current.setTheme(document.documentElement.dataset.theme==='day'?'day':'night',true);}catch{fallback();}};
   const change=()=>{if(media.matches)fallback();else{setStaticMode(false);void boot();}};media.addEventListener('change',change);const lost=(e:Event)=>{e.preventDefault();fallback();};canvas.current?.addEventListener('webglcontextlost',lost);const current=canvas.current;cleanup=()=>{media.removeEventListener('change',change);current?.removeEventListener('webglcontextlost',lost);};void boot();return()=>{cancelled=true;cleanup();engine.current?.dispose();engine.current=null;};
 },[]);
 useEffect(()=>{engine.current?.setTheme(theme);},[theme]);useEffect(()=>{engine.current?.setPaused(paused);},[paused,ready]);
 return <main id="main" className={styles.camp}>
  <h1 className="sr-only">Abeniy · 杨静雯的作品与探索记录</h1><p className="sr-only">空旷的营地中，一个人坐在篝火旁烤棉花糖。可通过导航浏览作品、经历和游戏档案。</p>
  <div className={styles.backdrop} aria-hidden="true">{(['day','night'] as const).map(t=><picture key={t} className={t==='day'?styles.day:styles.night}><source media="(max-width:759px)" srcSet={`/scene/${t}-mobile.webp`}/><img src={`/scene/${t}-desktop.webp`} alt="" width="1440" height="1000" fetchPriority="high" /></picture>)}</div>
  <canvas ref={canvas} aria-hidden="true" className={`${styles.canvas} ${ready?styles.ready:''}`} />
  <div className={styles.hotspots} aria-label="探索营地"><Link ref={fireLink} href="/works/" className={styles.fire} aria-label="篝火：作品"><span>作品</span></Link><Link ref={personLink} href="/about/" className={styles.person} aria-label="人物：关于我"><span>关于我</span></Link><Link href="/gaming/" className={styles.sky} aria-label="天空：游戏档案"><span>游戏档案</span></Link></div>
  {!staticMode&&<button className={styles.pause} aria-label={paused?'播放场景动画':'暂停场景动画'} aria-pressed={paused} onClick={()=>setPaused(!paused)}><span aria-hidden="true">{paused?'▷':'Ⅱ'}</span></button>}
 </main>;
}
