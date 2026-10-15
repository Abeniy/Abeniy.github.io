'use client';
import {useRef,useState} from 'react';
import {flushSync} from 'react-dom';
import WorkViewSwitch from './WorkViewSwitch';
import styles from './FragmentGallery.module.css';
const groups=[{name:'霓虹街景',category:'三维场景'},{name:'餐车',category:'三维场景'},{name:'工厂与研究所',category:'三维场景'},{name:'风格化特效',category:'风格化特效'},{name:'回音 · 毕业展视觉',category:'视觉设计'},{name:'茶文化信息可视化',category:'信息可视化'}];
const tiles=[
 {group:0,src:'neon-01.png',width:1002,height:1002,label:'街景全景'},
 {group:0,src:'neon-02.png',width:1002,height:1002,label:'街景灯光实验'},
 {group:0,src:'neon-03.png',width:2055,height:1156,label:'飞车与街景'},
 {group:1,src:'truck-01.png',width:1786,height:1080,label:'餐车全景'},
 {group:1,src:'truck-02.png',width:1200,height:1080,label:'食材与玻璃器皿细节'},
 {group:1,src:'truck-03.png',width:1200,height:1080,label:'冷藏箱细节'},
 {group:1,src:'truck-04.png',width:1786,height:1080,label:'餐车内部俯视'},
 {group:2,src:'factory-01.png',width:1710,height:1063,label:'工厂生产场景'},
 {group:2,src:'factory-02.png',width:1920,height:1080,label:'机械展厅全景'},
 {group:2,src:'factory-03.png',width:1531,height:1080,label:'研究所全景'},
 {group:2,src:'factory-04.png',width:1716,height:1173,label:'仓库与物料细节'},
 {group:2,src:'factory-05.png',width:1785,height:1056,label:'缝纫设备展示'},
 {group:2,src:'factory-06.png',width:1990,height:1150,label:'木地板机械展厅'},
 {group:3,src:'effects-01.png',width:1221,height:626,label:'冲击与命中特效'},
 {group:3,src:'effects-02.png',width:649,height:585,label:'纵向斩击特效'},
 {group:3,src:'effects-03.png',width:608,height:583,label:'横向斩击特效'},
 {group:3,src:'effects-04.png',width:1799,height:875,label:'特效动作序列'},
 {group:4,src:'echo-02-v2.png',width:800,height:1095,label:'回音青色主题海报'},
 {group:4,src:'echo-03-v2.png',width:800,height:1095,label:'回音橙色主题海报'},
 {group:4,src:'echo-04-v2.png',width:710,height:1004,label:'回音蓝色主题海报'},
 {group:4,src:'echo-05.png',width:742,height:1036,label:'回音绿色主题海报'},
 {group:4,src:'echo-06-v2.png',width:800,height:1095,label:'回音粉色主题海报'},
 {group:5,src:'tea-01.png',width:4947,height:2783,label:'古韵茶踪 · 历史篇'},
 {group:5,src:'tea-02.png',width:4947,height:2783,label:'制茶之道 · 制作篇'},
 {group:5,src:'tea-03.png',width:4947,height:2783,label:'香叶养生 · 成分篇'},
 {group:5,src:'tea-04.png',width:4947,height:2783,label:'泡茶雅韵 · 茶艺篇'},
 {group:5,src:'tea-05.png',width:4947,height:2783,label:'茶叶经济 · 产业篇'},
].map((tile,id,all)=>({...tile,id,number:all.slice(0,id+1).filter(item=>item.group===tile.group).length}));
export default function FragmentGallery(){
 const [hover,setHover]=useState<number|null>(null);
 const [selected,setSelected]=useState<number|null>(null);
 const container=useRef<HTMLElement>(null);
 const savedScroll=useRef(0);
 const origin=useRef<number|null>(null);
 const switching=useRef(false);
 function changeProject(group:number|null){
  if(switching.current)return;
  if(group!==null)savedScroll.current=window.scrollY;
  const update=()=>{
   flushSync(()=>{setSelected(group);setHover(null);});
   if(group===null){
    window.scrollTo({top:savedScroll.current,behavior:'instant'});
   }else{
    const image=container.current?.querySelector<HTMLElement>(`[data-expanded-tile="${origin.current}"] [data-poster]`);
    if(image){
     const rect=image.getBoundingClientRect();
     window.scrollTo({top:window.scrollY+rect.top+rect.height/2-window.innerHeight/2,behavior:'instant'});
    }
   }
   if(group===null)container.current?.querySelector<HTMLButtonElement>(`[data-tile="${origin.current}"]`)?.focus({preventScroll:true});
   else container.current?.querySelector<HTMLButtonElement>(`[data-expanded-tile="${origin.current}"] button`)?.focus({preventScroll:true});
   setHover(null);
  };
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&document.startViewTransition){
   switching.current=true;
   const transition=document.startViewTransition(update);
   void transition.finished.catch(()=>{}).finally(()=>{switching.current=false;});
  }else{
   update();
   if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)container.current?.animate([{opacity:0},{opacity:1}],{duration:300});
  }
 }
 return <main ref={container} id="main" data-work-gallery className={styles.gallery} onClick={e=>{
  if(selected===null)return;
  // Buttons keep their own actions; clicks on the surrounding canvas close the project.
  if((e.target as HTMLElement).closest('button,a,input,select,textarea'))return;
  if(window.getSelection()?.toString())return;
  changeProject(null);
 }} onKeyDown={e=>{if(e.key==='Escape'&&selected!==null)changeProject(null);}}>
 <header className={styles.header}>{selected===null?<><div className={styles.heading}><h1>片段 / {String(tiles.length).padStart(2,'0')}</h1><WorkViewSwitch fragments/></div><span>{groups.length} 个项目 · {tiles.length} 张图片</span></>:<><button data-back className={styles.back} onClick={()=>changeProject(null)}>← 返回片段</button><span>{groups[selected].name} / {tiles.filter(tile=>tile.group===selected).length} 张图片</span></>}</header>
 {selected===null?
 <div className={styles.wall} onMouseLeave={()=>setHover(null)}>
 {tiles.map(tile=><button key={tile.id} data-tile={tile.id} className={styles.tile} data-group={tile.group} data-dimmed={hover!==null&&hover!==tile.group} onMouseEnter={()=>setHover(tile.group)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(tile.group)} onBlur={()=>setHover(null)} onClick={()=>{origin.current=tile.id;changeProject(tile.group);}} aria-label={groups[tile.group].name+'，'+tile.label}>
 <span className={styles.tileTop}><span>{String(tile.number).padStart(2,'0')}</span></span>
 <span className={tile.group===4?styles.poster:styles.image} data-poster={tile.src} style={{viewTransitionName:`fragment-${tile.id}`}}><img className={styles.image} src={'/fragments/'+tile.src} width={tile.width} height={tile.height} alt={tile.label} loading={tile.id<5?'eager':'lazy'}/></span>
 </button>)}
 </div>:<section className={styles.project} aria-label={groups[selected].name}>
 <aside className={styles.projectInfo}><h1>{groups[selected].name}</h1><p>{groups[selected].category} · {tiles.filter(tile=>tile.group===selected).length} 张图片</p><p>再次点击图片返回瀑布</p></aside>
 <div className={styles.projectImages}>{tiles.filter(tile=>tile.group===selected).map(tile=><figure key={tile.id} data-expanded-tile={tile.id} className={styles.projectImage}>
 <figcaption>{String(tile.number).padStart(2,'0')}</figcaption>
 <button className={styles.collapseImage} onClick={()=>changeProject(null)} aria-label={'返回瀑布：'+tile.label}><span className={tile.group===4?styles.poster:styles.image} data-poster={tile.src} style={{viewTransitionName:`fragment-${tile.id}`}}><img src={'/fragments/'+tile.src} width={tile.width} height={tile.height} alt={tile.label}/></span></button>
 </figure>)}<button className={styles.back} onClick={()=>changeProject(null)}>← 返回片段</button></div>
 </section>}
 </main>;
}
