import Link from 'next/link';
export default function ContentShell({title,children}:{title:string;children:React.ReactNode}){return <main id="main" className="content-page"><h1>{title}</h1>{children}<footer className="content-footer"><Link href="/about/">关于我与简历</Link><a href="mailto:1091068886@qq.com">1091068886@qq.com</a></footer></main>;}
