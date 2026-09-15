import styles from './page.module.css';
export default function Home() {
  return <div className={styles.page}>
    <header className={styles.header}><span className={styles.brand}>ABENIY</span><span>作品与成长记录</span></header>
    <main id="main" className={styles.main}>
      <p className={styles.eyebrow}>杨静雯 / ABENIY</p>
      <h1 className={styles.title}>带着好奇出发，<br />在篝火旁记录。</h1>
      <p className={styles.description}>我在产品设计、游戏与交互技术之间探索。这里将收录我的作品、经历，以及一路上的思考与发现。</p>
      <p className={styles.status}>本地工程预览 · 篝火场景与作品内容正在建设中</p>
    </main>
    <footer className={styles.footer}><span>保持好奇，继续探索。</span><a href="mailto:1091068886@qq.com">1091068886@qq.com</a></footer>
  </div>;
}
