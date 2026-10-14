import ContentShell from '@/components/ContentShell';
import styles from '@/components/Resume.module.css';
import profile from '@/components/ProfileDetails.module.css';
const entries = [
  {date:'2026.06 — 2026.11',name:'腾讯 · IEG 光子事业群',role:'游戏策划',details:<p>进行中。具体项目职责待补充。</p>},
  {date:'2025.04 — 2025.06',name:'网易雷火 · 用户体验研究中心',role:'项目管理',details:<>
    <p><strong>游戏体验与优化反馈</strong>系统化检查游戏核心功能，累计输出 <strong>20+ 份反馈报告</strong>。提出角色试穿角度保持、队伍识别色优化、新增物品标记等交互建议，获导师和团队采纳，提升元素识别效率与操作流畅度。</p>
    <p><strong>Bug 全流程跟进</strong>通过项目管理平台跟进新建、分派、修复、待测和关闭等环节，累计推动 <strong>70+ 个 Bug 修复</strong>；协调 QA 与开发团队调整优先级、推进跨部门沟通，保障版本迭代与交付质量。</p>
  </>},
  {date:'2024.11 — 2025.02',name:'心里有光 · 心光工作室',role:'UI/UX 产品体验设计师',details:<>
    <p><strong>产品体验与设计规范</strong>参与界面布局、色彩规范、交互反馈与设计规范建设，推动方案从概念到上线。</p>
    <a className={styles.projectLink} href="/works/heartlight/">查看心光 APP 项目 →</a>
  </>},
  {date:'2024.08 — 2024.11',name:'上海人工智能实验室 · 通用技术部',role:'技术美术',details:<>
    <p><strong>网球技战术分析可视化</strong>负责 Unity 3D 渲染，制作球的轨迹、落点特效等可视化元素，并搭建虚拟网球场。</p>
    <p><strong>数字人建模与骨骼绑定</strong>参与数字人制作，呈现球员动作及比赛关键细节，为观众提供直观的观赛体验。系统已应用于 <strong>2024 年中国网球公开赛央视直播</strong>。</p>
  </>},
  {date:'2023.05 — 2024.07',name:'浙江大学国际设计研究院',role:'实习生',details:<>
    <p><strong>跟组科研实习</strong>参与具身交互磁吸套件课题，完成硬件搭建部分。</p>
    <p><strong>AI + Design 混合设计空间研究</strong>担任实验助理，工作计划包括文献综述、论文绘图、数据处理与应用场景构思。</p>
  </>},
];
export default function Experience(){
  return <ContentShell title="经历">
    <section aria-labelledby="internship-heading">
      <h2 id="internship-heading" className={styles.sectionHeading}>实习经历</h2>
      {entries.map(({date,name,role,details})=><article className={styles.timelineRow} key={name}>
        <p className={styles.date}>{date}</p>
        <div><div className={styles.entryHeader}><h3 className="entry-title">{name}</h3><p className={styles.role}>{role}</p></div><div className={styles.details}>{details}</div></div>
      </article>)}
    </section>
<section className={styles.researchSection} aria-labelledby="research-heading"><h2 id="research-heading" className={styles.sectionHeading}>科研经历</h2>
<article className={profile.research}>
<h3 className={profile.subheading}>IEDS: Exploring an Intelli-Embodied Design Space Combining Designer, AR, and GAI to Support Industrial Conceptual Design</h3>
<div className={profile.paperMeta}>
<a className={profile.paperIcon} href="https://doi.org/10.1145/3706598.3713528" target="_blank" rel="noopener noreferrer" aria-label="打开论文（新标签页）" title="ACM Digital Library">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 .2l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7-.2l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>
<span>ACM Digital Library ↗</span></a>
<span className={profile.year}>CHI 2025 · 学生二作 / 第三作者 · CCF A类会议</span>
</div>
<p>探索设计师与 AI 代理在增强现实（AR）环境中的协同设计。研究聚焦产品概念设计阶段，结合设计师的创造力与生成式 AI，探讨设计空间的交互方式与环境如何影响思维过程和创造力。</p>
<p>通过文献综述、专家访谈与用户实验，明确 IEDS 的交互指南与最佳实践，讨论其对概念设计的影响及未来方向。</p>
<h4 className={profile.label}>个人贡献</h4>
<p>参与相关文献综述与论文插图绘制：围绕 AI 与设计、AR 与设计开展文献检索和多维度整理，梳理已有研究的关注点与不足。</p>
</article>
</section>
  </ContentShell>;
}
