import Link from 'next/link';
import styles from './FragmentGallery.module.css';
export default function WorkViewSwitch({fragments=false}:{fragments?:boolean}){
 return <nav className={styles.switcher} aria-label="作品展示方式">
 <Link href="/works/" aria-current={!fragments?'page':undefined}>项目</Link>
 <Link href="/works/fragments/" aria-current={fragments?'page':undefined}>片段</Link>
 </nav>;
}
