import ContentShell from '@/components/ContentShell';
import Link from 'next/link';
import styles from '@/components/Editorial.module.css';
export default function About(){return <ContentShell title="杨静雯 / Abeniy" hideTitle>
<div className={styles.profileTop}><div className={styles.photo} aria-hidden="true"/><div className={styles.profileInfo}><h1 className={styles.name}>杨静雯 / <span>Abeniy</span></h1>
<p className={styles.bio}>在产品设计、游戏与交互技术之间探索。</p><a className={styles.contact} href="mailto:1091068886@qq.com">1091068886@qq.com</a></div></div><div className={styles.profileBottom}>
<section className={styles.section}><h2 className="section-title">教育</h2>
<div className={styles.timelineRow}><p className={styles.date}>2025.09 — 至今</p><div><h3 className="entry-title">清华大学深圳国际研究生院</h3><p className="muted">互动媒体设计与技术硕士</p></div></div>
<div className={styles.timelineRow}><p className={styles.date}>2021.09 — 2025.06</p><div><h3 className="entry-title">浙江大学</h3><p className="muted">工业设计本科</p><p className="muted">GPA 3.96/4.0 · 综合排名 1/47</p></div></div>
</section>
<section className={styles.section}><h2 className="section-title">奖项</h2><p>国家奖学金 ×2、浙江大学一等奖学金 ×3、华为菁英奖学金。</p></section>
<section className={styles.section}><h2 className="section-title">能力与工具</h2><p>产品体验、交互原型、游戏策划、技术美术、AIGC 工作流。</p><p className="muted">Figma / Blender / Unity / Photoshop / Python</p></section>
<section className={styles.section}><h2 className="section-title">持续探索</h2><Link href="/lab/">实验与笔记</Link></section>
<section className={styles.section}><h2 className="section-title">简历与联系</h2><p>公开版简历整理中，可通过邮箱联系。</p></section>
</div></ContentShell>;}
