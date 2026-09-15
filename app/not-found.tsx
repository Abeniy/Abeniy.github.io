import Link from 'next/link';
import ContentShell from '@/components/ContentShell';
export default function NotFound(){return <ContentShell title="这条路还没有记录"><p>页面不存在或已经移动。</p><Link href="/">回到营地</Link></ContentShell>;}
