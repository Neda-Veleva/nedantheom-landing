import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import SignBoard from '@/components/SignBoard';
import AnimatedText from '@/components/AnimatedText';
import { useI18n } from '@/contexts/I18nProvider';
import { useEffect } from 'react';


const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });

export default function LangHomePage() {
  const router = useRouter();
  const { lang } = router.query as { lang?: string };
  const { t, setLang } = useI18n();

  useEffect(() => {
    if (lang === 'bg' || lang === 'en') setLang(lang);
  }, [lang, setLang]);

  return (
    <>
      <Head>
        <title>{t('title')} | Nedantheom</title>
        <meta name="description" content={t('subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="p-6 pb-0" />
      <main className="flex flex-col items-center justify-center gap-10 p-6">
        {/* <div className="container-narrow text-center space-y-4" /> */}

        <SignBoard />

        <p className="container-narrow text-center text-beige/80 -mt-4">
          <AnimatedText text={t('pitch')} font="400 16px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
        </p>

        <section className="w-full container-narrow">
          <h2 className="text-xl font-semibold text-beige mb-3 text-center">
            <AnimatedText text={t('contactUs')} font="600 20px ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" />
          </h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}


