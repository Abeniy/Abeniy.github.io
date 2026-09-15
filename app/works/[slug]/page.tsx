import {notFound} from 'next/navigation';
import Link from 'next/link';
import ContentShell from '@/components/ContentShell';
import styles from '@/components/Editorial.module.css';
import {projects} from '@/lib/projects';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();return <ContentShell title={p.name} width="wide"><div className={styles.prose}><p className="eyebrow">{p.date} / {p.type}</p><p>{p.summary}</p><p className="empty">完整项目过程、素材与成果待补充。</p><Link href="/works/">返回全部作品</Link></div></ContentShell>;}
