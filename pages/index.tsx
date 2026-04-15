import Head from "next/head";
import { MaintenanceApp } from "@/components/maintenance/MaintenanceApp";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Nedantheom</title>
        <meta
          name="description"
          content="Сайтът ни е в процес на разработка. Свържете се с нас за въпроси и заявки."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MaintenanceApp />
    </>
  );
}


