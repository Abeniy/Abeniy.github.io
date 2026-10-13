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
const heartlightPages=[
 {frame:179,label:'项目介绍',description:'心光 APP：AI 生活记录伴侣，产品概念与 UX/UI 用户体验设计。'},
 {frame:199,label:'功能模块与视觉系统',description:'记录、陪伴、画廊、洞见四大模块，以及表情、符号、插画和深浅主题色彩规范。'},
 {frame:206,label:'记录与陪伴架构',description:'记录和陪伴模块的界面、功能说明与核心信息架构。'},
 {frame:207,label:'画廊与洞见架构',description:'画廊和洞见模块的界面、功能说明与核心信息架构。'},
 {frame:201,label:'功能展示',description:'多媒体生活记录、AI 朋友回应与定制、画廊历史回顾、每周来信及聊天界面。'},
 {frame:202,label:'用户反馈与年报',description:'心光用户反馈、App Store 推荐与评分展示，以及 2024 年度报告设计。'}
];
const wonderbookPages=[
 {frame:27,label:'项目介绍',description:'奇迹书 Wonderbook：以纸为载体的儿童科学启蒙互动教具书。'},
 {frame:175,label:'调研与设计目标',description:'灵感来源、背景调研、目标用户，以及电学、光学、能量三篇章方案介绍。'},
 {frame:176,label:'内容介绍',description:'拼图电路、照相机、回力小车等十五项互动教具设计。'},
 {frame:177,label:'核心价值与原型',description:'低成本、高效益的设计策略与教具原型制作过程。'},
 {frame:178,label:'实物展示',description:'书籍封面、内页、用户测试与实物制作细节。'}
];
const playPages=[
 {frame:219,label:'项目介绍',description:'入戏：融合 AIGC 技术与皮影文化的虚实结合游戏。'},
 {frame:181,label:'背景调研与方案',description:'皮影传承人访谈、AIGC 角色创造与游戏化故事演绎。'},
 {frame:184,label:'皮影游戏演绎',description:'桃花源记章节的故事流程与交互任务。'},
 {frame:185,label:'使用流程与场景设计',description:'实体皮影制作、虚实交互流程及场景、角色和道具设计。'},
 {frame:183,label:'界面设计展示',description:'角色创建、动态预览与游戏界面。'}
];
const toyPages=[
 {frame:51,label:'项目介绍',description:'玩具小镇失窃案：关于失去、记忆与拯救梦想的游戏。'},
 {frame:54,label:'故事背景与核心玩法',description:'时代背景、角色设定、游戏目标与核心解谜机制。'},
 {frame:47,label:'剧情与关卡设计',description:'故事推进、编辑室场景与解谜流程。'},
 {frame:52,label:'界面与场景建模',description:'交互道具、解谜界面以及火车站和编辑室建模。'}
];
const aivatarPages=[
 {frame:186,label:'项目介绍',description:'数字人工坊 Aivatar Studio：AI 辅助的虚拟形象生成网站。'},
 {frame:187,label:'设计调研与用户分析',description:'数字人生产流程及用户职业、地域、性别与年龄分析。'},
 {frame:188,label:'竞品分析与产品架构',description:'竞品比较、设计理念与虚拟形象创作流程架构。'},
 {frame:189,label:'界面设计',description:'首页、风格确定、换装与姿势调整界面。'},
 {frame:190,label:'设计产出',description:'图标、标志、交互组件与产品展示海报。'}
];
const echoPages=[
 {frame:1,label:'项目概览',description:'回音 ECHOING：2025 届浙江大学工业设计系毕业作品展主视觉。'},
 {frame:2,label:'设计理念与标志',description:'以同心涟漪表现回音的扩散与回应，展示标志设计。'},
 {frame:3,label:'展区视觉主题',description:'用户关怀、创意媒体、智能制造、智慧生活与智感交互五个主题。'},
 {frame:4,label:'海报设计',description:'展览主海报与系列子海报设计。'},
 {frame:5,label:'展览视觉应用',description:'易拉宝、展览横幅与喷绘板。'}
];
const books:Record<string,typeof brushPages>={brush3d:brushPages,heartlight:heartlightPages,wonderbook:wonderbookPages,aivatar:aivatarPages,echo:echoPages,'into-the-play':playPages,'toy-town':toyPages};
export default async function Project({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 if(books[slug])return <ContentShell title={p.name} width="wide" hideTitle>
  <div className={styles.bookArea}>
   <Link className={styles.bookBack} href={`/works/#${slug}`}>← 返回全部作品</Link>
   <ProjectBook key={slug} projectSlug={slug} pages={books[slug]}/>
   <h1 className={`page-title ${styles.bookTitle}`}>{p.name}</h1>
   {slug==='echo'&&<section className={styles.projectIntro} aria-label="回音项目信息">
    <div className={styles.introText}><h2>回音 ECHOING</h2>
     <p>「回音」既是声音遇到介质后的反射与回荡，亦是一种隐喻：设计是设计者向世界发出的声音，而用户、社会、技术与未来的回应，便是「回音」。</p>
     <p>整套视觉以「同心涟漪」为核心符号，将声波在水面激起的层层波纹与声音频率的扩散形态转化为可被看见的视觉震颤。波纹由中心向外晕染、渐隐，呼应余韵消散的声学意象，也呈现年轻设计者与人、技术和时代持续对话的汇聚。</p>
    </div><dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>毕业作品展主视觉设计</dd></div>
     <div><dt>年份</dt><dd>2025</dd></div>
     <div><dt>展览</dt><dd>2025 届浙江大学工业设计系毕业作品展</dd></div>
     <div><dt>设计内容</dt><dd>标志、系列海报、易拉宝、展览横幅、喷绘板</dd></div>
    </dl>
   </section>}
   {slug==='aivatar'&&<section className={styles.projectIntro} aria-label="数字人工坊项目信息">
    <div className={styles.introText}><h2>AI 辅助的虚拟形象生成网站</h2>
     <p>这是一个由 AI 辅助的虚拟形象生成网站。在这里，你无需费心安排提示词，AI 将自动生成独特创意。你不需要在多个设计软件之间切换，也无需花费大量时间学习使用技巧。</p>
     <p>平台简化设计过程，让创作变得简单高效，适合专业设计师和初学者，帮助用户轻松上手、享受创作乐趣。通过 AI 智能辅助，为用户节省时间和精力，使创作过程更加顺畅愉悦。</p>
    </div><dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>团队作业 · 交互设计 / 网页设计</dd></div>
     <div><dt>项目时间</dt><dd>2023.11 — 2024.01</dd></div>
     <div><dt>承担工作</dt><dd>品牌调研、竞品分析、视觉设计</dd></div>
    </dl>
   </section>}
   {slug==='into-the-play'&&<section className={styles.projectIntro} aria-label="入戏项目信息">
    <div className={styles.introText}><h2>AIGC 与皮影文化的虚实互动体验</h2>
     <p>「入戏」是一款融合 AIGC 技术与皮影文化的创新产品，采用虚实结合的游戏互动方式。用户可以利用 AIGC 技术创造个性化的皮影角色，并通过 2D 冒险游戏演绎传统故事。</p>
     <p>这种互动方式不仅保留了皮影戏的精髓，还让用户真实体验到皮影操作的乐趣，为传统文化注入现代科技的活力，使经典故事焕发出新的魅力与趣味。</p>
    </div><dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>团队作业 · APP 游戏设计</dd></div>
     <div><dt>项目时间</dt><dd>2024.03 — 2024.06</dd></div>
     <div><dt>承担工作</dt><dd>游戏策划、游戏美术：场景、皮影（使用 AI 辅助设计）</dd></div>
    </dl>
   </section>}
   {slug==='toy-town'&&<section className={styles.projectIntro} aria-label="玩具小镇失窃案项目信息">
    <div className={styles.introText}><h2>关于失去和拯救的游戏</h2>
     <p>小镇的居民们失去了关于梦想的记忆，他们被困在时光的夹缝中，过去从未真正离开，却也无法再次到达。玩家需要重新找回居民失去的记忆。</p>
     <p>游戏中代表梦想的失物，是记忆的物质化身。当所有失物被找回，居民们才有希望重建一个连贯的自己。整个游戏是一个寻回过去、拯救梦想的过程。</p>
    </div><dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>团队作业 · 游戏设计</dd></div>
     <div><dt>项目时间</dt><dd>2023.09 — 2023.12</dd></div>
     <div><dt>承担工作</dt><dd>游戏策划、游戏场景建模、游戏美术、用户测试</dd></div>
     <div><dt>项目获奖</dt><dd>2024 HKDADC 香港数字艺术设计大赛（春季赛）一等奖</dd></div>
    </dl>
   </section>}
   {slug==='wonderbook'&&<section className={styles.projectIntro} aria-label="奇迹书项目信息">
    <div className={styles.introText}>
     <h2>以纸为载体的儿童科学启蒙互动教具书</h2>
     <p>通过易制造、易传输、易使用的互动学习体验，点燃孩子们对科学的好奇心。这套教具书涵盖光学、电学、能量三个篇章，每篇分为基元件、渐进玩法、终极集成三个序列，重实践、强交互，让孩子们在动手中成为自己的老师。</p>
     <p>每本教具书平均成本为 11.05 元（不含印刷与装订），模块化设计可复用，减少成本与环境负担。项目希望用纸质教具为贫困儿童打开通往科学世界的大门，让他们在探索中感受知识的美丽与力量。</p>
    </div>
    <dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>团队作业 · 产品设计</dd></div>
     <div><dt>项目时间</dt><dd>2024.03 — 2024.06</dd></div>
     <div><dt>承担工作</dt><dd>背景调研、平面设计、技术测试、视频拍摄与剪辑、动画制作</dd></div>
    </dl>
   </section>}
   {slug==='heartlight'&&<section className={styles.projectIntro} aria-label="心光项目信息">
    <div className={styles.introText}><h2>AI 生活记录伴侣</h2>
     <p>人类有真正的自我被看见、情绪被照料与理解的需求。心光提出「AI 生活伴侣」的概念，从自我表达切入，去深刻理解独特的个体，并用 AI 技术提供有价值的情绪陪伴与梳理。</p>
     <p>在开心、痛苦或想在不同方向进步时，心光希望在身旁支持与陪伴用户。</p>
    </div><dl className={styles.projectFacts}><div><dt>项目类型</dt><dd>APP 设计</dd></div><div><dt>承担工作</dt><dd>UX/UI 用户体验设计师</dd></div></dl>
   </section>}
   {slug==='brush3d'&&<section className={styles.projectIntro} aria-label="Brush3D 项目信息">
    <div className={styles.introText}>
     <h2>3D 绘画笔刷的个性化风格定制方法研究</h2>
     <p>本研究围绕 3D 绘画工具在多风格艺术创作中的表现与交互瓶颈，提出并实现了一套基于 Blender 插件的个性化风格定制方法。</p>
     <p>系统采用几何节点程序化建模与生成式 AI 结合的技术路径，实现了水墨、蜡笔、水彩等十余种艺术风格的 3D 笔刷快速生成与实时渲染。通过风格参数空间建模与 AI 辅助调优模块，用户可通过自然语言描述生成匹配的笔刷参数，大幅降低非专业用户的创作门槛。</p>
    </div>
    <dl className={styles.projectFacts}>
     <div><dt>项目类型</dt><dd>个人本科毕业设计</dd></div>
     <div><dt>项目时间</dt><dd>2025.02 — 2025.06</dd></div>
     <div><dt>承担工作</dt><dd>背景调研、系统设计、技术实现、动画制作</dd></div>
    </dl>
   </section>}
   {slug==='brush3d'&&<video className={styles.projectVideo} controls playsInline preload="metadata" aria-label="Brush3D 项目演示视频">
    <source src="/projects/brush3d/demo.mp4" type="video/mp4"/>
    您的浏览器不支持视频播放。<a href="/projects/brush3d/demo.mp4">下载演示视频</a>
   </video>}
  </div>
 </ContentShell>;
 return <ContentShell title={p.name} width="wide"><div className={styles.prose}>{'cover' in p&&<img className={styles.cover} src={p.cover} alt={`${p.name}：${p.summary}`} width={2384} height={2384}/>}<p className="eyebrow">{p.date} / {p.type}</p><p>{p.summary}</p><p className="empty">完整项目过程、素材与成果待补充。</p><Link href={`/works/#${slug}`}>返回全部作品</Link></div></ContentShell>;
}
