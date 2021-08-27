import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Props } from '../../pages';

export default function Home({ strings }:Props) {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>{strings.venueName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          
        {strings.venueName}
        </h1>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/menu">
            <a>Menu</a>
          </Link>

          <Link href="/directory">
            <a>Map</a>
          </Link>

          <Link href="/events">
            <a>Events</a>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </motion.div>
  )
}