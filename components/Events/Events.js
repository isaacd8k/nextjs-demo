import styles from './../../styles/Home.module.css';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';




export default function Events({ strings, locale, locales}) {
  let router = useRouter();


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      
      <main className={styles.main}>
        <h1 className={styles.title}>
        Events page (hardcoded)
        </h1>
        <Link href="/">
          <a>Home</a>
        </Link>
      </main>

      <footer className={styles.footer}>
      </footer>
    </motion.div>
  )
}
