import ContentShell from '@/components/ContentShell';
import ProfilePhoto from '@/components/ProfilePhoto';
import Link from 'next/link';
import styles from '@/components/Editorial.module.css';
import profile from '@/components/ProfileDetails.module.css';
const awardGroups = [
  {title:'荣誉',items:[
    ['2025','浙江省优秀毕业生、浙江大学优秀毕业生'],
    ['2025','浙江大学计算机科学与技术学院优秀本科毕业论文'],
    ['2023 / 2024','国家奖学金 ×2'],
    ['2023 — 2025','浙江大学一等奖学金 ×3'],
    ['2023','华为菁英奖学金 · 优秀学生奖'],
    ['2024','浙江大学教育基金会计算机科学与技术学院蘑菇街设计时尚基金学生奖学金'],
    ['2024','陈天洲教育基金优秀学生奖学金'],
  ]},
  {title:'竞赛',items:[
    ['2024','中国设计智造大奖（DIA）· 佳作奖'],
    ['2024','第十八届中国好创意暨全国数字艺术设计大赛 · 社会创新类一等奖'],
    ['2024','第三届 HKDADC 香港数字艺术设计大赛 · 一等奖'],
    ['2024','米兰设计周中国高校设计学科师生优秀作品展 · 浙江省二等奖'],
    ['2024','CADA 日本概念艺术设计奖 · 铜奖'],
    ['2023','全国大学生数学建模竞赛 · 浙江省二等奖'],
    ['2023','浙江大学第十四届大学生工业设计竞赛 · 二等奖'],
    ['2023','浙江大学第二十一届大学生数学建模竞赛 · 二等奖'],
  ]},
];
export default function About(){return <ContentShell title="杨静雯" hideTitle>
<div className={styles.profileTop}><ProfilePhoto/><div className={styles.profileInfo}><h1 className={styles.name}>杨静雯</h1>
<p className={styles.bio}>粉碎知见，彻底开放<br/>如实观照，精确行动</p><a className={styles.contact} href="mailto:1091068886@qq.com">1091068886@qq.com</a></div></div><div className={styles.profileBottom}>
<section className={styles.section}><h2 className="section-title">教育</h2>
<div className={styles.timelineRow}><p className={styles.date}>2025.09 — 至今</p><div><h3 className="entry-title">清华大学<span className={profile.degree}>硕士学位</span></h3><p className="muted">深圳国际研究生院 互动媒体设计与技术</p></div></div>
<div className={styles.timelineRow}><p className={styles.date}>2021.09 — 2025.06</p><div><h3 className="entry-title">浙江大学<span className={profile.degree}>学士学位</span></h3><p className="muted">计算机科学与技术学院 工业设计</p><p className="muted">GPA 3.96/4.0 · 综合排名 2/47</p></div></div>
</section>
<section className={styles.section}><h2 className="section-title">荣誉与奖项</h2>
<div className={profile.groups}>{awardGroups.map(group=><div key={group.title}>
<h3 className={profile.subheading}>{group.title}</h3>
<ul className={profile.awards}>{group.items.map(([date,title])=><li key={title}><span className={profile.year}>{date}</span><span>{title}</span></li>)}</ul>
</div>)}</div>
</section>
<section className={styles.section}><h2 className="section-title">能力与工具</h2><p>产品体验、交互原型、游戏策划、技术美术、AIGC 工作流。</p><p className="muted">Figma / Blender / Unity / Photoshop / Python</p></section>
<section className={styles.section}><h2 className="section-title">持续探索</h2><Link href="/lab/">实验与笔记</Link></section>
<section className={styles.section}><h2 className="section-title">简历与联系</h2><p>公开版简历整理中，可通过邮箱联系。</p></section>
</div></ContentShell>;}
