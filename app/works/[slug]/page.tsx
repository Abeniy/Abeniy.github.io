import {notFound} from 'next/navigation';
import Link from 'next/link';
import ContentShell from '@/components/ContentShell';
import styles from '@/components/Editorial.module.css';
import {projects} from '@/lib/projects';
import ProjectBook from '@/components/ProjectBook';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
const brushPages=[
 {frame:211,label:'项目概览',description:'Brush3D：基于 Blender 的个性化 3D 笔刷风格定制研究。个人本科毕设，2025.02–2025.06；承担背景调研、系统设计、技术实现与动画制作。'},
 {frame:212,label:'项目介绍与系统设计',description:'从笔刷几何生成、风格材质模拟、参数控制到 AI 辅助模块的系统架构，以及参数控制效果。'},
 {frame:213,label:'笔刷参数与风格探索',description:'通过 13 个关键参数构建笔刷参数空间，展示 21 种不同风格的笔刷效果。'},
 {frame:217,label:'AI 参数调优与案例展示',description:'通过自然语言描述与 DeepSeek R1 辅助调优笔刷参数，展示竹子、蝴蝶、凤凰与花卉创作案例。'}
];
export default async function Project({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 if(slug==='brush3d')return <ContentShell title={p.name} width="wide">
  <ProjectBook pages={brushPages}/><Link href="/works/">返回全部作品</Link>
 </ContentShell>;
 return <ContentShell title={p.name} width="wide"><div className={styles.prose}>{'cover' in p&&<img className={styles.cover} src={p.cover} alt={`${p.name}：${p.summary}`} width={2384} height={2384}/>}<p className="eyebrow">{p.date} / {p.type}</p><p>{p.summary}</p><p className="empty">完整项目过程、素材与成果待补充。</p><Link href="/works/">返回全部作品</Link></div></ContentShell>;
}
