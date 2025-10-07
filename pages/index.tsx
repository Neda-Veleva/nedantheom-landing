import Head from 'next/head';
import dynamic from 'next/dynamic';
import SignBoard from '@/components/SignBoard';

const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Очаквайте скоро | NedAn Theom</title>
        <meta name="description" content="Сайтът е в процес на разработка, но приемаме запитвания и поръчки." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-6 bg-beige">
        <div className="container-narrow text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-brown">Добре дошли</h1>
          <p className="text-brown/80">Сайтът ни е в процес на разработка, но все пак обработваме поръчки.</p>
        </div>

        <SignBoard />

        <section className="w-full container-narrow">
          <h2 className="text-xl font-semibold text-brown mb-3">Свържете се с нас</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}


