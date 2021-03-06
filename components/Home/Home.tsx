import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicOutlined } from "@mui/icons-material";

import { Props } from "../../pages/index";
import { useEffect } from "react";
import { useIdleTimerContext } from "react-idle-timer";
import { useRouter } from "next/router";
import wrapArray from "../../utils/wrapArray";

const rotatingLocaleBorderStyles = [
  "border-red-500",
  "border-amber-400",
  "border-indigo-400",
];

export default function Home({ strings }: Props) {
  const idleTimer = useIdleTimerContext();
  const locales = useRouter()?.locales ?? ["en"];

  // disable inactivity timer on home page
  useEffect(() => {
    idleTimer.pause();

    return () => {
      idleTimer.reset();
    };
  }, [idleTimer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Head>
        <title>{strings.pageTitle}</title>
      </Head>

      <div className="h-full flex flex-col justify-center px-8">
        <h1 className="text-left text-5xl text-blue-50 py-1">
          {strings.welcomeText}
        </h1>
        <h3 className="text-left text-xl text-slate-200">
          {strings.tapToContinuePrompt}
        </h3>

        {/* Language select */}
        {/* TODO: Add CMS setting for toggling this */}
        {true ? (
          <div className="flex gap-2 items-center mt-8">
            <PublicOutlined className="text-slate-400" />
            <div className="flex gap-8 text-blue-200">
              {locales.map((locale, index) => (
                <Link href="/menu" key={locale} locale={locale} replace>
                  <a className="px-2 hover:-translate-y-1 transition-transform">
                    <div
                      className={`border-b-4 font-extrabold ${wrapArray(
                        rotatingLocaleBorderStyles,
                        index
                      )} p-1 uppercase`}
                    >
                      {new Intl.DisplayNames(locale, { type: "language" }).of(
                        locale
                      )}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // default behavior: click overlay
          <Link href="/menu">
            <a>
              <div className="h-screen w-screen fixed top-0 left-0"></div>
            </a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
