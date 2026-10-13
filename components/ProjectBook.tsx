'use client';
import {useEffect,useRef,useState} from 'react';
import styles from './ProjectBook.module.css';
type Page={frame:number;label:string;description:string};
export default function ProjectBook({pages,projectSlug='brush3d'}:{pages:Page[];projectSlug?:string}){
 const [index,setIndex]=useState(0),[turning,setTurning]=useState<{next:number;step:number}|null>(null);
 const touch=useRef<number|null>(null);
 const book=useRef<HTMLDivElement>(null);
 const wheelState=useRef({total:0,last:0,lockedUntil:0});
 const dialog=useRef<HTMLDialogElement>(null);
 const focusBadge=useRef<HTMLSpanElement>(null);
 const closeBadge=useRef<HTMLSpanElement>(null);
 const [closing,setClosing]=useState(false);
 function openFocus(){
  const el=dialog.current;if(!el)return;
  setClosing(false);el.showModal();
  const current=el.querySelector<HTMLElement>(`[data-focus-page="${index}"]`);
  if(current)el.scrollTop=Math.max(0,current.offsetTop-32);
 }
 function closeFocus(){if(matchMedia('(prefers-reduced-motion: reduce)').matches){dialog.current?.close();return;}setClosing(true);}
 function turn(step:number){if(turning)return;const next=Math.max(0,Math.min(pages.length-1,index+step));if(next!==index){if(matchMedia('(prefers-reduced-motion: reduce)').matches)setIndex(next);else setTurning({next,step});}}
 useEffect(()=>{
  const el=book.current;if(!el)return;
  function wheel(event:WheelEvent){
   if(event.ctrlKey||event.metaKey||dialog.current?.open)return;
   const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
   if(!delta)return;
   const now=performance.now(),state=wheelState.current;
   if(now-state.last>180)state.total=0;
   state.last=now;
   if(turning||now<state.lockedUntil){event.preventDefault();return;}
   const step=Math.sign(delta);
   if(index+step<0||index+step>=pages.length)return;
   event.preventDefault();
   if(state.total&&Math.sign(state.total)!==step)state.total=0;
   state.total+=delta*(event.deltaMode===1?16:event.deltaMode===2?el!.clientHeight:1);
   if(Math.abs(state.total)<40)return;
   state.total=0;state.lockedUntil=now+950;
   turn(step);
  }
  el.addEventListener('wheel',wheel,{passive:false});
  return()=>el.removeEventListener('wheel',wheel);
 },[index,turning,pages.length]);
 const src=(i:number)=>`url("/projects/${projectSlug}/frame-${pages[i].frame}.png")`;
 const page=pages[index];
 return <section className={styles.reader} aria-label="项目作品书" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turn(e.key==='ArrowRight'?1:-1);}}}>
  <div ref={book} className={styles.book} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>50)turn(delta<0?1:-1);}touch.current=null;}}>
   <div className={styles.spread} role="img" aria-label={page.description}>
    <div data-book-half="left" className={styles.half} style={{backgroundImage:src(turning?.step===-1?turning.next:index),backgroundPosition:'left center'}}/>
    <div data-book-half="right" className={styles.half} style={{backgroundImage:src(turning?.step===1?turning.next:index),backgroundPosition:'right center'}}/>
    {turning&&<div data-book-leaf className={`${styles.leaf} ${turning.step>0?styles.forward:styles.backward}`} onAnimationEnd={()=>{setIndex(turning.next);setTurning(null);}} aria-hidden="true">
     <div className={styles.front} style={{backgroundImage:src(index),backgroundPosition:turning.step>0?'right center':'left center'}}/>
     <div className={styles.back} style={{backgroundImage:src(turning.next),backgroundPosition:turning.step>0?'left center':'right center'}}/>
    </div>}
   </div>
   <span className={styles.spine} aria-hidden="true"/>
   <button className={styles.focusTrigger} aria-label="focus：放大当前书页" disabled={!!turning} onPointerMove={e=>{if(e.pointerType!=='mouse')return;const box=e.currentTarget.getBoundingClientRect();focusBadge.current?.style.setProperty('left',`${e.clientX-box.left}px`);focusBadge.current?.style.setProperty('top',`${e.clientY-box.top}px`);}} onClick={openFocus}>
    <span ref={focusBadge} className={styles.focusBadge}>focus</span>
   </button>
   <button className={styles.leftEdge} aria-label="上一页" disabled={index===0} onClick={()=>turn(-1)}/>
   <button className={styles.rightEdge} aria-label="下一页" disabled={index===pages.length-1} onClick={()=>turn(1)}/>
  </div>
  <div className={styles.controls}>
   <button onClick={()=>turn(-1)} disabled={index===0} aria-label="翻到上一页">←</button>
   <span aria-live="polite">{index+1} / {pages.length}</span>
   <button onClick={()=>turn(1)} disabled={index===pages.length-1} aria-label="翻到下一页">→</button>
  </div>
  <dialog ref={dialog} className={`${styles.focusDialog} ${closing?styles.closing:''}`} aria-label={`放大查看：${page.label}`} onKeyDown={e=>e.stopPropagation()} onCancel={e=>{e.preventDefault();closeFocus();}} onClose={()=>setClosing(false)}>
   <div className={styles.focusCanvas} onAnimationEnd={e=>{if(closing&&e.target===e.currentTarget){dialog.current?.close();setClosing(false);}}} onPointerMove={e=>{if(e.pointerType!=='mouse')return;closeBadge.current?.style.setProperty('left',`${e.clientX}px`);closeBadge.current?.style.setProperty('top',`${e.clientY}px`);}}>
    {pages.map((detail,i)=><button key={detail.frame} data-focus-page={i} className={styles.focusPage} aria-label={`${detail.label}，点击关闭大图`} onClick={closeFocus}>
     <img className={styles.enlarged} src={`/projects/${projectSlug}/frame-${detail.frame}.png`} alt={detail.description} width={3368} height={1190}/>
    </button>)}
   </div>
    <span ref={closeBadge} className={styles.closeBadge}>close</span>
  </dialog>
 </section>;
}
