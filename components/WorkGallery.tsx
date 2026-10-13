'use client';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {projects} from '@/lib/projects';
import styles from './WorkGallery.module.css';
export default function WorkGallery(){
 const [type,setType]=useState('全部');const [active,setActive]=useState(0);const rail=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 const [restoreTarget,setRestoreTarget]=useState<number|null>(null);
 const items=projects.filter(p=>type==='全部'||p.type===type);
 useLayoutEffect(()=>{
  function restore(){
   const slug=window.location.hash.slice(1);
   const target=projects.findIndex(p=>p.slug===slug);
   setReady(false);setType('全部');setActive(Math.max(0,target));setRestoreTarget(Math.max(0,target));
  }
  restore();window.addEventListener('hashchange',restore);
  return()=>window.removeEventListener('hashchange',restore);
 },[]);
 useLayoutEffect(()=>{
  if(restoreTarget===null||type!=='全部'||!rail.current)return;
  // Position the restored card before exposing the first painted frame.
  rail.current.children[restoreTarget]?.scrollIntoView({behavior:'instant',block:'nearest',inline:'center'});
  setRestoreTarget(null);setReady(true);
 },[restoreTarget,type]);
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  let total=0,lastEvent=0,lockedUntil=0;
  function wheel(event:WheelEvent){
   if(event.ctrlKey||event.metaKey||!el)return;
   const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
   if(!delta)return;
   const now=performance.now(),gap=now-lastEvent;lastEvent=now;
   // One deliberate gesture per project; ignore the trackpad's inertia tail.
   if(now<lockedUntil){event.preventDefault();return;}
   if(gap>180)total=0;
   const center=el.getBoundingClientRect().left+el.clientWidth/2;
   let index=0,distance=Infinity;
   Array.from(el.children).forEach((child,i)=>{const box=child.getBoundingClientRect(),d=Math.abs(box.left+box.width/2-center);if(d<distance){distance=d;index=i;}});
   const direction=Math.sign(delta),next=index+direction;
   if(next<0||next>=el.children.length)return;
   event.preventDefault();
   if(total&&Math.sign(total)!==direction)total=0;
   total+=delta*(event.deltaMode===1?16:event.deltaMode===2?el.clientHeight:1);
   if(Math.abs(total)<40)return;
   total=0;lockedUntil=now+700;
   el.children[next].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'center'});
  }
  el.addEventListener('wheel',wheel,{passive:false});
  return()=>el.removeEventListener('wheel',wheel);
 },[type]);
 function go(index:number){const next=Math.max(0,Math.min(items.length-1,index));rail.current?.children[next]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'center'});}
 function filter(value:string){setType(value);setActive(0);rail.current?.scrollTo({left:0,behavior:'instant'});}
 function track(){const el=rail.current;if(!el)return;const center=el.getBoundingClientRect().left+el.clientWidth/2;let best=0,distance=Infinity;Array.from(el.children).forEach((child,i)=>{const box=child.getBoundingClientRect(),d=Math.abs(box.left+box.width/2-center);if(d<distance){best=i;distance=d;}});setActive(best);}
 return <main id="main" data-work-gallery data-ready={ready} className={styles.gallery}><h1 className="sr-only">作品</h1>
 <div className={styles.filters}><span>作品索引 / 08</span><div role="group" aria-label="按类型筛选">{['全部',...new Set(projects.map(p=>p.type))].map(t=><button key={t} aria-pressed={type===t} onClick={()=>filter(t)}>{t}</button>)}</div></div>
 <div key={type} ref={rail} className={styles.rail} onScroll={track} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(active+(e.key==='ArrowRight'?1:-1));}}} tabIndex={0} aria-label="作品画廊，左右方向键切换">
 {items.map((p,i)=><article key={p.slug} data-project={p.slug} className={`${styles.card} ${i===active?styles.active:''}`}>
 <h2><Link href={`/works/${p.slug}/`}>{p.name}</Link></h2>
 <Link href={`/works/${p.slug}/`} className={styles.imageLink} aria-label={`查看 ${p.name} 项目`} onFocus={()=>go(i)}>
 <img src={p.cover} alt={`${p.name} 项目封面`} width={2384} height={2384} loading={i===0?'eager':'lazy'}/>
 </Link>
 <div className={styles.meta}><span>{String(projects.indexOf(p)+1).padStart(2,'0')}</span><div><span>{p.type} · {p.date}</span><p>{p.summary}</p></div></div>
 </article>)}</div>
 <div className={styles.controls}><button onClick={()=>go(active-1)} disabled={active===0} aria-label="上一个项目">←</button><span aria-live="polite">{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><button onClick={()=>go(active+1)} disabled={active===items.length-1} aria-label="下一个项目">→</button></div>
 </main>;
}
