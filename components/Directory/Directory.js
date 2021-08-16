import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';




export default function Map({ strings, locale, locales}) {
  let router = useRouter();


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      <main>
        <h1>
        { strings.pageTitle }
        </h1>
        <Link href="/">
          <a>Home</a>
        </Link>
      </main>

    </motion.div>
  )
}