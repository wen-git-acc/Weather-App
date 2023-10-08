import Navbar from '@/components/navbar/navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import WeatherContextProvider from '@/context/weatherContext/weatherContext';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Head>
        <title>The Best App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <WeatherContextProvider>
        <Component {...pageProps} />
      </WeatherContextProvider>
    </main>
  );
}
