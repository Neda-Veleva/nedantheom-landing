import type { GetServerSideProps } from 'next';

export default function RedirectRoot() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const accept = req.headers['accept-language'] || '';
  const to = accept.toLowerCase().includes('bg') ? '/bg' : '/en';
  return {
    redirect: {
      destination: to,
      permanent: false,
    },
  };
};


