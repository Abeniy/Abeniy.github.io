'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import styles from './ContentShell.module.css';
const links=[['/','首页'],['/works/','作品'],['/experience/','经历'],['/about/','关于我']];
export default function ContentShell({title,children,width='reading',hideTitle=false}:{title:string;children:React.ReactNode;width?:'reading'|'wide';hideTitle?:boolean}){
 const path=usePathname();
 const resumePage=path.startsWith('/experience')||path.startsWith('/about');
 return <div className={styles.layout + (resumePage ? ' ' + styles.resumePage : '')}><aside className={styles.sidebar}><div className={styles.avatar} aria-hidden="true"/><nav aria-label="页面目录">{links.map(([href,label])=><Link key={href} href={href} aria-current={(href==='/'?path==='/':path.startsWith(href.slice(0,-1)))?'page':undefined}>{label}</Link>)}{path.startsWith('/about')&&<a className={styles.subitem} href="#main">个人档案</a>}{path.startsWith('/lab')&&<Link className={styles.subitem} href="/lab/" aria-current="page">实验与笔记</Link>}</nav></aside><main id="main" className={`${styles.page} ${width==='wide'?styles.wide:''}`}>{!hideTitle&&<h1 className="page-title">{title}</h1>}{children}</main></div>;
}
