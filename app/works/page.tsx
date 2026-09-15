import ContentShell from '@/components/ContentShell';
import Link from 'next/link';
import {projects} from '@/lib/projects';
export default function Works(){return <ContentShell title="作品">{projects.map(p=><article className="entry" key={p.slug}><p className="eyebrow">{p.date} / {p.type}</p><h2><Link href={`/works/${p.slug}/`}>{p.name}</Link></h2><p className="muted">{p.summary}</p></article>)}</ContentShell>;}
