// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';  // This should now work

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}